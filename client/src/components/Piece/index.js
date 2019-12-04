import React from "react";
import BlackDot from "../img/black-dot.png";
import WhiteDot from "../img/white-dot.png";
import "./Piece.css";

const Piece = () => {
    return (
        <div className="piece-container">
          <div id="piece" className="black">
            <img src={BlackDot} id="black" alt="Black side"/>
            <img src={WhiteDot} id="white" alt="White side"/>
          </div>
        </div>
    )
}

export default Piece;