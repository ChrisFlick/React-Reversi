import React from "react";
import "../../css/Header.css";
import Logo from  "../../img/Reversi200.png";

function Header() {
  return(
    <header> <img src={Logo} alt="Reversi"/> </header>
  );
}

export default Header;