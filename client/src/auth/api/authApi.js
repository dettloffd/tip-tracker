import axios from "axios";

export const authSubmitHandler = async (authData) => {
  const {userData, isLoginMode} = authData;
    
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
        console.log(response);
        // auth.login(response.data.user.id);
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
      } catch (err) {
        console.log(err);
      }
    }
  };