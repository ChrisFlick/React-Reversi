import React, { useState } from "react";
import API from "../utils/API"
import Header from "../components/Header";
import Nav from "../components/Nav";
import Board from "../img/board.png"
import BlackDot from "../img/black-dot.png"
import WhiteDot from "../img/white-dot.png"
import Opponent from "../img/opponent.png"
import Player from "../img/player.png"
import { Container } from "../components/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import "../css/Game.css";

const Game = () => {

  return (
      <div className="game-container">
        <Header />
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
        <div class="game-board">
          <div className="scores">
            <div>GameBro 15</div>
            <div><img src={BlackDot}/></div>
            <div>Ramon 5</div>
            <div> <img src={WhiteDot}/></div>
          </div>
          <img src={Board} alt="Reversi board"/>
        </div>
        <div class="profiles">
        </div>
      </div>
  )
}

export default Game;