import React, { useState } from "react";
import { Container } from "../components/Grid";
import "../css/Signup.css";

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
      setInputState({
        userName: "",
        password: "",
        passwordConfirm: ""
      });
    }
  };

  return (
    <Container fluid>
      <div>
        <header><h1>Reversi</h1></header>
          <div className="form-container">
            <div className="form-card">
              <form className="form">
              Enter User Name:
              <input
                value={inputState.userName}
                name="userName"
                type="text"
                placeholder="User Name"
                onChange={handleChange}
              />
              Enter Password
              <input
                value={inputState.password.substring(0, 14)}
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
              />
              Confirm Password
              <input
                value={inputState.passwordConfirm}
                name="passwordConfirm"
                type="password"
                placeholder="password"
                onChange={handleChange}
              />
              <button onClick={handleFormSubmit}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
