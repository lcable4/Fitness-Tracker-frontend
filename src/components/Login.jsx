import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apiAdapter";

export default function Login(props) {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const setCurrentUser = (user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setUser(user);
      };

      const handleClick = async (event) => {
        event.preventDefault();
        const result = await loginUser(userName, password);
        console.log(result);
        if (result && result.token) {
          localStorage.setItem("token", result.token);
          setLoggedIn(true);
          setCurrentUser(userName);
          navigate("/");
        } else {
          console.log(result.error);
        }
      }; 
  return (
    <>
    <div className='loginPage'>
        <h1>Join the Fitness Tracker Community and Reach Your Goals</h1>
        <div className='loginDiv'>
            <form onSubmit={handleClick} className='loginForm'>
                <label htmlFor="name">Name:</label>
                    <input type="text" id="name" />
                <br />
                <label htmlFor="username">Username:</label>
                    <input type="text" id="username" />
                <br />
                <label htmlFor="password">Password:</label>
                    <input type="password" id="password" />
                <br />
                <label htmlFor="verifyPassword">Verify Password:</label>
                    <input type="password" id="verifyPassword" />
                <br />
                <button className="submitBtn" type="submit">Submit</button>
                <br />
            </form> 
        </div>
        
    </div>
    </>
  )
}
