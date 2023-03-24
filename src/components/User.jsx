import { React, useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { fetchRoutines, postRoutine } from "../apiAdapter";
function User(props) {
  const [allRoutines, setAllRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser)


  useEffect(() => {
    async function fetchAllRoutines() {
      const result = await fetchRoutines();
      setAllRoutines(result);
    }
  
    fetchAllRoutines();
  }, []);
  
  useEffect(() => {
    const filteredRoutines = allRoutines.filter(
      (routine) => routine.creatorName === currentUser
    );
    console.log(allRoutines)
    console.log(filteredRoutines, "Filtered LOG");
    setMyRoutines(filteredRoutines);
  }, [allRoutines, currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleIsPublicChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let post = await postRoutine(name, goal, isPublic);
      if(post) {
        setName("");
        setGoal("");
        setIsPublic(false);
        const result = await fetchRoutines();
        setMyRoutines(result);
        setErrorMessage("Succesfully posted routine!");
      } else {
        setErrorMessage("Error: That routine already exists");
      }
    } catch (error) {
      console.log(error, "ERROR")
      setErrorMessage("An error occurred. Please try again later");
    }
  };

  return (
    <>
      {props.loggedIn ? (
        <form onSubmit={handleSubmit} className="newRoutineForm">
          <h3>Create a new routine</h3>
          <label>
            Routine name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Routine goal:
            <input type="text" value={goal} onChange={handleGoalChange} />
          </label>
          <br />
          <label>
            Make routine public:
            <input type="checkbox" checked={isPublic} onChange={handleIsPublicChange} />
          </label>
          <br />
          <button type="submit">Submit new routine</button>
        </form>
      ) : (
        <div>
          <p>Login to create a routine</p>
        </div>
      )}
      <div className="myRoutines">
        <h3>These are your Routines</h3>
        <ul>
          {myRoutines.reverse().map((routine) => (
            <li key={routine.id}>
              {routine.name}
              <br />
              {routine.goal}
              <br />
              {routine.activities.slice(0, 3).map((activity) => (
                <div className='myRoutinesActivities' key={activity.id}>
                  <label className="myRoutinesActivityLabels">Activities</label>
                  <p>{activity.name}</p>
                  <p>{activity.description}</p>
                  <p>{activity.duration}</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
      }

export default User