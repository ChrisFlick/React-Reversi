import React from "react";
import "../../css/Header.css";
import Logo from  "../../img/Reversi200.png";

function Header() {
  return(
    <header>
      <a href="/"><img src={Logo} alt="Reversi"/></a>
    </header>
  );
}

export default Header;