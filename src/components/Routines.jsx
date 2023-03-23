import React, { useState, useEffect } from 'react';
import { fetchRoutines, postRoutine } from "../apiAdapter";


export default function Activities(props) {

  const [activities, setRoutines] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [submitMessage, setSubmitMessage] = useState("");
  
  useEffect(() => {
    async function getRoutines() {
      const result = await fetchRoutines();
      setRoutines(result);

    }

    getRoutines();
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
      let post = await postRoutine(name, description);
      if(post) {
        setName("");
        setDescription("");
        const result = await fetchRoutines();
        setRoutines(result);
        setSubmitMessage("Succesfully posted routine!")
      } else {
        setErrorMessage("Error: That routine already exists")
      }
      
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later")
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
            Routine description:
            <br />
            <textarea value={description} onChange={handleDescriptionChange} />
          </label>
          <br />
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
        {activities.reverse().map(routine => (
          <div className='routine' key={routine.id}>
            <li  className="routineList">
              <label className='routineLabels'>Routine Name: </label>
              <br />
              <p className='routinePtags'>{routine.name}</p>
              <br />
              <label className='routineLabels'>Routine Description: </label>
              <br />
              <p className='routinePtags'>{routine.description}</p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
        }