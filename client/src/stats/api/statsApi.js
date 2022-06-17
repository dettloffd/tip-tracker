import axios from "axios";

function myValidateStatus(status) {
  return status >= 200 && status < 300; // default
}

export const fetchChartDataBetweenDates = async ({ queryKey }) => {
  const [_key, {userId}, { startDate, endDate, statVar, timeVar }] = queryKey;
  console.log(userId);

  try{
    const response = await axios({
      method: "GET",
      url: `http://localhost:5000/api/stats/user/${userId}/avgBetweenDates/?startDate=${startDate}&endDate=${endDate}&statVar=${statVar}&timeVar=${timeVar}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err){
    throw err;
  }
};

export const fetchChartDataNoDates = async ({ queryKey }) => {
  const [_key, {userId}, { statVar, timeVar }] = queryKey;
  console.log(userId);


  try{

    const response = await axios({
      method: "GET",
      url: `http://localhost:5000/api/stats/user/${userId}/avg/?statVar=${statVar}&timeVar=${timeVar}`,
      data: null,
      validateStatus: myValidateStatus,
      headers: {},
    });
    return response;

  } catch (err){
    throw err;

  }
};




// import axios from "axios";

// function myValidateStatus(status) {
//   return status >= 200 && status < 300; // default
// }

// export const fetchChartDataBetweenDates = ({ queryKey }) => {
//   const [_key, {userId}, { startDate, endDate, statVar, timeVar }] = queryKey;

//     const response = axios({
//       reqMethod: "GET",
//       url: `http://localhost:5000/api/stats/user/${userId}/avgBetweenDates/?startDate=${startDate}&endDate=${endDate}&statVar=${statVar}&timeVar=${timeVar}`,
//       data: null,
//       validateStatus: myValidateStatus,
//       headers: {},
//     });
//     return response;

// };

// export const fetchChartDataNoDates =  ({ queryKey }) => {
//   const [_key, {userId}, { statVar, timeVar }] = queryKey;

//     const response = axios({
//       reqMethod: "GET",
//       url: `http://localhost:5000/api/stats/user/${userId}/avg/?statVar=${statVar}&timeVar=${timeVar}`,
//       data: null,
//       validateStatus: myValidateStatus,
//       headers: {},
//     });
//     return response;

// };