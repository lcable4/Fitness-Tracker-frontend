import React, { useState, useEffect } from "react";
import { Link, Outlet, Route, Router } from "react-router-dom";

const Navbar = (props) => {
  const loggedIn = props.loggedIn;
  function onLogoutClick() {
    console.log("been clicked");
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.reload(false);
  }

  function ifUserLogged() {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  return (
    <div id="navbar">
      <div className="navLinksDiv">
        <Link to="/" className="navLinks">
          Fitness Tracker
        </Link>
      </div>
      <div className="navLinksDiv">
        <Link to="/routines" className="navLinks">
          All Routines
        </Link>
      </div>
      <div className="navLinksDiv">
        <Link to="/myRoutines" className="navLinks">
          My Routines
        </Link>
      </div>
      <div className="navLinksDiv">
        <Link to="/activities" className="navLinks">
          Activities
        </Link>
      </div>
      {loggedIn ? (
        <button className="navLinks" onClick={onLogoutClick}>
          Logout
        </button>
      ) : (
        <>
        <div className="navLinksDiv">
          <Link className="navLinks" to="/login">
            Login
          </Link>
        </div>
        <div className="navLinksDiv">
          <Link className="navLinks" to="/registration">
            Register
          </Link>
        </div>
        </>
      )}
    </div>
  );
};

export default Navbar;