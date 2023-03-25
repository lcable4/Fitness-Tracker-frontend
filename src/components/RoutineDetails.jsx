import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  
  updateRoutine, 
  deleteRoutine, 
  fetchUserRoutines, 
  deleteActivityFromRoutine,
   } from "../apiAdapter"
  import { AddForm, UpdateForm } from './'

function RoutineDetails(props) {
    
    const [routines, setRoutines] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedGoal, setUpdatedGoal] = useState("");
    const [filteredResult, setFilteredResult] = useState('')
    const [activityId, setActivityId] = useState('');
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
        setFilteredResult(filteredRoutines)
        if (filteredRoutines.length > 0) {
          setRoutines(filteredRoutines[0]);
          setUpdatedName(filteredRoutines[0].name);
          setUpdatedGoal(filteredRoutines[0].goal);
        }
      }
      fetchRoutineDetails();
    }, [routineId]);
  

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
            <p>Edit routine {routines.name}</p>
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
            <button type="submit" className='submitBtns'>Update routine</button>
          </form>
          <button onClick={handleDelete} className='submitBtns'>Delete routine</button>
          <br />
            <label className="routineDetailsLabels">Add an activity to this routine</label>
        <AddForm activityId={activityId} routineIdNumber={routineIdNumber}/>
        <UpdateForm routines={routines}/>
        {errorMessage && <div>{errorMessage}</div>}
        {submitMessage && <p>{submitMessage}</p>}
           </>
        ) : (
          <h2>{routines.name}</h2>
        )}
        <ul>
          {routines.activities.reverse().slice(0, 5).map((activity) => (
            <li key={activity.id} className="routineDetailsList">
              <Link to={`/activitydetails/${parseInt(activity.id)}`} className="myRoutinesLinks">{activity.name}</Link>
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