import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar,
        Login,
        Registration,
        HomePage,
        Routines,
        User,
        Activities,
     } from "./";

const Main = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    console.log(loggedIn , "LOGGEDIN LOG MAIN")
    console.log(currentUser, "currentUser MAIN")
    return(
        <>
        <div id="main">
            <BrowserRouter>
                <Navbar loggedIn={loggedIn}/>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <HomePage />
                            }
                        />
                        
                        <Route 
                        path="/registration"
                        element={
                            <Registration
                                setCurrentUser={setCurrentUser}
                                setLoggedIn={setLoggedIn}
                            />
                            }
                        />
                        <Route 
                        path="/login"
                        element={
                            <Login 
                                setCurrentUser={setCurrentUser}
                                setLoggedIn={setLoggedIn}
                            />
                            }
                        />
                        <Route 
                        path="/routines"
                        element={
                            <Routines
                                setCurrentUser={setCurrentUser}
                                setLoggedIn={setLoggedIn}
                            />
                            }
                        />
                        <Route 
                        path="/myRoutines"
                        element={
                            <User
                                setCurrentUser={setCurrentUser}
                                setLoggedIn={setLoggedIn}
                                loggedIn={loggedIn}
                            />
                            }
                        />
                        <Route 
                        path="/activities"
                        element={
                            <Activities
                                setCurrentUser={setCurrentUser}
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                            }
                        />
                    </Routes>
            </BrowserRouter>
        </div>
        </>
    )
}

export default Main