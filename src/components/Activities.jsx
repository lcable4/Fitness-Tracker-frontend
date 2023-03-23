import React, { useState, useEffect } from 'react';
import { displayActivities, postActivity } from "../apiAdapter";


export default function Activities(props) {

  const [activities, setActivities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [submitMessage, setSubmitMessage] = useState("");
  
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
        setErrorMessage("That activity already exists")
      }
      
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later")
    }
  };

  return (
    <div className='Activities'>
      <h1>Activities</h1>
      
      {props.loggedIn ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Description:
            <textarea value={description} onChange={handleDescriptionChange} />
          </label>
          <br />
          <button type="submit">Create new activity</button>
        </form>
      ) : (
        <div>
          <p>Login to create an activity</p>
        </div>
      )}
      {errorMessage && <div>{errorMessage}</div>}
      {submitMessage && <p>{submitMessage}</p>}
  
      <ul className="activityListDiv">
        {activities.reverse().map(activity => (
          <div className='activity'>
            <li key={activity.id} className="activityList">
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