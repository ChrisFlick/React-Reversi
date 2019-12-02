import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card"
import CardHeader from "../components/CardHeader"
import CardBody from "../components/CardBody"
import API from "../utils/API"
import Avatar from '@material-ui/core/Avatar';

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
        API.updateLobby (e.id, username)
    }



    return (
        <div>
            <h1></h1>
            {state.lobbies.map(item => {
                if (item.hasRoom) {
                    return (
                        <h1><button id="hi"onClick={(e) => handleClick(item)}>{item.name}</button></h1>
                    )
                }
            })}
        </div>
    )
}


export default Lobbies;