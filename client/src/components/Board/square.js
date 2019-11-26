import React from 'react';
import './board.css'

function Square(props) {
    return (
        <button className={"square"}
            onClick={props.onClick}
        >
            {props.color}
        </button>
    );
}
export default Square;