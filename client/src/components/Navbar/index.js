import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <p>
        <a href="/lobbies">LOBBIES</a>
      </p>
      <p>
        <a href="/profile">PROFILE</a>
      </p>
      <p>
        <a href="/">LOGOUT</a>
      </p>
      <span>
        <a href="/aigame">
        <p>BATTLE</p>
        <p>THE</p>
        <p>BOT</p>
        </a>
      </span>
    </div>
  );
}

export default Navbar;
