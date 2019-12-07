import React, { useState, useEffect, useRef } from 'react';
import './board.css'

function Square(props) {
    const [backgroundColor, setBackgroundColor] = useState();
    const [border, setBorder] = useState();
    const propsColor = useRef(0);

    useEffect(() => {
        const currentColor = propsColor.current.innerHTML;
        if (currentColor === "1") {
            setBackgroundColor("#fff");
            setBorder("1px solid #000");
        } else if (currentColor === "2") {
            setBackgroundColor("#000");
            setBorder("1px solid #000");
        } else if (currentColor === "3") {
            setBackgroundColor("rgb(0,153,64)");
            setBorder("1px solid #90ee90");
        } else if (currentColor === "0") {
            setBackgroundColor("rgb(0,153,64)")
            setBorder("0px solid rgb(0,153,64)");
        }
    });

    return (
        <button className={"square"}
            onClick={props.onClick}
        >
            <div style={{
                height: '35px',
                width: '35px',
                backgroundColor: backgroundColor,
                borderRadius: '50%',
                marginTop: '5px',
                border: border,
                display: 'inline-block',
            }}
            ></div>
            <div style={{ display: "none" }} ref={propsColor}>
                {props.color}
            </div>
        </button>
    );
}
export default Square;