import React, {useState, useEffect} from 'react'
import { editActivity, fetchUserRoutines } from '../apiAdapter'


function UpdateForm(props) {
  const [count, setCount] = useState('');
  const [duration, setDuration] = useState('');
  const [routines, setRoutines] = useState('');
  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [submitMessage, setSubmitMessage] = useState("")
  const [filteredResult, setFilteredResult] = useState('')
  console.log(props)
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  console.log(filteredResult, "FILTERED RESULT LOG")
  console.log(routines, "ROUTINES LOG")

  const handleEditActivity = async (routineActivityId, count, duration) => {
    
    editActivity(routineActivityId, count, duration)
    .then((data) => {
      console.log("Activity updated successfully:", data);
      setCount("");
      setDuration("");
      setSubmitMessage("Activity has been edited!")
    })
    .catch((error) => {
      console.error("Error editing activity:", error);
    });
  }

  return (
    <form onSubmit={handleEditActivity} className="routineDetailsForm"> 
        Activity :
        <select value={activityId} onChange={(e) => setActivityId(e.target.value)}>
      {props.routines.activities.reverse().map((activity) => (
        <option key={activity.id} value={activity.id}>
          {activity.name}
        </option>
      ))}
    </select>
  <label>
    Duration:
    <input
      type="number"
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
    />
  </label>
  <label>
    Count:
    <input
      type="number"
      value={count}
      onChange={(e) => setCount(e.target.value)}
    />
  </label>
  <button type="submit" onClick={()=> handleEditActivity(activityId)}>Update Activity</button>
</form>
  )
}

export default UpdateForm