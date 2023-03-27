import React from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="HomePage">
        <h1>Welcome to Fitness Tracker</h1>
        <img src="/photos/FitnessTracker.png" alt="logo" className="homeLogo" />
        <div className="homeContent">
          <img
            className="homeImg"
            src="/photos/homeImg.jpg"
            alt="weight lifting"
          />
          <div className="homeDescription">
            <h4>
              Join the Fitness Tracker community today for access to free
              workout routines and activities.
            </h4>
            <br />
            <Link to="/registration" className="link">
              Sign up here
            </Link>
          </div>
        </div>
        <div className="homeContent">
          <div className="homeDescription">
            <h4>
              Explore a wide selection of workout routines and activities, and
              customize your own routines!
            </h4>
            <br />
            <Link to="/routines" className="link">
              View routines
            </Link>
          </div>
          <img
            className="homeImg"
            src="/photos/routines.jpg"
            alt="weight lifting"
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
