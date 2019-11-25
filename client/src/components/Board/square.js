import React from 'react';
import './board.css'

 function Square(props) {
	
    return (
      <button className={"square"}
           onClick={props.onClick}
      >
       </button>
    );
}
export default Square;