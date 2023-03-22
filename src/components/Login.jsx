import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apiAdapter";



export default function Login() {
  
  const [login, setLogin] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  



  async function onLogin(username, password) {
      try {
        const result = await loginUser(username, password);
        console.log(result)
        if (result.token) {
            console.log(result)
            setResponse(result.token);
            setUsername("");
            setPassword("");
            setSubmitMessage("Successfully logged in!");
            // navigate('/')
            localStorage.setItem(`token-${username}`, result.token)
        } else if(result.error) {
          setErrorMessage("There was an error trying to login, Please try again")
          setUsername("");
          setPassword("");
        }
        
        console.log(response);
      } catch (error) {
        setErrorMessage("Incorrect login please try again!!")
        setUsername("");
        setPassword("");
        console.log(error);
      }
    }
  //userLogin("creator", "12345");

  return (
  <>
 
  <div className='loginDiv'>
      <h1>Login</h1>
      {errorMessage && <div>{errorMessage}</div>}
      <form 
        className='loginForm' 
        onSubmit={(event)=>
      {
          event.preventDefault();
          onLogin(username, password)//change to async
          console.log(response); 
          /*
          */
      }
      }>
      <p>
        <label className='loginLabel' >Username:
            <input name="username" 
                    type="text" 
                    value ={username} 
                    required 
                    className='loginInput'
                    onChange={(event)=>
            {
                console.log("change");
                setUsername(event.target.value);
            }}/>
        </label>
      </p>
      <p>
        <label className='loginLabel'>Password:
            <input name="password" 
                    type="password" 
                    value={password} 
                    required 
                    className='loginInput'
                    onChange={(event)=>
            {
                setPassword(event.target.value);
            }}/>

        </label>
      </p>
      <button type="submit" className='btns'>Log In</button>
      {submitMessage && <p>{submitMessage}</p>}
      <Link to="/registration">New user? Register here</Link>
      </form>
  <Link className="goBackBtns" to="/">Go Back</Link>
  </div>
  </>
)
}
