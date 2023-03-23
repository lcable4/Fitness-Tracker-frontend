import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apiAdapter";



export default function Login(props) {
 
  const [login, setLogin] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const setCurrentUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setUser(user);
  };

const handleClick = async (event) => {
  event.preventDefault();
  const result = await loginUser(username, password);
  if (result && result.token) {
    localStorage.setItem('token', result.token)
    props.setLoggedIn(true)
    console.log(props, "PROPS LOG")
    setResponse(result.token);
    setUsername("");
    setPassword("");
    setSubmitMessage("Successfully logged in!");
    navigate("/")
} else {
  
  setErrorMessage("There was an error trying to login, Please try again")
  setUsername("");
  setPassword("");
  console.log(result.error)
}
}
  //userLogin("creator", "12345");

  return (
    <>
      <div className='componentHeaders'>
      <h1>Login</h1>

      </div>
      <div className='loginDiv'>
        {errorMessage && <div>{errorMessage}</div>}
        <form className='loginForm' onSubmit={handleClick}>
          <p>
            <label className='loginLabel'>Username:
              <input
                name="username"
                type="text"
                value={username}
                required
                className='loginInput'
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </label>
          </p>
          <p>
            <label className='loginLabel'>Password:
              <input
                name="password"
                type="password"
                value={password}
                required
                className='loginInput'
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </label>
          </p>
          <button type="submit" className='btns'>Log In</button>
          {submitMessage && <p>{submitMessage}</p>}
          <br />
          <Link to="/registration">New user? Register here</Link>
        </form>
        <Link className="goBackBtns" to="/">Go Back</Link>
      </div>
    </>
  )
              }
