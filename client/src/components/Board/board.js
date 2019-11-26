import React from 'react';
import './board.css';
import Square from './square.js';
import useStoreContext from '../../utils/GlobalState';

function Board() {

    const board = [];
    let subArr;
    for (let i = 0; i < 8; i++) {
        subArr = []
        for (let j = 0; j < 8; j++) {
        subArr.push([0])
            // subArr.push(0)
            if (j === 7) {
                board.push(subArr)
            }
        }
    }

    // TODO: Add context and pass down onClick
    console.log(board)
 
    return (
        <div>
            {board.map(row => {
                return <div className='row'>
                    {row.map(piece => {
                        return <Square color={piece[0]}></Square>
                    })}
                </div>
            })}
        </div>
    );


}
export default Board;