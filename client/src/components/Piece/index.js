import React from "react";
import BlackDot from "../../img/black-dot.png";
import WhiteDot from "../../img/white-dot.png";
import "./Piece.css";

const handleClick = event => {
  const piece = document.getElementById("piece");
  const black = document.getElementById("black");
  const white = document.getElementById("white");

  event.preventDefault();
  // Flip the piece over
  const clickedPiece = event.target;
  if (clickedPiece.parentElement.className === "black") {
    blackFlipDown(black);
    setTimeout(() => whiteFlipUp(white, piece), 250);
  } else if (clickedPiece.parentElement.className === "white") {
    whiteFlipDown(white);
    setTimeout(() => blackFlipUp(black, piece), 250);
  }
  function blackFlipDown(black) {
    black.className = "black-flip-down";
    black.style.transform = "rotateY(90deg)";
  }

  function blackFlipUp(black, piece) {
    black.className = "black-flip-up";
    black.style.transform = "rotateY(0deg)";
    piece.className = "black";
  }

  function whiteFlipDown(white) {
    white.className = "white-flip-down";
    white.style.transform = "rotateY(90deg)";
  }

  function whiteFlipUp(white, piece) {
    white.className = "white-flip-up";
    white.style.transform = "rotateY(0deg)";
    piece.className = "white";
  }
}

const Piece = () => {
  return (
    <div className="piece-container">
      <div id="piece" className="black" 
      onClick={handleClick}
      >
        <img src={BlackDot} id="black" alt="Black side" />
        <img src={WhiteDot} id="white" alt="White side" />
      </div>
    </div>
  )
}

export default Piece;