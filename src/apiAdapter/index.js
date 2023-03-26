const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api"


export const fetchRoutines = async () => {
    try {
        const response = await fetch(`${BASE_URL}/Routines`, {
            headers:{
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        console.log(result)
        return result
    } catch (err) {
        console.log(err);
    }
};
export const fetchUserRoutines = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (error) {
    console.log(err);
  }
}
export const registerUser = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const result = await response.json();
      console.log(result, "RESULTS LOG")
      return result;
    } catch (error) {
      console.log(error);
    }
  };


export const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const result = await response.json();
      console.log(result, "RESULTS LOG");
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  export const displayActivities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const postActivity = async (name, description) => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }) 
      });
  
      if (response.status === 500) {
        return false;
      } else {
        const result = await response.json();
        return result;
      }
    } catch (err) {
      console.error(err);
    }
  }

export const addActivityToRoutine = async (routineId, activityId, count, duration) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId: activityId,
          count: count, 
          duration: duration
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const deleteActivityFromRoutine = async (routineActivityId) => {
    try {
      console.log(routineActivityId, "routineActivityId LOG")
      console.log(typeof routineActivityId, "routineActivityId LOG")
      const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const editActivity = async (routineActivityId, count, duration) => {
    try {
      const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          count: 2,
          duration: 30
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
  export const postRoutine = async (name, goal, isPublic) => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: isPublic,
        }) 
      });
  
      if (response.status === 500) {
        return false;
      } else {
        const result = await response.json();
        console.log(result, "RESULT LOG")
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }
  export const updateRoutine = async (routineIdNumber, updatedName, updatedGoal) => {
    console.log(typeof routineIdNumber, "STRANGE")
    console.log(routineIdNumber, "STRANGE")
    try {
      const response = await fetch(`${BASE_URL}/routines/${routineIdNumber}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: updatedName,
          goal: updatedGoal,
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
  export const deleteRoutine = async (routineIdNumber) => {
    try {
      const response = await fetch(`${BASE_URL}/routine/${routineIdNumber}`, {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
}