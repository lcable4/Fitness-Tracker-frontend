import React from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { editActivity } from "../apiAdapter";


const ActivityDetails = (props) => {
    console.log(props, "propsLOG")
    const { activityId } = useParams();
    const activity = props.activities.find((idx) => idx.id === parseInt(activityId));

    if (!activity) {
        return <div>Activity not found</div>;
    }

    return (
        <>
        <div>
            <h2>{activity.name}</h2>
            <p>{activity.id}</p>
            <p>{activity.description}</p>
        </div>
        <Link to="/myRoutines">Go back</Link>
        </>
    );
}


export default ActivityDetails