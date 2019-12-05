import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import BlackDot from "../img/black-dot.png";
import WhiteDot from "../img/white-dot.png";
import API from "../utils/API"
import "../css/Game.css";
import Game from '../components/Game/game';

// Importing images
import profile_0 from "../img/profile_pics/profile_0.png"
import profile_1 from "../img/profile_pics/profile_1.png"
import profile_2 from "../img/profile_pics/profile_2.png"
import profile_3 from "../img/profile_pics/profile_3.png"
import profile_4 from "../img/profile_pics/profile_4.png"
import profile_5 from "../img/profile_pics/profile_5.png"
import profile_6 from "../img/profile_pics/profile_6.png"
import profile_7 from "../img/profile_pics/profile_7.png"
import profile_8 from "../img/profile_pics/profile_8.png"
import loading from "../img/loading.gif"

const username = localStorage.getItem("username")
const opponentName = localStorage.getItem("opponentName")

let userColor;
let opponentColor;
if (localStorage.getItem("color") === "White") {
  userColor = 0;
  opponentColor = 1;
} else {
  userColor = 1;
  opponentColor = 0;
}

let profilePic = [
  profile_0,
  profile_1,
  profile_2,
  profile_3,
  profile_4,
  profile_5,
  profile_6,
  profile_7,
  profile_8,
  loading
]

let colorPic = [
  WhiteDot,
  BlackDot
]

const Games = () => {

  const [state, setState] = useState({
    playerElo: 1000,
    playerPic: 9,
    playerName: "",

    opponentElo: 1000,
    opponentPic: 9,
    opponentName: ""
  })


  useEffect(() => {
    API.getProfile(username).then((results) => {
      API.getProfile(opponentName).then((res) => {
        setState({
          playerPic: results.data.profilePic,
          playerName: results.data.name,
          playerElo: results.data.elo,

          opponentPic: res.data.profilePic,
          opponentName: res.data.name,
          opponentElo: res.data.elo
        })
      })
    })
  }, [])


  return (
    <div className="game-container">
      <Header />
      <div className="navbar">Proposed Navbar</div>
      <Nav />
      <Game className="game-board">
      </Game>
      <div className="profiles">
        <div className="profile-details">
          <div><img src={profilePic[state.playerPic]} alt="player" /></div>
          <div><img src={profilePic[state.opponentPic]} alt="opponent" /></div>
          <div className="elo">
            <div><img src={colorPic[userColor]} /></div>
            <div>{state.playerName} {state.playerElo}</div>
          </div>
          <div className="elo">
            <div><img src={colorPic[opponentColor]} /></div>
            <div>{state.opponentName} {state.opponentElo}</div>
          </div>
        </div>
        <div className="quit-button">
          <button type="button" className="btn btn-danger">Quit</button>
        </div>
      </div>
    </div>
  )
}

export default Games;