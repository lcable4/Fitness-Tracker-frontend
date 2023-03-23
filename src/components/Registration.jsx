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
    const navigate = useNavigate();

    async function registerNewUser(name, password) {
        
        if (newUserPass !== passVerification) {
            setErrorMessage("Passwords do not match.")
            return;
        }
        
        
        try {
            
            const result = await registerUser(name, password);
            console.log(result, "RESULT LOG")
            if(result.success) {
                localStorage.setItem(`token-${newUserName}`, result.data.token)
                setNewUser(result.data.token);
                setSubmitMessage("Successfully registered!");
                setNewUserName("");
                setNewUserPass("");
                setPassVerification("")
                navigate("/login")
            } else {
                setErrorMessage("An error occurred during registration")
            }
        } catch (error) {
            setErrorMessage("Passwords do not match.")
            console.log(error);
        }
    }
    
    return (
    <>   
    <div className="componentHeaders">
        <h1>Register</h1>

    </div>
    <div className="registrationDiv">
        {errorMessage && <div>{errorMessage}</div>}
        <form className="registrationForm" onSubmit={(e) => {
            e.preventDefault();
            registerNewUser(newUserName, newUserPass);
        }}>
            
                <label className="registrationLabels">
                    Enter your username:
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
