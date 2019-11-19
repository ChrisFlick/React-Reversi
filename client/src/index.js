import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Game from './components/game.js'
import  SignInSide from './components/signIn'
//TODO: change to app to base whole sites renders

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

