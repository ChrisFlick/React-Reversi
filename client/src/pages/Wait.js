import React, { useState, useEffect } from "react";
// import { Col, Row, Container } from "../components/Grid";
// import Card from "../components/Card"
// import CardHeader from "../components/CardHeader"
// import CardBody from "../components/CardBody"
// import Header from "../components/Header"
// import Nav from "../components/Nav"
import API from "../utils/API"
import "../css/Lobbies.css"

const lobbyId = localStorage.getItem('lobby')
localStorage.setItem("color", "White")

const Lobbies = () => {

    useEffect(() => {
        setInterval(() => {
            API.getLobby(lobbyId).then(results => {
                if (results.data[0].player2) {
                    document.location.href = "/games"
                }
            })
        }, 1000)
       
    })



    return (
        <div>
            <h1>Waiting for opponent..</h1>
        </div>
    )
}


export default Lobbies;