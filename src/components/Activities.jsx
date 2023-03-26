import React, { useState, useEffect } from 'react';
import { addActivityToRoutine, displayActivities, postActivity } from "../apiAdapter";
import { Link } from "react-router-dom";


export default function Activities(props) {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [submitMessage, setSubmitMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    async function fetchActivities() {
      const result = await displayActivities();
      setActivities(result);
    }

    fetchActivities();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let post = await postActivity(name, description);
      if(post) {
        setName("");
        setDescription("");
        const result = await displayActivities();
        setActivities(result);
        setSubmitMessage("Succesfully posted activity!")
      } else {
        setErrorMessage("Error: That activity already exists")
      }
      
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later")
    }
  };

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
  }

  return (
    <div className='Activities'>
      <h1>Activities</h1>
      <p>This is a list of all public activities created by our users.</p>
      {props.loggedIn ? (
        <>
          <button onClick={handleToggleForm}>
            {isFormOpen ? "Hide" : "Create an activity"}
          </button>
          {isFormOpen && (
            <form onSubmit={handleSubmit} className="newActivityForm">
              <h3>Create a new activity</h3>
              <label>
                Activity name:
                <input
                  type="text"
                  required
                  value={name} 
                  onChange={handleNameChange} />
              </label>
              <br />
              <label>
                Activity description:
                <br />
                <textarea 
                  value={description} 
                  required
                  onChange={handleDescriptionChange} />
              </label>
              <br />
              <button type="submit" className='submitBtns'>Submit new activity</button>
            </form>
          )}
        </>
      ) : (
        <div>
          <p>
            <Link to="/login">Login </Link>
             to create an activity</p>
        </div>
      )}
      {errorMessage && <div>{errorMessage}</div>}
      {submitMessage && <p>{submitMessage}</p>}
  
      <ul className="activityListDiv">
        {activities.reverse().map(activity => (
          <div className='activity' key={activity.id}>
            <li  className="activityList">
              <p>ID :{activity.id} </p>
              <label className='activityLabels'>Activity Name: </label>
              <br />
              <p className='activityPtags'>{activity.name}</p>
              <br />
              <label className='activityLabels'>Activity Description: </label>
              <br />
              <p className='activityPtags'>{activity.description}</p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}