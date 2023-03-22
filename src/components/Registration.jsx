import { React, useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../apiAdapter";

export default function Registration() {
  
    let[newUser, setNewUser] = useState("");
    let[newUserName, setNewUserName] = useState("");
    let[newUserPass, setNewUserPass] = useState("");
    let[passVerification, setPassVerification] = useState("");
    let[submitMessage, setSubmitMessage] = useState("");
    let[errorMessage, setErrorMessage] = useState("");

    async function registerNewUser(name, password) {
        
        if (newUserPass !== passVerification) {
            setErrorMessage("Passwords do not match.")
            return;
        }
        
        
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-FT/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: newUserName,
                        password: newUserPass,
                    }
                })
            });

            const result = await response.json();
            if(result.success) {
                setNewUser(result.data.token);
                setSubmitMessage("Successfully registered!");
                setNewUserName("");
                setNewUserPass("");
                setPassVerification("")

                localStorage.setItem(name, password);
                localStorage.setItem(`token-${newUserName}`, result.data.token)
            } else {
                setErrorMessage(result.error.message)
            }
        } catch (error) {
            setErrorMessage("Passwords do not match.")
            console.log(error);
        }
    }
    
    return (
    <>   
    <div className="registrationDiv">
        <h1>Register</h1>
        {errorMessage && <div>{errorMessage}</div>}
        <form className="registrationForm" onSubmit={(e) => {
            e.preventDefault();
            registerNewUser(newUserName, newUserPass);
        }}>
            
                <label className="registrationLabels">
                    Enter your name:
                    <br/>
                    <input
                        name="name"
                        type="text"
                        value={newUserName}
                        required
                        className="registrationInputs"
                        minLength="5"
                        onChange={(e) => {
                            setNewUserName(e.target.value);
                        }}
                    />
                </label>    
            
                <label className="registrationLabels">
                    Set your new password:
                    <br/>
                    <input
                        name="password"
                        type="password"
                        value={newUserPass}
                        required
                        className="registrationInputs"
                        minLength="5"
                        onChange={(e) => {
                            setNewUserPass(e.target.value);
                        }}
                    />
                </label>
            
                <label className="registrationLabels">
                    Verify your password:
                    <br/>
                    <input 
                        name="password"
                        type="password"
                        value={passVerification}
                        required
                        className="registrationInputs"
                        minLength="5"
                        onChange={(e) => {
                            setPassVerification(e.target.value);
                        }}/>
                </label>
            
            <button className='btns' type="submit">Submit</button>
            {submitMessage && <p>{submitMessage}</p>}
            <p>
            <Link to="/login">Already a user? Sign in</Link>
            </p>
        </form>
        <Link className="goBackBtns" to="/">Go Back</Link>
    </div>            
    </>
  )
}
