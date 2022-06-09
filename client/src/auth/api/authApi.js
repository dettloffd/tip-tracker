import axios from "axios";

export const authSubmitHandler = async (userData, isLoginMode) => {
    // const {isLoginMode} = useContext(AuthContext);
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
        //Error handled by hook; nothing further needed to be done here
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
        // auth.login(response.data.user.id);
      } catch (err) {
        //Error handled by hook; nothing further needed to be done here
      }
    }
  };

//   export const authSubmitHandler = async (datas) => {
//     // event.preventDefault();
//     if (isLoginMode) {
//       try {
//         const response = await axios({
//           url: "http://localhost:5000/api/user/login",
//           reqMethod: "POST",
//           data: {
//             email: datas.email,
//             password: datas.password,
//           }
//         });
//         // console.log()
//         // auth.login(response.data.user.id);
//         //only call login if attempt to send request is successful
//         //response user ID send from backend; see users
//       } catch (err) {
//         //Error handled by hook; nothing further needed to be done here
//       }
//     } else {
//       try {
//         const response = await sendRequest({
//           url: "http://localhost:5000/api/user/signup",
//           reqMethod: "POST",
//           data: {
//             name: formState.inputs.name.value,
//             email: formState.inputs.email.value,
//             password: formState.inputs.password.value,
//           },
//         });
//         auth.login(response.data.user.id);
//       } catch (err) {
//         //Error handled by hook; nothing further needed to be done here
//       }
//     }
//   };