import React, {useState, useEffect} from "react";
import {fetchRoutines} from "../apiAdapter";
import RoutinePosts from "./RoutinePosts";


const Main = ({routines, setroutines}) => {

    
    async function retrieveroutines () {
        const myroutines = await fetchRoutines()
        setroutines (myroutines.data.routines)
        console.log("myroutines", myroutines)

    }
    useEffect(() => {
        retrieveroutines()
    }, [])


    return(
        <div id="main">
            <h1>Test</h1>
            <RoutinePosts routine={routine} routines={routines}/>
        </div>
    );
}

export default Main