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
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  console.log(selectedDateRange);
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
      
      <EntryInputForm />
      <Box p={6}><DateRangeSelector setSelectedDateRange={setSelectedDateRange} /></Box>
      <Flex justify="center" maxW={"80rem"}>
        <Flex width={"35vw"}>
          <EntryLog numResults={8} />
        </Flex>
        <Flex direction={"column"} width="45vw">
          <StatsDisplay />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppHome;
