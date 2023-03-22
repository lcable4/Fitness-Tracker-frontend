const BASE_URL = "https://fitnesstracker-65db.onrender.com/api"
export const getRoutines = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}/routines`, {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error(error);
    }
}