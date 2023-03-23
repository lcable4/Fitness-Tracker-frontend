import { React, useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { getMyRoutines } from "../apiAdapter";

function User(props) {
  const [myRoutines, setMyRoutines] = useState([]);
  console.log(props, "PROPS LOG")

  useEffect(() => {
    async function fetchRoutines() {
      const result = await getMyRoutines();
      console.log(result, "RESULT LOGS")
      setMyRoutines(result);

    }

    fetchRoutines();
  }, []);
  return (
    <>
    <div className="componentHeaders">
        <h1>These are your Routines</h1>

    </div>
    <div className='myRoutines'>
        <ul>
        {myRoutines.map(activity => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default User