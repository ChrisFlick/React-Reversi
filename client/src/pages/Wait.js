import React, { useState, useEffect } from "react";
import Card from "../components/Card"
import API from "../utils/API"
import loading from "../img/loading.gif"
import "../css/Lobbies.css"

const lobbyId = localStorage.getItem('lobby')
localStorage.setItem("color", "White")

const Lobbies = () => {

    useEffect(() => {
        setInterval(() => {
            API.getLobby(lobbyId).then(results => {
                if (results.data[0].player2) {
                    localStorage.setItem("opponentName", results.data[0].player2)
                    document.location.href = "/games"
                }
            })
        }, 1000)
       
    })



    return (
        <div className="wait-container">
            <Card>
                <img src={loading} alt="loading"/>
                <h1>Waiting for opponent</h1>
            </Card>
        </div>
    )
}


export default Lobbies;