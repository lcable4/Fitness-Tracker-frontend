import React from "react";


const RoutinePosts = ({routine, routines, setRoutines}) => {
    const handleDelete = (id) => {
        deletePost(id, {setRoutines, routines})
        setRoutines(routines.filter(routine => routine._id !== id));
}
    return (
        <>
        <div id="post-view">
            <h1 id="name">{routine.name}</h1>
            <h3 id="goal">{routine.description}</h3>
            <h3 id="activity">{routine.activity}</h3>
            <h3 id="creator">Created by: {routine.creatorName}</h3>
        </div>
        </>
    )
}


export default RoutinePosts