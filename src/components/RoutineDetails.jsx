import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { fetchRoutines, updateRoutine } from "../apiAdapter"

function RoutineDetails(props) {
    const [routine, setRoutine] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedGoal, setUpdatedGoal] = useState("");
    const { routineId } = useParams();
    const routineIdNumber = parseInt(routineId);
    console.log(routine, "Routine LOG")
    console.log(props, "PROPS LOG")
    console.log(props.currentUser, "PROPS LOG")
    console.log(typeof routineId, "ROUTINEIDLOG")

    useEffect(() => {
      async function fetchRoutineDetails() {
        const allRoutines = await fetchRoutines();
        console.log(allRoutines, "ROUTINES LOG")
        const filteredRoutines = allRoutines.filter(
          (routine) => routine.id === parseInt(routineId)
        );
        console.log(filteredRoutines, "FILTERED LOG")
        if (filteredRoutines.length > 0) {
            setRoutine(filteredRoutines[0]);
            setUpdatedName(filteredRoutines[0].name);
            setUpdatedGoal(filteredRoutines[0].goal);
        }
      }
      fetchRoutineDetails();
    }, [routineIdNumber]);
  

    const handleNameChange = (event) => {
        setUpdatedName(event.target.value);
      };
    
      const handleGoalChange = (event) => {
        setUpdatedGoal(event.target.value);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(typeof routineIdNumber, "routineIdNumber")
        const updatedRoutine = await updateRoutine(routineIdNumber, updatedName, updatedGoal);
        console.log(updatedRoutine);
        setRoutine((prevRoutine) => ({
            ...prevRoutine,
            name: updatedRoutine.name,
            goal: updatedRoutine.goal,
          }));
      };


    if (!routine) {
      return <div>Loading...</div>;
    } else {
        console.log(routine.creatorName, "CREATOR NAME LOG")
    }
    console.log(props.currentUser, "PROPS LOG")
    return (
        <div className="routineDetails">
        {routine.creatorName === props.currentUser ? (
          <form onSubmit={handleSubmit}>
            <h2>Update routine</h2>
            <label>
              Name:
              <input type="text" value={updatedName} onChange={handleNameChange} />
            </label>
            <br />
            <label>
              Goal:
              <input type="text" value={updatedGoal} onChange={handleGoalChange} />
            </label>
            <br />
            <button type="submit">Update routine</button>
          </form>
        ) : (
          <h2>{routine.name}</h2>
        )}
        <p>{routine.goal}</p>
        <ul>
          {routine.activities.map((activity) => (
            <li key={activity.id}>
              <h3>Activity name: {activity.name}</h3>
              <p>Activity description: {activity.description}</p>
              <p>Duration: {activity.duration}</p>
              <p>Count: {activity.count}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  

export default RoutineDetails