import React, {useState, useEffect} from 'react'
import { addActivityToRoutine, displayActivities } from '../apiAdapter'


function AddForm(props) {

    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [activities, setActivities] = useState([]);
    const [activityId, setActivityId] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [submitMessage, setSubmitMessage] = useState("")

    useEffect(() => {
        async function fetchActivities() {
          const result = await displayActivities();
          setActivities(result);
    
        }fetchActivities();
        }, []);

    const handleAddActivity = async (event) => {
        try {
          event.preventDefault();
          const result = await addActivityToRoutine(props.routineIdNumber, activityId, count, duration);
          console.log(result)
          setCount("");
          setDuration("");
          setSubmitMessage("Activity was added to this routine!")
        } catch (error) {
          setErrorMessage("There was an error adding this activity.")
          console.log(error)
        }
      } 
  return (
    <div className='addActivityDiv'>
    <form onSubmit={handleAddActivity} className="routineDetailsForm">
              Activity :
              <select value={activityId} onChange={(e) => setActivityId(e.target.value)}>
      {activities.map((activity) => (
        <option key={activity.id} value={activity.id}>
          {activity.name}
        </option>
      ))}
    </select>
            <label className="routineDetailsLabels">
              Duration:
              <input type="number" 
              placeholder='Enter new duration'
              value={duration} 
              onChange={(e) => setDuration(e.target.value)} />
            </label>
            <label className="routineDetailsLabels">
              Count:
              <input type="number"
              placeholder='Enter new count'
              value={count} 
              onChange={(e) => setCount(e.target.value)} />
            </label>
            <button type="submit" className='submitBtns'>Add Activity</button>
        </form>
      </div>
  )
}

export default AddForm