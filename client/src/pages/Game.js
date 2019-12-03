import React, { useState } from "react";
// import API from "../utils/API"
import Header from "../components/Header";
import Nav from "../components/Nav";
import Board from "../img/board.png";
import BlackDot from "../img/black-dot.png";
import WhiteDot from "../img/white-dot.png";
import Opponent from "../img/opponent.png";
import Player from "../img/player.png";
// import { Container } from "../components/Grid";
// import { makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
// import { deepOrange, deepPurple } from '@material-ui/core/colors';
import "../css/Game.css";
import Game from '../components/Game/game';

const Games = () => {

  return (
      <div className="game-container">
        <Header />
        <div className="navbar">Proposed Navbar</div>
        <Nav />
        <div class="game-info">
          <div className="game-details">
            <h5>Game Details:</h5>
            <ul style={{padding: 0}}>
              <li style={{listStyleType: "none"}}>Game ID</li>
              <li style={{listStyleType: "none"}}>Game Name</li>
              <li style={{listStyleType: "none"}}>Date</li>
            </ul>
          </div>
          <div className="game-details">
            <h5>Games List:</h5>
            <ol style={{padding: 13}}>
              <li>Death Match</li>
              <li>One More Time</li>
              <li>Mando's Turn</li>
            </ol>
          </div>
        </div>
        <Game className="game-board">
          {/* <div className="scores">
            <div>WhiteHead 15</div>
            <div><img src={BlackDot}/></div>
            <div>Ramon 5</div>
            <div> <img src={WhiteDot}/></div>
          </div>
          <img src={Board} alt="Reversi board"/> */}
        </Game>
        <div class="profiles">
          <div className="profile-details">
            <div><img src={Opponent} alt="Opponent"/></div>
            <div><img src={Player} alt="Player"/></div>
            <div className="elo">
              <div><img src={BlackDot}/></div>
              <div>WhiteHead 1300</div>
            </div>
            <div className="elo">
              <div><img src={WhiteDot}/></div>
              <div>Ramon 1400</div>
            </div>
          </div>
          <div className="quit-button">
            <button type="button" class="btn btn-danger">Quit</button>
          </div>
          <div className="timeout text-center">
            Timeout: 4 minutes
          </div>
          <div className="chatbox">Chat Box</div>
        </div>
      </div>
  )
}

export default Games;