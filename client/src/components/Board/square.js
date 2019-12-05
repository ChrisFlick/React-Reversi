import React, { useState, useEffect, useRef } from 'react';
import './board.css'
import Piece from '../Piece'

function Square(props) {
    const [backgroundColor, setBackgroundColor] = useState();
    const propsColor = useRef(0);

useEffect(() => {
    const currentColor = propsColor.current.innerHTML;
    if (currentColor === "1") {
        setBackgroundColor("#fff");
    } else if (currentColor === "2") {
        setBackgroundColor("#000");
    } else if (currentColor === "3") {
        setBackgroundColor("#90ee90");
    } else if (currentColor === "0") {
        setBackgroundColor("rgb(0,153,64)");
    }

});

    return (
        <button className={"square"}
            onClick={props.onClick}
            style={{ backgroundColor: backgroundColor }}
        >
            <div style={{display: "none"}} ref={propsColor}>
            
                {props.color}
                </div>
        </button>
    );
}
export default Square;