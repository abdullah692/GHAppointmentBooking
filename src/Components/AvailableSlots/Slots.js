import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { AvailableSlots } from "./data";
import PatientInfo from "../PatientInfo/PatientInfo";
import { useLocation } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Slots(props) {
  const [selected, setSelected] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [data,setData]=useState([]);
  const arr = [];
  const navigate = useNavigate();
  const location = useLocation();
  // const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP EEEE")}</p>;
    console.log(format(selected, "EEEE"));
  }

  const AddSlot = location.state;

  const handleSlots = (id) => {
    const SlotfilterData = AvailableSlots.filter((info) => {
      return info.id === id;
    });
    console.log("Slots Filter data", SlotfilterData);
    AddSlot.arr.push( SlotfilterData);
    
    
    console.log("Slot Appointment", AddSlot);
    navigate("/patientInfo", { state: { AddSlot} });
  };

  const handleTimeSlots = async () => {
    const Apidata = await axios
      .get("http://3.138.89.18/api/booking/availability/1")
      .then((res) => {
        console.log("Slots Api response", res.data.data);
        setAvailableSlots(res.data.data);
      });

    // console.log('Slot Api response',availableSlots);
  };

  
  console.log("Add Slot", AddSlot);
  useEffect(() => {
    handleTimeSlots();
  }, []);
  return (
    <div>
      <div className="max-w-[130vw]">
        <div className="grid grid-cols-1  py-6 px-16">
          <div className="  row-span-1 rounded-[10px] ">
            <div className="grid grid-cols-2 gap-4">
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
              <div className="col-span-1 h-full flex flex-wrap ml-[-250px]">
                {format(selected, "EEEE").toLowerCase() === "monday" ? (
                  <>
                    {AvailableSlots.map((val) => {
                      return (
                        <>
                          {/* <div className="row-span-2"> */}

                          <div
                            className="w-[250px] text-center border-2 border-slate-300 p-5 m-3 cursor-pointer hover:bg-slate-100"
                            onClick={() => handleSlots(val.id)}
                            key={val.id}
                            id={val.id}
                          >
                            <p>{val.startTime} - {val.endTime}</p>
                          </div>
                          {/* </div> */}
                        </>
                      );
                    })}
                  </>
                ) : format(selected, "EEEE").toLowerCase() === "tuesday" ? (
                  <>
                    {AvailableSlots.map((val) => {
                      return (
                        <>
                          {/* <div className="row-span-2"> */}
                          <div
                            className="w-[250px] text-center border-2 border-slate-300 p-5 m-3 cursor-pointer hover:bg-slate-100" 
                            onClick={() => handleSlots(val.id)}
                            key={val.id}
                            id={val.id}
                          >
                            <p>{val.startTime} - {val.endTime}</p>
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
      </div>
    </div>
  );
}

export default Slots;
