const IP = import.meta.env.VITE_API_URL;

export const getUserData = async (token) => {
    try {
        const response = await fetch(`${IP}/get-user-data`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data) {
                return data.data;
            } else {
                return "Error: No user data found";
            }
        } else {
            return "Error";
        }
    } catch (error) {
        console.error(error);
    }
};

export default IP;
