import React from "react";
import tick from "../../assets/images/tick.png"

function AppointmentBook(props) {
  return (
    <div>
      <div className="max-w-[130vw]">
        <div className="grid grid-cols-1  py-6 px-16">
          <div className="  row-span-1 rounded-[10px] ">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-center mt-[200px]">
              <p className="text-[20px] font-medium text-center">
                
                Appointment Booked Successfully
              </p>
                <img src={tick} className="w-[30px] h-[30px]"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentBook;
