import React from "react";
import "./Header.css";
import Logo from  "../../img/React_Reversi_logo.svg";

function Header() {
  return(
    <header>
      <a href="/"><img src={Logo} alt="React Reversi"/></a>
    </header>
  );
}

export default Header;