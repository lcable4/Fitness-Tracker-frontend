import React, { useState, useEffect } from "react";
import { Link, Outlet, Route, Router } from "react-router-dom";

const Navbar = (props) => {
  const loggedIn = props.loggedIn;
  function onLogoutClick() {
    console.log("been clicked");
    localStorage.removeItem("token");
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
      <Link to="/" className="navBtns">
        HOME
      </Link>
      
      <Link to="/routines" className="navBtns">
        All Routines
      </Link>

      <Link to="/myRoutines" className="navBtns">
        My Routines
      </Link>
      
      <Link to="/activities" className="navBtns">
        Activities
      </Link>

      {loggedIn ? (
        <button className="navBtns" onClick={onLogoutClick}>
          Logout
        </button>
      ) : (
        <div>
          <Link className="navBtns" to="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;