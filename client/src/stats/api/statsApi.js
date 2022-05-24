import axios from "axios";

export const fetchChartDataBetweenDates = async ({ queryKey }) => {
  const [_key, { startDate, endDate, statVar, timeVar }] = queryKey;
//   console.log(queryKey);
  try {
    const response = await axios({
      reqMethod: "GET",
      url: `http://localhost:5000/api/stats/avgBetweenDates/?startDate=${startDate}&endDate=${endDate}&statVar=${statVar}&timeVar=${timeVar}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};

export const fetchChartDataNoDates = async ({ queryKey }) => {
  const [_key, { statVar, timeVar }] = queryKey;
//   console.log(queryKey);
  try {
    const response = await axios({
      reqMethod: "GET",
      url: `http://localhost:5000/api/stats/avg/?statVar=${statVar}&timeVar=${timeVar}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};
