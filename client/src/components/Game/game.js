import React, { createContext, useReducer, useContext, useEffect } from 'react';
import Board from '../Board/board.js';
import API from "../../utils/API";
import { useStoreContext } from '../../utils/GlobalState';
import {
	UPDATE_BOARD,
} from "../../utils/actions";
import Peer from "peerjs";
import QuitButton from '../Quit/index.js';
import Card from '../Card/index.js';
import WhiteDot from "../../img/white-dot.png";
import BlackDot from "../../img/black-dot.png";

const username = localStorage.getItem("username");
const opponentName = localStorage.getItem("opponentName");
const color = localStorage.getItem('color');

const peer = new Peer(username, {
	// host: '74.207.252.238',
	debug: 3
});

let conn;


let player1 = "player1";
let player2 = "player2";
// adjacent spaces
let direction = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
// white == 1
// black == 2
let boards = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
let status = '';
let turn = 'White';
let winner = null;
let player = whoGoesFirst(player1, player2);
let passCounter = 0;
let startedGame = false;

function whoGoesFirst(player1, player2) {
	let first = Math.random() < 0.5 ? player1 : player2;
	return first;
}
function Game(props) {

	const [{ board }, dispatch] = useStoreContext();
	let squares = board;
	if (!startedGame) {
		squares = startGame(boards);
		dispatch({ type: UPDATE_BOARD, board: squares });
		startedGame = true;
	}

	useEffect(() => {


		conn = peer.connect(opponentName);
		// on open will be launch when you successfully connect to PeerServer


		peer.on('connection', function (conn) {
			conn.on('data', function (data) {
				// Handles coordinates from opponent
				handleClick(data[0], data[1], dispatch);
			});
		});
	}, [])


	const element = (
		<div>
			<div className="scores">
				<div></div>
				Score:
				<div><img src={WhiteDot} alt="White" /> X<span id="score-white">{getScores(squares).white}</span></div>
				<div><img src={BlackDot} alt="Black" /> X<span id="score-black">{getScores(squares).black}</span></div>
			</div>
			<div>
				<Board
					board={squares}
					onClick={handleTurn}
					dispatch={dispatch}
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
	);

	function handleTurn(x, y, dispatch) {
		if (color === turn) {
			handleClick(x, y, dispatch)
		}
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
		return board;
	}

	function isValidMove(board, xPos, yPos) {
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
		if (board[xPos][yPos] != 0 && board[xPos][yPos] != 3 || !isOnBoard(xPos, yPos)) {
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
			if (isOnBoard(x, y) && board[x][y] === otherColor) {
				x += xDir;
				y += yDir;
				if (!isOnBoard(x, y)) {
					return;
				}
				while (board[x][y] === otherColor && isOnBoard(x, y)) {
					x += xDir;
					y += yDir;
					if (!isOnBoard(x, y)) {
						break;
					}
				}
				if (!isOnBoard(x, y)) {
					return;
				}
				if (board[x][y] === color) {
					let matchColor = true;
					while (matchColor) {
						changedColors.push([x, y]);
						x -= xDir;
						y -= yDir;
						if (x === xPos && y === yPos) {
							changedColors.push([x, y]);
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

	function getBoardSwapColors(board, array) {
		array.forEach(space => {
			let x = space[0];
			let y = space[1];
			//flip pieces
			board[x][y] = swapColor();
		})
		clearChoices(board);
		player = player === player1 ? player2 : player1;
		turn = turn === 'White' ? 'Black' : 'White';
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
		let range = Array.from({ length: 8 }, (x, i) => i);
		let x, y;
		for (x of range) {
			for (y of range) {
				if (isValidMove(board, x, y)) {
					validMoves.push([x, y]);
				}
			}
		}
		if (validMoves.length === 0) {
			return null;
		}
		else
			return validMoves;
	}

	function isOnBoard(x, y) {
		if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
			return true;
		}
		else
			return false;
	}

	function getScores(board) {
		let scoreW = 0;
		let scoreB = 0;
		let range = Array.from({ length: 8 }, (x, i) => i);
		let x, y;
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
		return { white: scoreW, black: scoreB };
	}

	function pass() {
		if (!getValidMoves(squares)) {
			let playerPassing = player;
			player = player === player1 ? player2 : player1;
			turn = turn === 'White' ? 'Black' : 'White';
			status = playerPassing + " has no available moves. Pass";
			passCounter++;
		}
		else {
			return false;
		}
	}
	function isGameOver() {
		if (passCounter > 1) {
			return true;
		}
		else
			return false;
	}

	function handleClick(x, y, dispatch) {
		if (!pass() && isValidMove(squares, x, y)) {

			conn = peer.connect(opponentName);
			conn.on('open', function () {
				// here you have conn.id
				conn.send([x, y]);
			});

			let moves = getValidMoves(squares);
			let swapColors;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i][0] === x && moves[i][1] === y) {
					getBoardSwapColors(squares, isValidMove(squares, x, y));
					if (pass() && !isGameOver()) {
						pass();
						clearChoices(squares);
						getBoardValidMoves(squares);
						dispatch({ type: UPDATE_BOARD, board: squares });
						return;
					}
					else
						getBoardValidMoves(squares);
				}
			}
			if (isGameOver()) {
				let finalScore = getScores(squares);
				if (finalScore.white > finalScore.black) {
					winner = "White";

					if (color === winner) {
						API.updateElo(username, opponentName, true);
					} else {
						API.updateElo(username, opponentName, false);
					}
				}
				else if (finalScore.white < finalScore.black) {
					winner = "Black";
				}
				else {
					winner = "No one";
				}
				if (color === winner) {
					API.updateElo(username, opponentName, true)
				} else {
					API.updateElo(username, opponentName, false)
				}
				status = "Game over! Winner: " + winner;
				winner = <QuitButton />;
				dispatch({ type: UPDATE_BOARD, board: squares });
				return;
			}
			passCounter = 0;
			status = '';
			dispatch({ type: UPDATE_BOARD, board: squares });
			return;
		}
		else {
			status = "Not a valid move. Try again.";
			getBoardValidMoves(squares);
			dispatch({ type: UPDATE_BOARD, board: squares });
			return;
		}

	}
	return element;
}

export default Game;