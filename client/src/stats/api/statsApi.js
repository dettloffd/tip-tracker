import axios from "axios";

export const fetchChartDataWithDates = async ({ queryKey }) => {
  const [_key, { startDate, endDate, url }] = queryKey;
  // console.log(queryKey);
  try {
    const response = await axios({
      reqMethod: "GET",
      url: `http://localhost:5000/api/stats/${url}?startDate=${startDate}&endDate=${endDate}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};

export const fetchChartDataNoDates = async ({ queryKey }) => {
  const [_key, { url }] = queryKey;
  // console.log(queryKey);
  try {
    const response = await axios({
      reqMethod: "GET",
      url: `http://localhost:5000/api/stats/${url}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};
