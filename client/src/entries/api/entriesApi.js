import axios from "axios";

function myValidateStatus(status) {
  return status >= 200 && status < 300; // default
}

// validateStatus - essential axios option to ensure react query throws an error AND
// we get the proper response object containing error codes/information back from server
// without it, react query would handle the error but we wouldn't get the object containing
// the error code and error message that was set up on the server 

export const getAllEntries = async () => {
  try {
    const response = await axios({
      reqMethod: "GET",
      url: `http://localhost:5000/api/entries`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};

export const getAllEntriesBetweenDates = async ({ queryKey }) => {
  const [_key, { startDate, endDate }] = queryKey;

  try {
    const response = await axios({
      reqMethod: "GET",
      url: `http://localhost:5000/api/entries/between/?startDate=${startDate}&endDate=${endDate}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};

export const getAllEntriesByUserId = async ({ queryKey }) => {
  const [_key, { userId }] = queryKey;

  try {
    const response = await axios({
      reqMethod: "GET",
      url: `http://localhost:5000/api/entries/user/${userId}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};

export const getAllEntriesByUserIdBetweenDates = async ({ queryKey }) => {
  const [_key, { userId }, { startDate, endDate }] = queryKey;
  try {
    const response = await axios({
      reqMethod: "GET",
      url: `http://localhost:5000/api/entries/user/${userId}/between/?startDate=${startDate}&endDate=${endDate}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};

export const addEntry = (newEntryData) => {
  const {newEntry, token} = newEntryData;
  const response = axios({
    url: "http://localhost:5000/api/entries",
    method: "POST",
    data: newEntry,
    validateStatus: myValidateStatus,
    headers: { Authorization: "Bearer " + token },
  });
  return response;
};

export const editEntry = (editData) => {
  const {editedEntry, token} = editData;
  const response = axios({
    method: "PATCH",
    url: `http://localhost:5000/api/entries/${editedEntry._id}`,
    data: editedEntry,
    validateStatus: myValidateStatus,

    headers: { Authorization: "Bearer " + token },
  });
  return response;
};

export const deleteEntry = (deletionData) => {
  const {_id, token} = deletionData;
  const response = axios({
    url: `http://localhost:5000/api/entries/${_id}`,
    method: "DELETE",
    data: null,
    validateStatus: myValidateStatus,
    headers: { Authorization: "Bearer " + token },
  });
  return response;
};