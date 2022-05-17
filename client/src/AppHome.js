import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import EntryInputForm from "./entries/components/EntryInputForm";
import EntryLog from "./entries/components/EntryLog";
import StatsDisplay from "./stats/pages/StatsDisplay";
// import EntryInputForm from "./entries/components/EntryInputForm";
// import UserEntries from "./entries/pages/UserEntries";

const AppHome = () => {
  return (
    <Flex
      bg="gray.100"
      align="center"
      justify="center"
      direction="column"
      border={"1px solid black"}
    >
      <h1>App Homeeeee</h1>
      <EntryInputForm />
      <Flex justify="center" maxW={"80rem"}>
        <Flex width={"40vw"}>
          <EntryLog />
        </Flex>
        <Flex direction={"column"} width="40vw">
          <StatsDisplay />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppHome;
