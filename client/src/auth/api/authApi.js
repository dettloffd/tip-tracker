import axios from "axios";

export const authSubmitHandler = async (authData) => {
  const {userData, isLoginMode, authLogin} = authData;
    
    if (isLoginMode) {
      try {
        const response = await axios({
          url: "http://localhost:5000/api/user/login",
          method: "POST",
          data: {
            email: userData.email,
            password: userData.password,
          }
        });
        // authData.log
        console.log(response.data.existingUser._id, response.data.token);
        authLogin(response.data.existingUser._id, response.data.token);
        //only call login if attempt to send request is successful
        //response user ID send from backend; see users
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axios({
          url: "http://localhost:5000/api/user/signup",
          method: "POST",
          data: {
            username: userData.username,
            email: userData.email,
            password: userData.password
          },
        });
        console.log(response);
        authLogin(response.data.createdUser._id, response.data.token);
      } catch (err) {
        console.log(err);
      }
    }
  };