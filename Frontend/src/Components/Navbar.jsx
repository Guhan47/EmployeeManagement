import React from "react";
import "../Styles/Navbar.css";
import bell from "../assets/bell.png";
import settings from "../assets/set1.png";
import profile from "../assets/Profile.jpg";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="left">
          <font className="title">RS-TECH</font>
        </div>

        <div className="right">
          <img src={bell} alt="" width="45px" height="45px" />
          <img src={settings} alt="" width="30px" height="30px" />
          <img src={profile} alt="" width="30px" height="30px" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
