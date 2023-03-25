import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  addActivityToRoutine, 
  updateRoutine, 
  deleteRoutine, 
  fetchUserRoutines, 
  deleteActivityFromRoutine } from "../apiAdapter"

function RoutineDetails(props) {
    
    const [routines, setRoutines] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedGoal, setUpdatedGoal] = useState("");
    const [activityId, setActivityId] = useState('');
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [submitMessage, setSubmitMessage] = useState('');
    
    const { routineId } = useParams();
    const routineIdNumber = parseInt(routineId);
    const navigate = useNavigate();
    
    console.log(routines, "Routine LOG")
    console.log(props, "PROPS LOG")
    console.log(props.currentUser, "PROPS LOG")
    console.log(typeof routineId, "ROUTINEIDLOG")

    useEffect(() => {
      async function fetchRoutineDetails() {
        const allRoutines = await fetchUserRoutines(props.currentUser);
        console.log(allRoutines, "ROUTINES LOG")
        const filteredRoutines = allRoutines.filter(
          (routine) => routine.id === parseInt(routineId)
        );
        console.log(filteredRoutines, "FILTERED LOG")
        if (filteredRoutines.length > 0) {
          setRoutines(filteredRoutines[0]);
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

      const handleDelete = async () => {
        const shouldDelete = window.confirm('Are you sure you want to delete this routine?');
        if (shouldDelete) {
          const deletedRoutine = await deleteRoutine(routineIdNumber);
          console.log(deletedRoutine);
          navigate('/myRoutines');
        }
      };
      
      
      const handleDeleteActivity = async (routineActivityId) => {
        try {
          console.log(routineActivityId, "ACTIVITY ID LOG")
          console.log(typeof routineActivityId, "ACTIVITY ID LOG")
          const result = await deleteActivityFromRoutine(routineActivityId);
          console.log(result)
          if(result){
            setSubmitMessage("Activity removed from routine")
          }
        } catch (error) {
          console.log(error)
          setErrorMessage("There was an error removing this activity")
        }
      }

      const handleAddActivity = async (event) => {
        try {
          event.preventDefault();
          const result = await addActivityToRoutine(routineIdNumber, activityId, count, duration);
          console.log(result)
          setActivityId("");
          setCount("");
          setDuration("");
          setSubmitMessage("Activity was added to this routine!")
        } catch (error) {
          setErrorMessage("There was an error adding this activity.")
          console.log(error)
        }
      } 

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
      return <div>requires user to be logged to view</div>;
    } 
    console.log(props.currentUser, "PROPS LOG")
    return (
      <>
        <h2>Update routine</h2>
        <div className="routineDetailsDiv">
        {routines.creatorName === props.currentUser ? (
            <>
          <form onSubmit={handleSubmit} className="routineDetailsForm">
            <label className="routineDetailsLabels">
              Edit Name:
              <input type="text" value={updatedName} onChange={handleNameChange} />
            </label>
            <br />
            <label className="routineDetailsLabels">
              Edit Goal:
              <input type="text" value={updatedGoal} onChange={handleGoalChange} />
            </label>
            <br />
            <button type="submit">Update routine</button>
          </form>
          <button onClick={handleDelete}>Delete routine</button>
          <br />
           <form onSubmit={handleAddActivity} className="routineDetailsForm">
            <label className="routineDetailsLabels"/>
              Activity ID:
              <select value={activityId} onChange={(e) => setActivityId(e.target.value)}>
      {props.activities.map((activity) => (
        <option key={activity.id} value={activity.id}>
          {activity.name}
        </option>
      ))}
    </select>
            <label className="routineDetailsLabels">
              Count:
              <input type="number"
              placeholder='Enter new count'
              value={count} 
              onChange={(e) => setCount(e.target.value)} />
            </label>
            <label className="routineDetailsLabels">
              Duration:
              <input type="number" 
              placeholder='Enter new duration'
              value={duration} 
              onChange={(e) => setDuration(e.target.value)} />
            </label>
            <button type="submit">Add Activity</button>
        </form>
        {errorMessage && <div>{errorMessage}</div>}
        {submitMessage && <p>{submitMessage}</p>}
           </>
        ) : (
          <h2>{routines.name}</h2>
        )}
        <ul>
          {routines.activities.reverse().slice(0, 5).map((activity) => (
            <li key={activity.id} className="routineDetailsList">
              <h3>Activity name: {activity.name}</h3>
              <p>Activity description: {activity.description}</p>
              <p>Duration: {activity.duration}</p>
              <p>Count: {activity.count}</p>
              <button onClick={() => handleDeleteActivity(activity.routineActivityId)}>Delete</button>
            </li>
            
          ))}
        </ul>

      </div>
        <Link to="/myRoutines" className='backBtns'>Go back</Link>
      </>
    );
  }
  

export default RoutineDetails