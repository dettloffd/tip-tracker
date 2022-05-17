import {
  Box,
  Flex,

} from "@chakra-ui/react";import React from "react";
import EntryInputForm from "./entries/components/EntryInputForm";
import UserEntries from "./entries/pages/UserEntries";
import StatsDisplay from './stats/pages/StatsDisplay';
// import EntryInputForm from "./entries/components/EntryInputForm";
// import UserEntries from "./entries/pages/UserEntries";

// import { Grid } from "@material-ui/core";

const AppHome = () => {
  return (
    <Flex bg="gray.100" align="center" justify="center" direction="column" border={"1px solid black"}>

          <h1 >App Homeeeee</h1>
          <EntryInputForm></EntryInputForm>
          <Flex border="1px solid goldenrod" justify="center" maxW={"80rem"}>
          <UserEntries></UserEntries>
          <StatsDisplay></StatsDisplay>
          
          </Flex>
    </Flex>
  );
};

export default AppHome;
