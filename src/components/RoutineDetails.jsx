import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRoutines, updateRoutine, deleteRoutine, fetchUserRoutines } from "../apiAdapter"

function RoutineDetails(props) {
    const [routines, setRoutines] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedGoal, setUpdatedGoal] = useState("");
    const { routineId } = useParams();
    const routineIdNumber = parseInt(routineId);
    const navigate = useNavigate();
    console.log(routines, "Routine LOG")
    console.log(props, "PROPS LOG")
    console.log(props.currentUser, "PROPS LOG")
    console.log(typeof routineId, "ROUTINEIDLOG")

    useEffect(() => {
      async function fetchRoutineDetails() {
        const allRoutines = await fetchUserRoutines();
        console.log(allRoutines, "ROUTINES LOG")
        // const filteredRoutines = allRoutines.filter(
        //   (routine) => routine.id === parseInt(routineId)
        // );
        // console.log(filteredRoutines, "FILTERED LOG")
        if (allRoutines) {
            setRoutines(allRoutines);
            setUpdatedName(allRoutines.name);
            setUpdatedGoal(allRoutines.goal);
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

      const handleDelete = async () => {
        const shouldDelete = window.confirm('Are you sure you want to delete this routine?');
        if (shouldDelete) {
          const deletedRoutine = await deleteRoutine(routineIdNumber);
          console.log(deletedRoutine);
          navigate('/myRoutines');
        }
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(typeof routineIdNumber, "routineIdNumber")
        const updatedRoutine = await updateRoutine(routineIdNumber, updatedName, updatedGoal);
        console.log(updatedRoutine);
        setRoutines((prevRoutine) => ({
            ...prevRoutine,
            name: updatedRoutine.name,
            goal: updatedRoutine.goal,
          }));
      };


    if (!routines) {
      return <div>Loading...</div>;
    } else {
        console.log(routines.creatorName, "CREATOR NAME LOG")
    }
    console.log(props.currentUser, "PROPS LOG")
    return (
        <div className="routineDetails">
        {routines.creatorName === props.currentUser ? (
            <>
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
           <button onClick={handleDelete}>Delete routine</button>
           </>
        ) : (
          <h2>{routines.name}</h2>
        )}
        <p>{routines.goal}</p>
        <ul>
          {routines.activities.map((activity) => (
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