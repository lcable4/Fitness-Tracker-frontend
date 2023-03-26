import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, Route, Router } from "react-router-dom";
import { FaBars } from "react-icons/fa"


const Navbar = (props) => {
  
  const loggedIn = props.loggedIn;
  const [isBarsClicked, setIsBarsClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   console.log(isBarsClicked, "BARS LOG")
   console.log(isMenuOpen, "MENU LOG")

  
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
        <button onClick={() => {
          setIsBarsClicked(!isBarsClicked);
          setIsMenuOpen(!isMenuOpen)}
        }>
          <FaBars/>
        </button>
        <Link to="/" className="navLinks">
          Fitness Tracker
        </Link>
      </div>
      {isBarsClicked &&  (
        <div className="menuContainer"
        style={{ display: isMenuOpen ? "block" : "none" }}
        onClick={() => setIsMenuOpen(true)}>
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
        </div>
      )}
      {loggedIn ? (
        <button className="logoutBtn" onClick={onLogoutClick}>
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