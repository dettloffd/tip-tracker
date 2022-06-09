import axios from "axios";

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

// "/between/:startDate/:endDate" 

export const getAllEntriesBetweenDates = async ({queryKey}) => {
  const [_key, {startDate, endDate}] = queryKey;

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

export const getAllEntriesByUserId = async ({queryKey}) => {
  // console.log(queryKey);
  // console.log({userId});
  const [_key, {userId}] = queryKey;
  
  try {
    const response = await axios({
      reqMethod: "GET",
      //url: `http://localhost:5000/api/entries/user/5f0aa38f2a9f992d74ff4533`,
      url: `http://localhost:5000/api/entries/user/${userId}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};
// router.get("between/user/:uid", entriesControllers.getEntriesByUserIdBetweenDates);

export const getAllEntriesByUserIdBetweenDates = async ({queryKey}) => {
  // console.log(queryKey);
  // console.log({userId});
  console.log(queryKey);
  const [_key, {userId}, {startDate, endDate}] = queryKey;
  console.log(userId);
  
  try {
    const response = await axios({
      reqMethod: "GET",
      //url: `http://localhost:5000/api/entries/user/5f0aa38f2a9f992d74ff4533`,
      url: `http://localhost:5000/api/entries/user/${userId}/between/?startDate=${startDate}&endDate=${endDate}`,
      data: null,
      headers: {},
    });
    return response;
  } catch (err) {}
};

// export const getEntriesByUserId = async (userId) => {
//   console.log(userId.queryKey[1].userId);
//   try {
//     const response = await axios({
//       reqMethod: "GET",
//       //url: `http://localhost:5000/api/entries/user/5f0aa38f2a9f992d74ff4533`,
//       url: `http://localhost:5000/api/entries/user/${userId}`,
//       data: null,
//       headers: {},
//     });

//     return response;
//   } catch (err) {}
// };

// export const getEntriesByUserId = async ({queryKey}) => {
//   //console.log(queryKey);
//   const [_key, {userId}] = queryKey;
//   try {
//     const response = await axios({
//       reqMethod: "GET",
//       //url: `http://localhost:5000/api/entries/user/5f0aa38f2a9f992d74ff4533`,
//       url: `http://localhost:5000/api/entries/user/${userId}`,
//       data: null,
//       headers: {},
//     });
//     return response;
//   } catch (err) {}
// };

export const addEntry = async (newEntry) => {
  try {
    const response = await axios({
      url: "http://localhost:5000/api/entries",
      method: "POST",
      data: newEntry,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const editEntry = async (editedEntry) => {
  //console.log(editedEntry._id);
  try {
    const response = await axios({
      method: "PATCH",
      url: `http://localhost:5000/api/entries/${editedEntry._id}`,
      //url: `http://localhost:5000/api/entries/${editedEntry._id}`,
      //url: `http://localhost:5000/api/entries/123`,
      data: editedEntry,
      headers: {},
    });
    console.log(response);
  } catch (err) {}
};

export const deleteEntry = async (deletedEntry) => {
  try {
    const response = await axios({
      url: `http://localhost:5000/api/entries/${deletedEntry}`,
      method: "DELETE",
      data: null,
    });
    console.log(response);
  } catch (err) {}
};

// const handleDelete = async () => {
//   try {
//     const response = await sendRequest({
//       url: `http://localhost:5000/api/entries/${_id}`,
//       reqMethod: "DELETE",
//       headers: { Authorization: "Bearer " + auth.token },
//     });

//     // const response = await sendRequest(
//     //   `http://localhost:5000/api/entries/${_id}`,
//     //   "DELETE",
//     //   null,
//     //   {Authorization: 'Bearer ' + auth.token}

//     // );

//     dispatch({ type: "DELETE_ENTRY", _id: _id });
//     toggleDeleting();
//   } catch (err) {
//     console.log(errorMessage);
//   }
// };

// const onSubmit = (values) => {
//   const newEntry = {
//     tipsTotal: values.tipsTotal,
//     date: values.date,
//     numTransactions: values.numTransactions,
//     creator: 1337,
//     //_id: uuid(),
//   };

//   const addEntry = async () => {
//     try {
//       const response = await axios({
//         url: "http://localhost:5000/api/entries",
//         method: "POST",
//         data: newEntry,
//       });
//       console.log(response);
//     } catch (err) {
//     }
//   };
//   addEntry();
// };
