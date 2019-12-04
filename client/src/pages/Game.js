import React, { useState, useEffect, useContext } from "react";
// import API from "../utils/API"
import Header from "../components/Header";
import Nav from "../components/Nav";
import BlackDot from "../img/black-dot.png";
import WhiteDot from "../img/white-dot.png";
import API from "../utils/API"

// import { useStoreContext } from "../utils/GlobalState";
// import {
//   ADD_PEER,
// } from "../utils/actions";
// import { Container } from "../components/Grid";
// import { makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
// import { deepOrange, deepPurple } from '@material-ui/core/colors';
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
      <div className="game-info">
        <div className="game-details">
          <h5>Game Details:</h5>
          <ul style={{ padding: 0 }}>
            <li style={{ listStyleType: "none" }}>Game ID</li>
            <li style={{ listStyleType: "none" }}>Game Name</li>
            <li style={{ listStyleType: "none" }}>Date</li>
          </ul>
        </div>
        <div className="game-details">
          <h5>Games List:</h5>
          <ol style={{ padding: 13 }}>
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
      <div className="profiles">
        <div className="profile-details">
          <div><img src={profilePic[state.playerPic]} alt="player" /></div>
          <div><img src={profilePic[state.opponentPic]} alt="opponent" /></div>
          <div className="elo">
            <div><img src={BlackDot} /></div>
            <div>{state.playerName} {state.playerElo}</div>
          </div>
          <div className="elo">
            <div><img src={WhiteDot} /></div>
            <div>{state.opponentName} {state.opponentElo}</div>
          </div>
        </div>
        <div className="quit-button">
          <button type="button" className="btn btn-danger">Quit</button>
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