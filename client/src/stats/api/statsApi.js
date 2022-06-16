import axios from "axios";

export const fetchChartDataBetweenDates = async ({ queryKey }) => {
  const [_key, {userId}, { startDate, endDate, statVar, timeVar }] = queryKey;
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

export const fetchChartDataNoDates = async ({ queryKey }) => {
  const [_key, {userId}, { statVar, timeVar }] = queryKey;
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
