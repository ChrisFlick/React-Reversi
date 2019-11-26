import React, { useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { Container } from "../components/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid'; // Grid for avatars
import "../css/Signup.css";
import API from "../utils/API"

// Importing images
import profile_0 from "../img/profile_pics/profile_0.png"
import profile_1 from "../img/profile_pics/profile_1.png"
import profile_2 from "../img/profile_pics/profile_2.png"
import profile_3 from "../img/profile_pics/profile_3.png"
import profile_4 from "../img/profile_pics/profile_4.png"
import profile_5 from "../img/profile_pics/profile_5.png"
import profile_6 from "../img/profile_pics/profile_6.png"
import profile_7 from "../img/profile_pics/profile_7.png"
import profile_8 from "../img/profile_pics/profile_8.png"

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
      console.log(inputState.userName)
      API.getProfile(inputState.userName).then((res) => {
        console.log('hi')
        if (res.data.name) {
          alert("Username is already taken")
        } else {

          let avatar = document.querySelectorAll("input[name=avatar]:checked")[0].value

          console.log(avatar)
          API.createProfile(inputState.userName, inputState.password, avatar).then((res) => {
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
      <div>
        <Header />
        <Nav />
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
            <form id="avatar">
              <Grid container justify="center" alignItems="center">
                <input type="radio" name="avatar" value={0} checked="checked"></input>
                <Avatar className={classes.avatar}>
                  <img className="avatar" src={profile_0} alt="avatar"></img
                  ></Avatar>

                <input type="radio" name="avatar" value={1}></input>
                <Avatar className={classes.orangeAvatar}>
                  <img className="avatar" src={profile_1} alt="avatar"></img>
                </Avatar>

                <input type="radio" name="avatar" value={2}></input>
                <Avatar className={classes.avatar} >
                  <img className="avatar" src={profile_2} alt="avatar"></img>
                </Avatar>

                <input type="radio" name="avatar" value={3}></input>
                <Avatar className={classes.purpleAvatar} >
                  <img className="avatar" src={profile_3} alt="avatar"></img>
                </Avatar>

                <input type="radio" name="avatar" value={4}></input>
                <Avatar className={classes.purpleAvatar} >
                  <img className="avatar" src={profile_4} alt="avatar"></img>
                </Avatar>

              </Grid>
              <Grid container justify="center" alignItems="center">
                <input type="radio" name="avatar" value={5}></input>
                <Avatar className={classes.avatar} >
                  <img className="avatar" src={profile_5} alt="avatar"></img>
                </Avatar>

                <input type="radio" name="avatar" value={6}></input>
                <Avatar className={classes.avatar} >
                  <img className="avatar" src={profile_6} alt="avatar"></img>
                </Avatar>

                <input type="radio" name="avatar" value={7}></input>
                <Avatar className={classes.orangeAvatar} >
                  <img className="avatar" src={profile_7} alt="avatar"></img>
                </Avatar>

                <input type="radio" name="avatar" value={8}></input>
                <Avatar className={classes.purpleAvatar} >
                  <img className="avatar" src={profile_8} alt="avatar"></img>
                </Avatar>
              </Grid>
            </form>

            <div className="avatar-choices">
              <p>Avatar Choices</p>
              <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
