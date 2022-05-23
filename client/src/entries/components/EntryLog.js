import React from "react";
import EntryItem from "./EntryItem";
import { Flex, List, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getAllEntries, getAllEntriesBetweenDates } from "../api/entriesApi";
import MoonLoader from "react-spinners/MoonLoader";

const EntryLog = ({ numResults, dateRange }) => {
  const { startDate, endDate } = dateRange;
  let userId = "5f0aa38f2a9f992d74ff4533";
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

  const dateRangeProvided = dateRange.startDate !== "";
  let theQueryKey;
  let theQueryFn;

  if (dateRangeProvided) {
    theQueryKey = ["userEntriesBetweenDates", { startDate, endDate }];
    theQueryFn = getAllEntriesBetweenDates;
  } else {
    theQueryKey = "userEntries";
    theQueryFn = getAllEntries;
  }

  const { data, error, isLoading, isError } = useQuery(theQueryKey, theQueryFn);

  if (isLoading) {
    return (
      <Flex width="100%" justify={"center"} p={6}>
        <MoonLoader size={200} color={"#4FD1C5"} loading={true} />
      </Flex>
    );
  }

  if (isError) {
    return <p>errorrrrrr</p>;
  }

  if (data) {
    let entriesToDisplay = data.data.entries.slice(0, numResults);

    return (
      <>
      
        {entriesToDisplay.length > 0 ? (
          <List
            width={"100%"}
            //   maxW=" 500px"
            //   maxW="36rem"
          >
            {entriesToDisplay.map((entry) => (
              <>
                <EntryItem {...entry} />
              </>
            ))}
          </List>
        ) : (
          <Text fontSize='2xl' textAlign={"center"}>No entries for time period provided</Text>
        )}
      </>
    );
  }
};

export default EntryLog;
