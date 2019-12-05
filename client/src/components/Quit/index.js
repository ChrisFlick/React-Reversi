import React from "react";
import { NavLink } from 'react-router-dom';

function QuitButton() {
    return (
        <button className={"QuitButton"}
        >
        <NavLink to="/lobbies"> Quit Game </NavLink>
        </button>
    );
}
export default QuitButton;