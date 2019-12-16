import React, { createContext, useReducer, useContext, useState } from 'react';
import Board from '../Board/board.js';
import {useStoreContext} from '../../utils/GlobalState';
import {
  UPDATE_BOARD,
} from "../../utils/actions";
import QuitButton from '../Quit/index.js';
import WhiteDot from "../../img/white-dot.png";
import BlackDot from "../../img/black-dot.png";
// import "./AI.css";

let wait = false;
let player1="You";
let player2="AI";
// adjacent spaces
let direction = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
// white == 1
// black == 2
let boards = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
let status= "";
let turn= 'White';
let winner= null;
let player= player1;
let passCounter = 0;
let startedGame = false;

function CompGame(props) {
	const [{board}, dispatch] = useStoreContext();
	let squares = board;
	if (!startedGame) {
		squares = startGame(boards);	
		dispatch({type: UPDATE_BOARD, board: squares});
		startedGame = true;
	}
	const element = (
		<div>
				<div>
					<div className="scores">
						<div></div>
						Score:
						<div><img src={WhiteDot} alt="White" /> X<span id="score-white">{getScores(squares).white}</span></div>
						<div><img src={BlackDot} alt="Black" /> X<span id="score-black">{getScores(squares).black}</span></div>
					</div>
					<div>
						<Board
							board = {squares}
							onClick = {handleClick}
							dispatch = {dispatch}
						/>
					</div>
					<div className="game-info">
						<div id="player-turn-box">
							<p><strong>Turn: </strong></p>
							<p><strong>Status: </strong></p>
						</div>
						<div>
							<p>{turn}, {player}</p>
							<p>{status}	{winner}</p>
						</div>
					</div>
				</div>
	    </div>
	);

	function aiTurn(board) {
		let choices = getValidMoves(board);
		let move = aiMove(choices);
		return move;
	}
	function aiMove(options) {
		let move = options[Math.floor(Math.random() * options.length)];
		return move;
	}

	function resetBoard(board) {
		for (var x = 0; x < board.length; x++) {
			for (var y = 0; y < board.length; y++) {
				//set square to empty
				board[x][y] = 0;
			}
		}
		return board;
	}
	function startGame(board) {
	 	resetBoard(board);
	 	//set middle 4 squares to black and white
	 	board[3][3] = 1;
	 	board[4][4] = 1;
	 	board[3][4] = 2;
	 	board[4][3] = 2;
		board = getBoardValidMoves(board);
		status = "New game with AI started. "+player+" go first!"
		return board;
	}

	function isValidMove(board,xPos,yPos) {
		let color;
		let otherColor;
		if (turn === "White") {
			color = 1;
			otherColor = 2;
		}
		else if (turn === "Black") {
			color = 2;
			otherColor = 1;
		}
	 	if (board[xPos][yPos] != 0 && board[xPos][yPos] != 3 || !isOnBoard(xPos,yPos)) {
	 		return false;
	 	}
	 	let changedColors = [];
	 	direction.forEach(dir => {
	 		let xDir = dir[0];
	 		let yDir = dir[1];
	 		let x = xPos;
	 		let y = yPos;
	 		x += xDir;
	 		y += yDir;
	 		if (isOnBoard(x,y) && board[x][y] === otherColor) {
	 			x += xDir;
	 			y += yDir;
	 			if (!isOnBoard(x,y)) {
	 				return;
	 			}
				while (board[x][y] === otherColor && isOnBoard(x,y)) {
					x += xDir;
					y += yDir;
					if (!isOnBoard(x,y)) {
						break;
					}
	 			}
	 			if (!isOnBoard(x,y)) {
	 				return;
	 			}
	 			if (board[x][y] === color) {
	 				let matchColor = true;
	 				while (matchColor) {
	 					changedColors.push([x,y]);
	 					x -= xDir;
	 					y -= yDir;
	 					if (x === xPos && y === yPos) {
	 						changedColors.push([x,y]);
	 						break;
	 					}
	 				} 

	 			}
	 		}
	 	});
	 	board[xPos][yPos] = 0;
	 	if (changedColors.length === 0) {
	 		return false;
	 	}
	 	return changedColors;
	}

	function getBoardValidMoves(board) {
		let space;
		if (!getValidMoves(board)) {
			return board;
		}
		else {
			for (space of getValidMoves(board)) {
				let x = space[0];
				let y = space[1];
				//highlight these squares
				board[x][y] = 3;
			}
			return board;
		}
	}

	function swapColor() {
		let newColor;
		if (turn === "White") {
			newColor = 1;
		}
		else
			newColor = 2;
		return newColor;
	}

	function getBoardSwapColors(board,array) {
		array.forEach(space => {
			let x = space[0];
			let y = space[1];
			//flip pieces
			board[x][y] = swapColor();
		})
		clearChoices(board);
		player = player === player1? player2: player1;
		turn = turn === 'White' ? 'Black': 'White';
		if (turn === "Black") {
			status = "Droid is thinking";
		}
		squares = board;
	}

	function clearChoices(board) {
		for (let x = 0; x < 8; x++) {
			for (let y = 0; y < 8; y++) {
				if (board[x][y] === 3) {
					board[x][y] = 0;
				}
			}
		}
	}

	function getValidMoves(board) {
		let validMoves = [];
		let range = Array.from({length: 8}, (x,i) => i);
		let x,y;
		for (x of range) {
			for (y of range) {
				if (isValidMove(board,x,y)) {
					validMoves.push([x,y]);
				}
			}
		}
		if (validMoves.length === 0) {
			return null;
		}
		else
			return validMoves;
	}

	function isOnBoard(x,y) {
		if (x >= 0 && x <= 7 && y >= 0 && y <= 7 ) {
			return true;
		}
		else
			return false;
	}

	function getScores(board) {
		let scoreW = 0;
		let scoreB = 0;
		let range = Array.from({length: 8}, (x,i) => i);
		let x,y;
		//count number of colored pieces
		for (x of range) {
			for (y of range) {
				if (board[x][y] === 1) {
					scoreW++;
				}
				if (board[x][y] === 2) {
					scoreB++;
				}
			}
		}
		return {white: scoreW, black:scoreB};
	}

	function pass() {
		if (getValidMoves(squares) === null) {
			return true;
		}
		else {
			return false;
		}
	}
	function isGameOver() {
		if (passCounter > 1 || isBoardFull()) {
			console.log("Game is Over");
			return true;
		}
		else
			return false;
	}

	function isBoardFull() {
		let range = Array.from({length: 8}, (x,i) => i);
		let x,y;
		for (x of range) {
			for (y of range) {
				if (board[x][y] === 0 || board[x][y] === 3) {return false;}
			}
		}
		console.log("Board is full");
		return true;
	}

	function handleClick(x,y,dispatch) {
		wait = false;
		if (!pass() && isValidMove(squares,x,y)) {
			let moves = getValidMoves(squares);
			for (let i = 0; i < moves.length; i++) {
				if (moves[i][0] === x && moves[i][1] === y) {
					getBoardSwapColors(squares,isValidMove(squares,x,y));
					if (pass() && !isGameOver()) {
						let playerPassing = player;
						player = player === player1? player2: player1;
						turn = turn === 'White' ? 'Black': 'White';
						status = playerPassing+" has no available moves. Pass";
						passCounter++;
						clearChoices(squares);
						getBoardValidMoves(squares);
						dispatch({type: UPDATE_BOARD, board: squares});
						return;
					}
					else
						getBoardValidMoves(squares);
				}
			}
			if (isGameOver()) {
				let finalScore = getScores(squares);
				if (finalScore.white > finalScore.black ) {
					winner = player1;
				}
				else if (finalScore.white < finalScore.black) {
					winner = player2;
				}
				else {
					winner = "No one";
				}
				status= "Game over! Winner: "+winner;
				winner = <QuitButton />;
				dispatch({type: UPDATE_BOARD, board: squares});
				return;
			}
			passCounter = 0;
			dispatch({type: UPDATE_BOARD, board: squares});

			let think = new Promise((resolve) => {
	        	wait = true;
	        	setTimeout(() => {
	            	return resolve(wait);
	        	}, 1000);
	    	});

			think.then(function() {
				if (player === player2 && wait === true) {
					let move = aiTurn(squares);
					getBoardSwapColors(squares,isValidMove(squares,move[0],move[1]));
					status = "Droid moved. Player's turn now";
					getBoardValidMoves(squares);
					dispatch({type: UPDATE_BOARD, board: squares});
				}
				if (isGameOver()) {
					let finalScore = getScores(squares);
					if (finalScore.white > finalScore.black ) {
						winner = player1;
					}
					else if (finalScore.white < finalScore.black) {
						winner = player2;
					}
					else {
						winner = "No one";
					}
					status = "Game over! Winner: "+winner;
					winner = <QuitButton />;
					dispatch({type: UPDATE_BOARD, board: squares});
					return;
				}
			});
			return;
		}
		else {
			status = "Not a valid move. Try again.";
			getBoardValidMoves(squares);
			dispatch({type: UPDATE_BOARD, board: squares});
			return;
		}

	}
	return element;
}

export default CompGame;