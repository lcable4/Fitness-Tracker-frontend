import { React, useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchRoutines,
  postRoutine,
  updateRoutine,
  fetchUserRoutines,
} from "../apiAdapter";
function User(props) {
  const [myRoutines, setMyRoutines] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    async function getRoutines() {
      if (!currentUser) {
        setErrorMessage("Please log in to view this page.");
        return;
      }
      try {
        const result = await fetchUserRoutines(currentUser);
        setMyRoutines(result);
      } catch (error) {
        setErrorMessage("Error fetching routines.");
      }
    }

    getRoutines();
  }, [currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleIsPublicChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
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
        setSubmitMessage("Successfully posted routine!");
        navigate("/myRoutines");
      } else {
        setErrorMessage("Error: That routine already exists");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later");
    }
  };

  return (
    <>
      <h3 className="myRoutinesHeader">These are your Routines</h3>
      <p className="myRoutinesPtags">
        Click on a routine to view it's details or update it
      </p>
      {props.loggedIn ? (
        <>
          <div className="btnsDiv">
            <button onClick={handleToggleForm} className="submitBtns">
              {isFormOpen ? "Hide" : "Create a routine"}
            </button>
          </div>
          {isFormOpen && (
            <form onSubmit={handleSubmit} className="newRoutineForm">
              <h3>Create a new routine</h3>
              <label>
                Routine name:
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                />
              </label>
              <br />
              <label>
                Routine goal:
                <input
                  type="text"
                  required
                  value={goal}
                  onChange={handleGoalChange}
                />
              </label>
              <br />
              <label>
                Make routine public:
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={handleIsPublicChange}
                />
              </label>
              <br />
              <button type="submit" className="submitBtns">
                Submit new routine
              </button>
            </form>
          )}
        </>
      ) : (
        <div className="ternaryMSG">
          <p>Login to create a routine</p>
        </div>
      )}
      <div className="myRoutines">
        <ul className="myRoutinesUL">
          {myRoutines
            .reverse()
            .slice(0, 5)
            .map((routine) => (
              <li key={routine.id} className="myRoutinesList">
                <Link
                  to={`/routine/${parseInt(routine.id)}`}
                  className="myRoutinesLinks"
                >
                  {routine.name}
                </Link>
                <br />
                <p className="myRoutinesPtags">
                  Routine Goal:
                  <br />
                  {routine.goal}
                </p>
                <br />
                <p className="myRoutinesPtags">
                  Public: {routine.isPublic ? "Yes" : "No"}
                </p>
                <br />
                {routine.activities
                  .reverse()
                  .slice(0, 3)
                  .map((activity) => (
                    <div className="myRoutinesActivities" key={activity.id}>
                      <label className="myRoutinesActivityLabels">
                        Activity ID: {activity.id}
                      </label>
                      <p className="myRoutinesActPtags">
                        name: {activity.name}
                      </p>
                      <p className="myRoutinesActPtags">
                        description: {activity.description}
                      </p>
                      <p className="myRoutinesActPtags">
                        duration: {activity.duration}
                      </p>
                      <p className="myRoutinesActPtags">
                        count: {activity.count}
                      </p>
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

export default User;
