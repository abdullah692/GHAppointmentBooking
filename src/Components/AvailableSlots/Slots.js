import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { AvailableSlots } from "./data";
import PatientInfo from "../PatientInfo/PatientInfo";
import { useLocation } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Button, Modal } from "antd";

function Slots(props) {
  const [selected, setSelected] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [active, setActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [data, setData] = useState([]);
  const arr = [];
  var startTimeChange;
  var endTimeChange;
  const navigate = useNavigate();
  const location = useLocation();
  // const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP EEEE")}</p>;
    console.log("Date fomrat", format(selected, "PP"));
    console.log("Selected", selected);
  }
  console.log("true", isModalOpen);
  const [queryFetch] = useSearchParams();
  const idManual = queryFetch.get("id");
  const d_idManual = queryFetch.get("d_id");
  console.log("manunal", idManual);
  console.log("Dr manual", d_idManual);

  const AddSlot = location.state;

  const handleSlots = (id, startTime, endTime) => {
    const date = new Date(format(selected, "PP"));
    console.log("Date is", date);
    console.log("StartTime", startTime);
    console.log("EndTime", endTime);
    const startDate = new Date(`${date?.toDateString()} ${startTime}`);
    console.log("startDate", startDate);
    const endDate = new Date(`${date?.toDateString()} ${endTime}`);
    console.log("endDate", endDate);
    startTime = startDate?.toISOString();
    endTime = endDate?.toISOString();
    setStartTime(startTime);
    setEndTime(endTime);
    console.log("start Time Change", startTime);
    console.log("end Time Change", endTime);
    // const AvailableSlots=[
    //   {
    //       id:1,
    //       startTime:"09:00",
    //       endTime:"10:00"
    //   },
    //   {
    //       id:2,
    //       startTime:"10:00",
    //       endTime:"11:00"
    //   },
    // ]
    if (!d_idManual) {
      AvailableSlots.forEach((slot) => {
        const startDate = new Date(
          `${date?.toDateString()} ${slot?.startTime}`
        );
        console.log("startDate", startDate);
        const endDate = new Date(`${date?.toDateString()} ${slot?.endTime}`);
        console.log("endDate", endDate);
        slot.startTime = startDate?.toISOString();
        slot.endTime = endDate?.toISOString();
      });
    }

    console.log("Available Slots", AvailableSlots);

    const SlotfilterData = AvailableSlots.filter((info) => {
      return info.id === id;
    });
    console.log("Slots Filter data", SlotfilterData);
    AddSlot?.arr?.push(SlotfilterData);

    console.log("Slot Appointment", AddSlot);

    if (idManual && d_idManual) {
      console.log("ASADS");
      setIsModalOpen(true);
    } else {
      navigate("/patientInfo", { state: { AddSlot } });
    }
  };

  const handleOk = async () => {
    console.log("StartTime Api", startTime);
    console.log("endTime Api", endTime);
    console.log("You cancel the Appointment");
    const api = await axios
      .put(
        `https://api.genesishealth.ai/api/booking/appointment/reschedule/${idManual}`,
        {
          startTime: startTime,
          endTime: endTime,
        }
      )
      .then((res) => {
        console.log("Put request ", res.data);
      });

    setIsModalOpen(false);
    navigate("/rescheduleAppointmentConfirmed");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClick = (id) => {
    setIsModalOpen(true);
  };

  const handleTimeSlots = async () => {
    const Docid = AddSlot?.arr[1][0]?.d_id;
    if (d_idManual) {
      const Apidata = await axios
        .get(
          `https://api.genesishealth.ai/api/booking/availability/${d_idManual}`
        )
        .then((res) => {
          console.log("Slots Api response", res.data.data);
          setAvailableSlots(res.data.data);
        });
    } else {
      const Apidata = await axios
        .get(`https://api.genesishealth.ai/api/booking/availability/${Docid}`)
        .then((res) => {
          console.log("Slots Api response Dr", res.data.data);
          setAvailableSlots(res.data.data);
        });
    }

    // console.log('Slot Api response',availableSlots);
  };

  const handleReschedule = async () => {
    const setSlots = await axios
      .get(`https://api.genesishealth.ai/api/appointment/detail/${idManual}`)
      .then((res) => {
        console.log("Set Slots Api response ", res.data.data);
        // setAvailableSlots(res.data.data);
      });
  };

  useEffect(() => {
    const sel = format(selected, "EEEE").toLowerCase();
    const selectedDaySlot = availableSlots.filter(
      (eachDay) => eachDay.days === sel
    );
    console.log("Select Day Slot", selectedDaySlot);
    if (selectedDaySlot.length > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selected]);

  console.log("Add Slot", AddSlot);
  useEffect(() => {
    // handleSlots();
    handleTimeSlots();
    handleReschedule();
  }, [d_idManual]);
  return (
    <div>
      <div className="max-w-[130vw]">
        <div className="grid grid-cols-1  py-6 px-16">
          <div className="  row-span-1 rounded-[10px] ">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="col-span-1 w-[400px]">
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  footer={footer}
                  showOutsideDays
                  className="text-[18px]"
                />
              </div>
              <div className="col-span-1 h-full flex flex-wrap ml-0 sm:ml-0 md:ml-0 xl:ml-[-100px] ">
                {active == true ? (
                  <>
                    {AvailableSlots.map((val) => {
                      return (
                        <>
                          {/* <div className="row-span-2"> */}

                          <div
                            className="w-[250px] md:w-[200px] lg:w-[180px] xl:w-[220px]  text-center border-2 border-slate-300 p-5 m-3 cursor-pointer hover:bg-slate-100"
                            onClick={() =>
                              handleSlots(
                                val.id,
                                val.startTime.substring(11, 16),
                                val.endTime.substring(11, 16)
                              )
                            }
                            key={val.id}
                            id={val.id}
                          >
                            {d_idManual ? (
                              <p>
                                {val.startTime} -{val.endTime}
                              </p>
                            ) : (
                              <p>
                                {val.startTime} - {val.endTime}
                              </p>
                            )}
                          </div>
                          {/* </div> */}
                        </>
                      );
                    })}
                  </>
                ) : (
                  <p className="p-4 text-[20px] font-semibold">
                    No Slots Available
                  </p>
                )}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        {isModalOpen == true ? (
          <Modal
            title="Reschedule Appointment"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button
                key="back"
                onClick={handleCancel}
                style={{ color: "black", backgroundColor: "#f27e93" }}
              >
                No
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleOk}
                style={{ color: "black", backgroundColor: "lightblue" }}
              >
                Yes
              </Button>,
            ]}
          >
            <p className="text-[15px] font-semibold mt-10">
              Are you want to Reschedule the Appointment?
            </p>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Slots;
