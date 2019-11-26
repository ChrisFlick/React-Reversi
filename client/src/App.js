import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Login from "./pages/login";
import { ReversiState } from "./utils/GlobalState";
import Board from './components/Board/board';
import './components/Board/board.css';

// const API = require("./utils/API")
// API.getGames("player1").then(res => {
//   console.log("jobs done")
// console.log(res)
// }).catch(err=>console.log(err))

function App() {
  return (
    <Router>
      
      <div>
        <ReversiState>
          <Nav />
          <Switch>
            <Route exact path="/" component={Board} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route component={NoMatch} />
          </Switch>
        </ReversiState>
      </div>
    </Router>
  );
}

export default App;
