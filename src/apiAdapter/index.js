const BASE_URL = "https://fitnesstracker-65db.onrender.com/api"


export const fetchRoutines = async () => {
    try {
        const response = await fetch(`${BASE_URL}/routines`, {
            headers:{
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        return result
    } catch (err) {
        console.error(err);
    }
};

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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
