import React from "react";
import { NavLink } from 'react-router-dom';

function QuitButton() {
  return (
    <p>
      <button type="button" class="btn btn-danger">
        <NavLink to="/lobbies"> Quit Game </NavLink>
      </button>
    </p>
  );
}
export default QuitButton;