import React, { useState, useEffect } from 'react';
// import { deletePost };
// import { Link };
// import { }

const RoutineView = ({routine, routines, setRoutines}) => {
  const handleDelete = (id) => {
      deletePost(id, {setRoutines, routines})
      setRoutines(routines.filter(routine => routine._id !== id));
}
  return (
      <>
      <div id="routine-view">
          <h1 id="name">{routine.name}</h1>
          <h3 id="description">{routine.description}</h3>
          <h3 id="duration">Duration: {routine.duration}</h3>
          <h3 id="count">Count: {routine.count}</h3>
          {routine.isAuthor ? (
              <div>
                  <button onClick={() => handleDelete(routine._id)}>Delete</button>
                  <Link to="/EditRoutine"><button>Edit Routine</button></Link> 
              </div>
              ):  checkUserLoggedIn() ? (
                  <Link to="/MessagePosts" state={{ id: routine._id }}>
                  <button type="button"></button>
                  </Link>) :
                  <div></div>
              }
      </div>
      </>
  )
}

export default RoutineList