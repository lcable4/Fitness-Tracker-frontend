import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, Route, Router } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = (props) => {
  const loggedIn = props.loggedIn;
  const [isBarsClicked, setIsBarsClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onLogoutClick() {
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
      <button
        className="navBars"
        onClick={() => {
          setIsBarsClicked(!isBarsClicked);
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <FaBars />
      </button>
      <div className="navLinksDiv">
        <img src="/photos/FitnessTracker.png" alt="logo" />
        <Link to="/" className="navLinks">
          Fitness Tracker
        </Link>
      </div>
      {isBarsClicked && (
        <div
          className="menuContainer"
          style={{ display: isMenuOpen ? "block" : "none" }}
          onMouseLeave={() => setIsMenuOpen(true)}
        >
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
