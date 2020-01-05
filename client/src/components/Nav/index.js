import React from "react";
import "./Nav.css";

function Nav() {

  return (
    <nav >
      <p className="lobby">
        <a href="/lobbies">LOBBIES</a>
      </p>
      <p className="profile">
        <a href="/profile">PROFILE</a>
      </p>
      <p className="logout">
        <a href="/">LOGOUT</a>
      </p>
      <p className="battle">
        <a href="/aigame">BATTLE THE BOT</a>
      </p>
    </nav>
  );
}

export default Nav;
