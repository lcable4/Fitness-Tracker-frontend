import React, { useState, useEffect } from "react";
import { Link, Outlet, Route, Router } from "react-router-dom";

const Navbar = (props) => {
  const loggedIn = props.loggedIn;
  return (
    <div id="navbar">
      <h2> I am navbar</h2>
      
    </div>
  );
};

export default Navbar;