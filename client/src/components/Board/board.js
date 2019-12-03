import React from 'react';
import './board.css';
import Square from './square.js';
import {useStoreContext} from '../../utils/GlobalState';

function Board(props) {
    // let subArr;
    // for (let i = 0; i < 8; i++) {
    //     subArr = []
    //     for (let j = 0; j < 8; j++) {
    //     subArr.push([0][0])
    //         // subArr.push(0)
    //         if (j === 7) {
    //             board.push(subArr)
    //         }
    //     }
    // }

    // TODO: Add context and pass down onClick
    return (
        <div>
            {props.board.map((row,x) => {
                return <div className='row' key={x}>
                    {row.map((piece,y) => {
                        return <Square color={piece} onClick={() => props.onClick(x,y, props.dispatch)} key={y}></Square>
                    })}
                </div>
            })}
        </div>
    );
}
export default Board;