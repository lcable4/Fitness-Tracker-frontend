import { React, useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { fetchRoutines, postRoutine, updateRoutine, fetchUserRoutines } from "../apiAdapter";
function User(props) {

  const [myRoutines, setMyRoutines] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("")
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(props)


  useEffect(() => {
    async function getRoutines() {
      const result = await fetchUserRoutines(currentUser);
      setMyRoutines(result);
    }
  
    getRoutines();
  }, []);
  

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
      if (post) {
        setName("");
        setGoal("");
        setIsPublic(false);
        const result = await fetchUserRoutines(currentUser);
        setMyRoutines(result);
        console.log(myRoutines, "MY ROUTINES LOG SUBMIT")
        setSubmitMessage("Successfully posted routine!");
        navigate("/myRoutines")
      } else {
        setErrorMessage("Error: That routine already exists");
      }
    } catch (error) {
      console.log(error, "ERROR");
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
      
        <h3>These are your Routines</h3>
      <div className="myRoutines">
        <ul className="myRoutinesUL">
          {myRoutines.reverse().slice(0,5).map((routine) => (
            <li key={routine.id} className="myRoutinesList">
               <Link to={`/routine/${parseInt(routine.id)}`} className="myRoutinesLinks">{routine.name}</Link>
              <br />
              <p className="myRoutinesPtags">Routine Goal: 
              <br />
              {routine.goal}</p>
              <br />
              <p className="myRoutinesPtags">Public: {routine.isPublic ? "Yes" : "No"}</p>
              <br />
              {routine.activities.reverse().slice(0, 3).map((activity) => (
                <div className='myRoutinesActivities' key={activity.id}>
                  <label className="myRoutinesActivityLabels">Activity ID: {activity.id}</label>
                  <p className="myRoutinesActPtags">name: {activity.name}</p>
                  <p className="myRoutinesActPtags">description: {activity.description}</p>
                  <p className="myRoutinesActPtags">duration: {activity.duration}</p>
                  <p className="myRoutinesActPtags">count: {activity.count}</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
      {submitMessage && <div>{submitMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
      }

export default User