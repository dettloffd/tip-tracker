import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllEntries, getEntriesByUserId } from "../api/entriesApi";
import { Box, Flex, Text } from "@chakra-ui/react";
import EntryItem from "../components/EntryItem";
import EntryLog from "../components/EntryLog";
import HeatMap from "../components/HeatMap";
import DateRangeSelector from "../../util/DateRangeSelector";

const EntryPage = ({ numResults }) => {
  let userId = "5f0aa38f2a9f992d74ff4533";
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  // const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  /////testing purposes
  // const { data, error, isLoading, isError } = useQuery(
  //   ["userEntries", {userId}],
  //   (userId) => getEntriesByUserId(userId)
  // );
  ///////alternate syntax

  // const { data, error, isLoading, isError } = useQuery(
  //   ["userEntries", {userId}],
  //   getEntriesByUserId
  // );
  //////https://www.sitepoint.com/react-query-fetch-manage-data/


  //////////////for testing; gets every entry in database


    // let testEntries = data.data.entries.slice(0, 10);
    // console.log(testEntries);

    return (
      <>
      {/* Container for the remaining page aside from the sidebar */}
      <Flex w="100%" justifyContent={"center"} bg="white">
        {/* Container of all content */}
        <Flex
          w="80%"
          justifyContent={"center"}
          flexDir="column"
          alignItems={"center"}
          bg="white"
          mt={"3rem"}
        >
          <HeatMap numDays={365} mapwidth="100%" mapheight="15rem" />
          {/* Container for entries  */}
          <Box
            w="80%"
            bg={"white"}
            m={3}
            boxShadow="lg"
            p={4}
            borderRadius="lg"
          >
              
              <Flex justifyContent={"center"} p={5}><DateRangeSelector setDateRange={setDateRange} placeholderMessage={"Select Date Range to Filter"} /></Flex>
              {/* dateRange prop is initially set to empty strings; only if selected on daterangepicker will it rerender */}
            <EntryLog numResults={numResults} dateRange={dateRange} />
          </Box>
        </Flex>
        </Flex>
      </>
    );
  
};

export default EntryPage;

// {status && <p>holdddd onnnn</p>}
// {!isLoading && loadedEntries && (
//   <div>
//     {/* <h3>{status}</h3> */}
//     {/* <button onClick={updateEditedState}>pressdatboi</button> */}
//     <EntryLog

//       entries={loadedEntries}
//       // onDeleteEntry={entryDeleteHandler}
//       // onEditEntryRefresh={editRequest}
//     ></EntryLog>
//   </div>
// )}

// const editRequest = (editedEntry) => {
//   //mutate(editedEntry);

//   const editEntry = async () => {
//     try {
//       const response = await axios({
//         method: "PATCH",
//         url: `http://localhost:5000/api/entries/${editedEntry._id}`,
//         //url: `http://localhost:5000/api/entries/123`,
//         data: editedEntry,
//         headers: {},
//       });
//       console.log(response);
//       // if (response.data.success == true) {
//       //   const newLoadedEntries = loadedEntries.map((entry) => {
//       //     if (entry._id === editedEntry._id) {
//       //       const updatedEntry = editedEntry;
//       //       return updatedEntry;
//       //     }
//       //     return entry;
//       //   });
//       //   setLoadedEntries(newLoadedEntries);
//       // }
//     } catch (err) {
//       //console.log(errorMessage);
//     }

//   };
//   editEntry();
// };

// return (

//   <>

//      {entriesQuery.status.success && loadedEntries && (

//       <div>
//         <EntryLog
//           entries={entriesQuery.data.data.entries}
//         ></EntryLog>
//       </div>
//     )}
//   </>
// );
// };

// return (

//   <>

//      {entriesQuery.status.success && (

//       <div>
//         <EntryLog
//           entries={entriesQuery.data.data.entries}
//         ></EntryLog>
//       </div>
//     )}
//   </>
// );
// };
