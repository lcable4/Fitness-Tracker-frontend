import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { editActivity } from "../apiAdapter";

const ActivityDetails = (props) => {
  const { activityId } = useParams();
  const activity = props.activities.find(
    (idx) => idx.id === parseInt(activityId)
  );

  if (!activity) {
    return <div>Activity not found</div>;
  }

  return (
    <>
      <div className="activityDetailsContainer">
        <div className="activityDetails">
          <h2>Activity name: {activity.name}</h2>
          <p>ID: {activity.id}</p>
          <p>Description: {activity.description}</p>
        </div>
        <div className="btnsDiv">
          <Link to="/myRoutines" className="backBtns">
            Go back
          </Link>
        </div>
      </div>
    </>
  );
};

export default ActivityDetails;
