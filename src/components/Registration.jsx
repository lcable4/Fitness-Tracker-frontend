import { React, useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../apiAdapter";

function Registration() {
    let[newUser, setNewUser] = useState("");
    let[newUserName, setNewUserName] = useState("");
    let[newUserPass, setNewUserPass] = useState("");
    let[passVerification, setPassVerification] = useState("");
    let[submitMessage, setSubmitMessage] = useState("");
    let[errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const registerUser = async (username, password) => {
        if (password !== passVerification ) {
            setErrorMessage("Passwords do not match.")
            return;
        }
        try {
            const result = await registerUser(username, password);
            console.log(result, "RESULT LOG");
            if(result) {
                setNewUser(result.data.token);
                setSubmitMessage("Successfully registered!");
                setNewUserName("");
                setNewUserPass("");
                setPassVerification("")

                localStorage.setItem(`token-${newUserName}`, result.data.token)
            }
        } catch (error) {
            setErrorMessage("There was an error registering, please try again.");
            console.log(error);
        }
    }
  return (
    <>
    <div className='registrationPage'>
        <h1>Join the Fitness Tracker Community and Reach Your Goals</h1>
        {errorMessage && <div>{errorMessage}</div>}
        <div className='registrationDiv'>
        <form className="registrationForm" onSubmit={(e) => {
            e.preventDefault();
            registerUser(newUserName, newUserPass);
            }}>
                <label className="registrationLabels">Name:</label>
                    <input 
                        type="text" 
                        id="name"
                        value={newUserName}
                        required
                        className="registrationInputs"
                        minLength="4"
                        onChange={(e) => {
                            setNewUserName(e.target.value);
                        }} 
                    />
                <br />
                <label className="registrationLabels">Password:</label>
                    <input 
                        type="password"
                        id="password"
                        value={newUserPass}
                        required
                        minLength="8"
                        onChange={(e) => {
                            setNewUserPass(e.target.value);
                        }} 
                    />
                <br />
                <label className="registrationLabels">Verify Password:</label>
                    <input
                        type="password"
                        id="verifyPassword"
                        value={passVerification}
                        required
                        minLength="8"
                        onChange={(e) => {
                            setPassVerification(e.target.value);
                        }}  />
                <br />
                <button className="submitBtn" type="submit">Submit</button>
                {submitMessage && <p>{submitMessage}</p>}
                <br />
            </form> 
        </div>
        
    </div>
    </>
  )
}

export default Registration