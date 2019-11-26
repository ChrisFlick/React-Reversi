import React, { useState } from "react";
import { Container, fluid } from "../components/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid'; // Grid for avatars
import "../css/Signup.css";
import API from "../utils/API"

const Signup = () => {
  // Setting the component's initial state
  const [inputState, setInputState] = useState({
    userName: "",
    password: "",
    passwordConfirm: ""
  });

  const handleChange = event => {
    const value = event.target.value;
    const key = event.target.name;

    // Updating the input's state
    setInputState({
      ...inputState,
      [key]: value
    });
  };

  const handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    if (!inputState.userName) {
      alert("You must choose a user name.");
    } else if (inputState.password.length < 6) {
      alert("Password must be 6 to 15 characters in length.");
    } else if (inputState.password !== inputState.passwordConfirm) {
      alert("Passwords do not match.");
    }
    else {
      API.getProfile(inputState.userName).then((res) => {
        if (res.data.name) {
          alert("Username is already taken")
        } else {
          API.createProfile(inputState.userName, inputState.password, "").then((res) => {
            document.location.href = "/login"
            setInputState({
              userName: "",
              password: "",
              passwordConfirm: ""
            });
          })
        }
      })

    }
  };

  const useStyles = makeStyles({
    avatar: {
      margin: 10,
    },
    orangeAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: deepPurple[500],
    },
  });

  const classes = useStyles();

  return (
    <Container fluid>
      <>
        <header><h1>Reversi</h1></header>
        <div className="form-container">
          <div className="form-card">
            <form className="form">
              <span>
                Enter User Name:
                  <input
                  value={inputState.userName}
                  name="userName"
                  type="text"
                  placeholder="User Name"
                  onChange={handleChange}
                />
              </span>
              <span>
                Enter Password:
                <input
                  value={inputState.password.substring(0, 14)}
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                />
              </span>
              <span>
                Confirm Password
                <input
                  value={inputState.passwordConfirm}
                  name="passwordConfirm"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                />
              </span>
            </form>
            <Grid container justify="center" alignItems="center">
              <Avatar className={classes.avatar}>H</Avatar>
              <Avatar className={classes.orangeAvatar}>N</Avatar>
              <Avatar className={classes.avatar}>G</Avatar>
              <Avatar className={classes.purpleAvatar}>OP</Avatar>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Avatar className={classes.avatar}>J</Avatar>
              <Avatar className={classes.avatar}>Z</Avatar>
              <Avatar className={classes.orangeAvatar}>L</Avatar>
              <Avatar className={classes.purpleAvatar}>DV</Avatar>
            </Grid>
            <div className="avatar-choices">
              <p>Avatar Choices</p>
              <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </>
    </Container>
  );
}

export default Signup;
