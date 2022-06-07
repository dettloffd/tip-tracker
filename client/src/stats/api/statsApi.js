import axios from "axios";

export const fetchChartDataBetweenDates = async ({ queryKey }) => {
  const [_key, {userId}, { startDate, endDate, statVar, timeVar }] = queryKey;
  console.log(userId);
  try {
    const response = await axios({
      reqMethod: "GET",
      url: `http://localhost:5000/api/stats/user/${userId}/avgBetweenDates/?startDate=${startDate}&endDate=${endDate}&statVar=${statVar}&timeVar=${timeVar}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};
// router.get("/user/:uid/avgBetweenDates", statsControllers.avgVarByTimeBetweenDates);

export const fetchChartDataNoDates = async ({ queryKey }) => {
  const [_key, {userId}, { statVar, timeVar }] = queryKey;
//   console.log(queryKey);
  try {
    const response = await axios({
      reqMethod: "GET",
      url: `http://localhost:5000/api/stats/user/${userId}/avg/?statVar=${statVar}&timeVar=${timeVar}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};
