import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Navbar,
  Login,
  Registration,
  HomePage,
  Routines,
  User,
  Activities,
  RoutineDetails,
  ActivityDetails,
} from "./";
import { displayActivities } from "../apiAdapter";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState("");

  useEffect(() => {
    async function fetchActivities() {
      const result = await displayActivities();
      setActivities(result);
    }

    fetchActivities();
  }, []);
  return (
    <>
      <div id="main">
        <BrowserRouter>
          <Navbar loggedIn={loggedIn} />
          <Routes>
            <Route path="/" element={<HomePage />} />

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
              path="/routine/:routineId"
              element={
                <RoutineDetails
                  currentUser={currentUser}
                  setLoggedIn={setLoggedIn}
                  loggedIn={loggedIn}
                  activities={activities}
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
                  activities={activities}
                />
              }
            />
            <Route
              path="/activityDetails/:activityId"
              element={<ActivityDetails activities={activities} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default Main;
