import React, { useState ,useEffect} from "react";
import { DoctorsInfo } from "./data";
import { useNavigate} from 'react-router-dom';
import axios from "axios";
import dr1 from "..//../assets/images/dr1.jpg"


function DoctorsList(props) {
    
  const [drList, setDrList] = useState([]);
  const navigate = useNavigate();
  

  const handleDrList=async()=>{
    const Apidata=await axios.get("http://3.138.89.18/api/booking/dentist/1")
    .then((res)=>{
      // console.log('Api response',res.data.data);
      setDrList(res.data.data)
    });
    // console.log('Api response',drList);
  }
  const handleInfo =(id) => {
    const filterData=drList.filter(info =>{
        return info.id===id
    })
    // setDrInfo(filterData)
    console.log(filterData)
     navigate(`/appTypes/${id}`,
    {state:{filterData}})
    
  };
useEffect(()=>{
  handleDrList()
},[])

  return (
    <div>
      <div className="max-w-[130vw] ">
        <div className="grid grid-cols-1  py-6 px-16">
          <div className="  row-span-1 rounded-[10px] ">
            <div className="grid grid-cols-3 gap-6">
              {drList.map((item) => {
                return (
                  <>
                    <div
                      className="grid grid-cols-2 rounded-[10px] border-2 border-slate-200 p-4 cursor-pointer"
                      onClick={()=>handleInfo(item.id)}
                      key={item.id}
                      id={item.id}
                    >
                      <div>
                        <img
                          src={dr1}
                          alt="doctors"
                          className="w-[150px] h-[100px] rounded-[20px]"
                        />
                      </div>
                      <div className="ml-2 mt-5">
                        <p className="text-[20px] font-semibold">{item.name}</p>
                        <p className="text-[14px]">{item.email}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorsList;
