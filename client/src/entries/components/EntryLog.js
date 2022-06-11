import React, { useContext } from "react";
import EntryItem from "./EntryItem";
import {  AuthContext } from "../../auth/AuthContext";
import { Container, Flex, List, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getAllEntries, getAllEntriesBetweenDates, getAllEntriesByUserId, getAllEntriesByUserIdBetweenDates } from "../api/entriesApi";
import MoonLoader from "react-spinners/MoonLoader";

const EntryLog = ({ numResults, dateRange }) => {
  const { startDate, endDate } = dateRange;
  const { userId } = useContext(AuthContext);
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

  // if (dateRangeProvided) {
  //   theQueryKey = ["userEntriesBetweenDates", { startDate, endDate }];
  //   theQueryFn = getAllEntriesBetweenDates;
  // } else {
  //   theQueryKey = "userEntries";
  //   theQueryFn = getAllEntries;
  // }

    if (dateRangeProvided) {
    theQueryKey = ["getAllEntriesByUserIdBetweenDates", {userId}, { startDate, endDate }];
    theQueryFn = getAllEntriesByUserIdBetweenDates;
  } else {
    theQueryKey = ["getAllEntriesByUserId", {userId}];
    theQueryFn = getAllEntriesByUserId;
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
    return <Text>Error has occurred</Text>;
  }

  if (data.data.entries) {
    
    let entriesToDisplay = data.data.entries.slice(0, numResults);

    return (
      <>
      
        {entriesToDisplay.length > 0 ? (
          <Flex justifyContent={"center"}>
          <List
            flexBasis={"100%"}
            //   maxW=" 500px"
            //   maxW="36rem"
          >
            {entriesToDisplay.map((entry) => (
              <>
                <EntryItem {...entry} />
              </>
            ))}
          </List>
          </Flex>
        ) : (
          <Text fontSize='2xl' textAlign={"center"}>No entries for time period provided</Text>
        )}
      </>
    );
  } else {
    return (
      <Text textAlign={"center"}>No entries exist for this time period</Text>
    )
  }
};

export default EntryLog;
