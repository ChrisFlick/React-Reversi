import React, { useState, useEffect, useRef } from 'react';
import './board.css'

function Square(props) {
    const [background, setBackground] = useState();
    const [backgroundColor, setBackgroundColor] = useState();
    const [border, setBorder] = useState();
    const propsColor = useRef(0);

    useEffect(() => {
        const currentColor = propsColor.current.innerHTML;
        if (currentColor === "1") {
            setBackground("linear-gradient(30deg, rgba(255, 255, 255, 0.5) 0%," +
            "rgba(203, 203, 203, 0.44) 11.02%, rgba(150, 150, 150, 0.38) 23.9%," +
            "rgba(104, 104, 104, 0.32) 36.96%, rgba(67, 67, 67, 0.25) 49.92%," +
            "rgba(37, 37, 37, 0.19) 62.76%, rgba(17, 17, 17, 0.12) 75.46%," +
            "rgba(4, 4, 4, 0.06) 87.95%, rgba(0, 0, 0, 0) 100%)");
            setBackgroundColor("#fff");
            setBorder("1px solid #000");
        } else if (currentColor === "2") {
            setBackground("linear-gradient(210deg, rgba(255, 255, 255, 0.7) 0%," +
            "rgba(203, 203, 203, 0.62) 11.02%, rgba(150, 150, 150, 0.53) 23.9%," +
            "rgba(104, 104, 104, 0.44) 36.96%, rgba(67, 67, 67, 0.35) 49.92%," +
            "rgba(37, 37, 37, 0.26) 62.76%, rgba(17, 17, 17, 0.17) 75.46%," +
            "rgba(4, 4, 4, 0.08) 87.95%, rgba(0, 0, 0, 0) 100%)");
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
                background: background,
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