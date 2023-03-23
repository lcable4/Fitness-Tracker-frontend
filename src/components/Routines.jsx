import React, { useState, useEffect } from 'react';
import { fetchRoutines } from "../apiAdapter"


function Routines(props) {
  const [routines, setRoutines] = useState ([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


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
        const result = await displayRoutines();
        setRoutines(result);
        setSubmitMessage("Succesfully posted routine!")
      } else {
        setErrorMessage("That routine already exists")
      }
      
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later")
    }
  };


  return (
    <div className='Routines'>
      <h1>Routines</h1>
      
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
       <button type="submit">Create new routine</button>
     </form>
      ) : (
        <div>
          <p>Login to create a routine</p>
        </div>
        
      )}
      {errorMessage && <div>{errorMessage}</div>}
      {submitMessage && <p>{submitMessage}</p>}
      <ul>
        {routines.reverse().map(routine => (
          <li key={routine.id}>{routine.name}</li>
        ))}
      </ul>
      
    </div>
  );

}

export default Routines;