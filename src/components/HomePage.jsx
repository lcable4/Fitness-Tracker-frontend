import React from 'react'
import { Link, useNavigate } from "react-router-dom";


function HomePage() {
  return (
    <>
    <div className='componentHeaders'>

        <h1>Home</h1>
    </div>
    <div className='HomePage'>
        <p>Join the Fitness Tracker community today for access to free workout routines and activities.</p>
        <Link to="/registration">Sign up here</Link>
        <img
          className="homeImg"
          src="/photos/homeImg.jpg"
          alt="weight lifting"
        />
    </div>
    </>
  )
}

export default HomePage