const BASE_URL = "https://fitnesstracker-65db.onrender.com/api"


export const getRoutines = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}/routines`, {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
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
