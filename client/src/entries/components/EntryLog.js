import React from "react";
import EntryItem from "./EntryItem";
import { List } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getAllEntries, getEntriesByUserId } from "../api/entriesApi";
import MoonLoader from "react-spinners/MoonLoader";

const EntryLog = ({numResults}) => {
  let userId = "5f0aa38f2a9f992d74ff4533";
  console.log(numResults);
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

  const { data, error, isLoading, isError } = useQuery(
    "userEntries",
    getAllEntries
  );
  //////////////for testing; gets every entry in database

  if (isLoading) {
    return <MoonLoader color={"#4FD1C5"} loading={true} />
    ;
  }

  if (isError) {
    return <p>errorrrrrr</p>;
  }

  if (data) {
    let testEntries = data.data.entries.slice(0, numResults);

    return (
      <>
        <List
          width={"100%"}
          //   maxW=" 500px"
          //   maxW="36rem"
        >
          {testEntries.map((entry) => (
            <>
              <EntryItem
                {...entry}
                /////THIS ALLOWS FOR just this instead of below... basically just passing the whole entry object in
                // date={entry.date}
                // numDelivs={entry.numDelivs}
                // tipsTotal={entry.tipsTotal}
              />
            </>
          ))}
        </List>
      </>
    );
  }
};
// return (
//     <>
//       <List
//       width={"100%"}
//     //   maxW=" 500px"
//     //   maxW="36rem"
//       >
//         {props.entries.map((entry) => (
//           <>
//             <EntryItem
//               {...entry}
//               /////THIS ALLOWS FOR just this instead of below... basically just passing the whole entry object in
//               // date={entry.date}
//               // numDelivs={entry.numDelivs}
//               // tipsTotal={entry.tipsTotal}
//             />
//           </>
//         ))}
//       </List>
//     </>
//   );

// if (props.entries.length === 0) {
//   {
//     return <p>work work</p>;
//   }
// }
// else{
//     return <p>something something</p>
// }

export default EntryLog;
