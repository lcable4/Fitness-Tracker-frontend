import React, { useState, useEffect } from 'react';
import { fetchRoutines, postRoutine } from "../apiAdapter";
import { displayActivities, postActivity } from "../apiAdapter";

export default function Routines(props) {
  const [routines, setRoutines] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [activities, setActivities] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    async function getRoutines() {
      const result = await fetchRoutines();
      // console.log(result);
      setRoutines(result);
    }

    getRoutines();
  }, []);

  useEffect(() => {
    async function getActivities() {
      const result = await displayActivities();
      setActivities(result);
    }

    getActivities();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleActivitiesChange = (event) => {
    setActivities(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let post = await postRoutine(name, goal, activities);
      if (post) {
        setName("");
        setGoal("");
        setActivities("");
        const result = await fetchRoutines();
        setRoutines(result);
        setSubmitMessage("Successfully posted routine!");
      } else {
        setErrorMessage("Error: That routine already exists");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later");
    }
  };

  return (
    <div className='Routines'>
      <h1>Routines</h1>
  
      {props.loggedIn ? (
        <>
          <form onSubmit={handleSubmit} className="newRoutineForm">
            <h3>Create a new routine</h3>
            <label>
              Routine name:
              <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <br />
            <label>
              Routine goal:
              <br />
              <textarea value={goal} onChange={handleGoalChange} />
            </label>
            <br />
            <label>
              Routine Activities:
              <br />
              <textarea value={activities} onChange={handleActivitiesChange} />
            </label>
            <button type="submit">Submit new routine</button>
          </form>
        </>
      ) : (
        <div>
          <p>Log in to create a routine</p>
        </div>
      )}
      {errorMessage && <div>{errorMessage}</div>}
      {submitMessage && <p>{submitMessage}</p>}
  
      <ul className="routineListDiv">
        {routines.reverse().map(routine => (
          <div className='routine' key={routine.id}>
            <li className="routineList">
              <label className='routineLabels'>Routine Name: </label>
              <br />
              <p className='routinePtags'>{routine.name}</p>
              <br />
              <label className='routineLabels'>Routine goal: </label>
              <br />
              <p className='routinePtags'>{routine.goal}</p>
              <br />
              {routine.activities.length > 0 && (
              <>
              <label className='routineLabels'>Routine Activities</label>
              <br />
              {routine.activities.reverse().map(activity => (
              <div className='routineActivities' key={activity.id}>
              <label className="activityLabels">{activity.label}</label>
              <p>{activity.name}</p>
              <p>{activity.description}</p>
              <p>{activity.duraction}</p>
              </div>
              ))}
              </>
            )}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
        }