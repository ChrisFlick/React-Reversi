import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      {/* <p className="lobby"> */}
      <p>
        <a href="/lobbies">LOBBIES</a>
      </p>
      {/* <p className="profile"> */}
      <p>
        <a href="/profile">PROFILE</a>
      </p>
      {/* <p className="logout"> */}
      <p>
        <a href="/">LOGOUT</a>
      </p>
      {/* <p className="battle"> */}
      <p>
        <a href="/aigame">
        <p>BATTLE</p>
        <p>THE</p>
        <p>BOT</p>
        </a>
      </p>
    </div>
  );
}

export default Navbar;
