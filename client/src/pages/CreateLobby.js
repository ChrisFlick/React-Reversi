import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card"
import Header from "../components/Header"
import Nav from "../components/Nav"
import API from "../utils/API"
import Avatar from '@material-ui/core/Avatar';

const username = localStorage.getItem("username")

const CreateLobby = () => {
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
        API.updateLobby(e.id, username)
        localStorage.setItem("lobby", e.id)
        document.location.href = "/lobby";

    }



    return (
        <div>
            <Header />
            <Nav />
            <Row>
                <Col size="md-6"></Col>
                <Col size="md-6">
                    <form id="createLobby">
                        Name:
                        <input id="name" type="text"></input>
                    </form>
                </Col>
            </Row>
        </div>
    )
}


export default CreateLobby;