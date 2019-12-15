import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card"
import CardHeader from "../components/CardHeader"
import CardBody from "../components/CardBody"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Nav from "../components/Nav"
import API from "../utils/API"
import Avatar from '@material-ui/core/Avatar';
import "../css/Lobbies.css"

const username = localStorage.getItem("username")

const Lobbies = () => {
    const [state, setState] = useState({
        lobbies: []
    })

    useEffect(() => {
        API.getLobby().then(results => {
            if (results.data !== []) {
                setState({
                    lobbies: results.data
                })
            }
        })
    })

    const handleClick = (e) => {
        API.updateLobby(e.id, username).then((results) => {
            localStorage.setItem("lobby", e.id)
            localStorage.setItem("color", 'Black')

            API.getLobby(e.id).then(res => {
                localStorage.setItem("opponentName", res.data[0].player1)
                document.location.href = "/games";
            })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        API.createLobby(document.getElementById('name').value, username).then(results => {
            localStorage.setItem("lobby", results.data)
            document.location.href = "/wait"
        })
    }

    return (
        <div className="lobbies-container">
            <Header />
            <Navbar />
            <Nav />
            <div className="lobbies">
                <div className="create-card">
                    <p>Create a Lobby</p>
                    <form id="createLobby" onSubmit={handleSubmit}>
                        Name:
                        <input id="name" type="text"></input>
                    </form>
                </div>
                <div className="join-card">
                    <h1>Join a lobby</h1>
                    {state.lobbies.map(item => {
                        if (item.hasRoom) {
                            return (
                                <h4><button id="hi" onClick={(e) => handleClick(item)}>{item.name}</button></h4>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}


export default Lobbies;