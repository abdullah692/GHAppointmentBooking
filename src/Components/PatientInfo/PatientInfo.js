import React, { useState } from "react";
import axios from "axios";
// import { DatePicker, Space } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

function PatientInfo(props) {

    const location = useLocation();
    const AddSlot = location.state;
    const avId=AddSlot.AddSlot.arr[0][0].id;
    const atId=AddSlot.AddSlot.arr[1][0].id;
    const startTime=AddSlot.AddSlot.arr[2][0].startTime;
    const endTime=AddSlot.AddSlot.arr[2][0].endTime;
    // console.log('avId',AddSlot.AddSlot.arr[0][0].id);
    // console.log('atId',AddSlot.AddSlot.arr[1][0].id);
    // console.log('Time Slots',AddSlot.AddSlot.arr[2][0]);
  const [pateintInfo, setPatientInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    avId:avId,
    atId:atId,
    startTime:startTime,
    endTime:endTime

  });
  const navigate=useNavigate();

//   const handleInput = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     console.log(name, value);
//     setPatientInfo({ ...pateintInfo, [name]: value });
//   };

const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setPatientInfo({
      ...pateintInfo,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("PatientInfo", pateintInfo);
    const ApiCall=await axios.post("http://3.138.89.18/api/booking/appointment",pateintInfo)
    .then((res)=>{
        console.log(res.data);
        if(res.data)
        {
            navigate("/appointmentBook")
        }
        else{
            alert("Something wrong in filling up the form")
        }

    }).catch(error => {
        console.error(error);
      }); 
    //
  };
//   const onChange = (date, dateString) => {
//     console.log(date, dateString);
//   };

  const handleDateChange = (date) => {
   


// console.log(formattedDate);
    setPatientInfo({
      ...pateintInfo,
      dob: date,
    });
  };


  return (
    <div>
      <div className="max-w-[130vw]">
        <div className="flex justify-center  py-6 px-16">
          <div className="p-10 m-4 border-2 border-slate-200 drop-shadow-lg w-[50pc] rounded-[10px]">
            <div>
              <p className="mb-3">
                Enter Patients Info<span className="text-[red]">*</span>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between">
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="p-3 w-[45%]"
                    required
                    name="fname"
                    value={pateintInfo.fname}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="p-3 w-[45%]"
                    required
                    name="lname"
                    value={pateintInfo.lname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="my-6">
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="p-3 w-full"
                    required
                    name="email"
                    value={pateintInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex my-6 ">
                  <input
                    type="number"
                    placeholder="Enter Phone Number"
                    className="p-3 w-[45%]"
                    required
                    name="phone"
                    value={pateintInfo.phone}
                    onChange={handleInputChange}
                  />
                  <div className="ml-20 mt-2 ">
                  <label>
        Gender:
        <input
          type="radio"
          name="gender"
          value="male"
          checked={pateintInfo.gender === "male"}
          onChange={handleInputChange}
          className="ml-4"
        />
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          checked={pateintInfo.gender === "female"}
          onChange={handleInputChange}
          className="ml-4"
        />
        Female
      </label>
                  </div>
                </div>
                <div className="flex my-6">
                  
                  <DatePicker
                  selected={pateintInfo.dob}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Enter Dob"
                  className="w-[320px] p-2"
                  name="dob"
                />
                  <div className="flex">
                  <label>
        Marital Status:
        <select
          name="maritalStatus"
          value={pateintInfo.maritalStatus}
          onChange={handleInputChange}
          className="ml-4 px-6 py-2 rounded-lg drop-shadow-lg"
        >
          <option value="">-- Please select --</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>
      </label>
                  </div>
                </div>
                <div className="text-center mt-[50px] ">
                  <button
                    className="w-full rounded-lg bg-gradient-to-r   from-sea-green to-dashboard-green 
                    text-white p-2 "
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientInfo;
