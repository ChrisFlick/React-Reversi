import React, { useState, useEffect } from "react";
import Card from "../components/Card"
import CardHeader from "../components/CardHeader"
import CardBody from "../components/CardBody"
import Header from "../components/Header"
import API from "../utils/API"
import Navbar from "../components/Navbar";
import Nav from "../components/Nav";
import "../css/Profile.css";


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

// console.log("loggen")
const Profile = () => {
  const [state, setState] = useState({
    name: "Loading..",
    elo: 0,
    wins: 0,
    loses: 0,
    pic: 9
  })

  useEffect(() => {
    API.getProfile(username).then((results) => {

      setState({
        pic: results.data.profilePic,
        name: results.data.name,
        elo: results.data.elo,
        wins: results.data.wins,
        loses: results.data.loses
      })
    })
  },[])


  return (
    <div className="profile-container">
      <Header />
      <Navbar />
      <Nav />
      <div className="userprofile">
        <Card>
          <CardBody>
            <h1>{state.name}</h1>
            <img src={profilePic[state.pic]} alt="profile picture" className="profilePic"></img>
          </CardBody>
        </Card>
      </div>
      <div className="details">
        <Card>
          <CardHeader><h4>ELO Rating:</h4></CardHeader>
          <CardBody><h1>{state.elo}</h1></CardBody>
        </Card>
        <div className="standings">
          <Card>
            <CardHeader><h4>Wins:</h4></CardHeader>
            <CardBody><h1>{state.wins}</h1></CardBody>
          </Card>
          <Card>
            <CardHeader><h4>Loses:</h4></CardHeader>
            <CardBody><h1>{state.loses}</h1></CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
