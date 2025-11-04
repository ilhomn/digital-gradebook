const IP = "http://192.168.0.107:3000";

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

      if (data.data && data.data.length > 0) {
        return data.data[0];
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
