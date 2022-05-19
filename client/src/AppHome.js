import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import EntryInputForm from "./entries/components/EntryInputForm";
import EntryLog from "./entries/components/EntryLog";
import EntryPage from "./entries/pages/EntryPage";
import StatsDisplay from "./stats/pages/StatsDisplay";
// import EntryInputForm from "./entries/components/EntryInputForm";
// import UserEntries from "./entries/pages/UserEntries";


// import { DateRangePicker } from 'react-date-range';
import DateRangeSelector from "./util/DateRangeSelector";

const AppHome = () => {
  const [dateRange, setDateRange] = useState({startDate: "", endDate: ""});

  return (
    <Flex
      bg="gray.100"
      align="center"
      justify="center"
      direction="column"
      border={"1px solid black"}
    >




      


      {/* <DateRangePicker></DateRangePicker> */}

      {/* <Flex width={"50%"}>
      <EntryLog numResults={20}/>
      </Flex> */}

      <h1>App Homeeeee</h1>
      <Flex justify="center" maxW={"80rem"}>
        <Flex p={4} m={4} width={"35vw"}>
        <EntryInputForm />
        </Flex>
        <Flex direction={"column"} width="45vw">
          <h1>placeholder</h1>
        </Flex>
      </Flex>
      
      <Box p={6}><DateRangeSelector setDateRange={setDateRange} /></Box>
      <Flex justify="center" maxW={"80rem"}>
        <Flex width={"35vw"}>
          <EntryLog numResults={8} />
        </Flex>
        <Flex direction={"column"} width="45vw">
          <StatsDisplay dateRange={dateRange} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppHome;
