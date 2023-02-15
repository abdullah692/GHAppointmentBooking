import React from 'react';
import logo from "../../assets/images/logo.png";

function Header(props) {
    return (
        <div>
            <div className="m-5">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="h-12" />
          <p className="text-[20px] ml-4 mt-2 font-bold">Genesis Health</p>
        </div>
        </div>
        </div>
    );
}

export default Header;