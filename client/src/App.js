import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Login from "./pages/login";
import { ReversiState } from "./utils/GlobalState";

const API = require("./utils/API")
API.createGame("1", "userB", "player1").then(res => {
console.log("jobs done")
}).catch(err=>console.log(err))

function App() {
  return (
    <Router>
      
      <div>
        <ReversiState>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </ReversiState>
      </div>
    </Router>
  );
}

export default App;
