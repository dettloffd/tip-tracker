import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import EntryInputForm from "./entries/components/EntryInputForm";
import EntryLog from "./entries/components/EntryLog";
import HeatMap from "./entries/components/HeatMap";
import EntryPage from "./entries/pages/EntryPage";
import StatsDisplay from "./stats/pages/StatsDisplay";
import NavBar from "./UIElements/NavBar";

import DateRangeSelector from "./util/DateRangeSelector";

const AppHome = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  return (
    <Flex flexDir={["column", "column", "row"]} maxWidth={"155rem"} minH="100vh">
      {/* col1 */}
      <Flex
        backgroundColor="#252627"
        w={["100%", "100%", "10%", "10%", "10%"]}
        pos="relative"
        justifyContent={"center"}
        
        className="navbar-container"
      >
        <Flex
          pos={[null, null, "fixed", "fixed", "fixed"]}
          flexDir={"column"}
          alignItems="center"
          className="sticky-navbar-component"
          w={["100%", "100%", "10%", "10%", "10%"]}
        >
          Scrolly!
          <NavBar></NavBar>
        </Flex>
      </Flex>

      {/* <EntryPage numResults={30} dateRange={dateRange} setDateRange={setDateRange} /> */}

      {/* col2 */}

      <Flex w={"35%"} p="1.25%" flexDir="column" bg="gray.100" mt={"5rem"}>
        <EntryInputForm />

        {/* This box contains the recent entries and header/link for seeing all entries  */}
        <Box bg={"white"} m={3} boxShadow="lg" p={4} borderRadius="lg">
          <Flex justifyContent={"space-between"} p={3} mt={3} mb={1} bg="white">
            <Text fontSize={"xl"}>Recent Entries</Text>{" "}
            <Text fontWeight={"bold"} color="teal.500">
              See All
            </Text>
          </Flex>
          <Divider mb={5} />
          {/* Daterange as empty strings ensures all entries are fetched */}
          <EntryLog
            numResults={10}
            dateRange={{ startDate: "", endDate: "" }}
          />
        </Box>
      </Flex>

      {/* col3 */}
      <Flex
        flexDir="column"
        minH="100vh"
        p="1% 2% 1% 1%"
        w="55%"
        bg="gray.100"
        mt={"5rem"}
      >
        <Flex
          p={5}
          justifyContent={"center"}
          alignItems="center"
          bgColor={"white"}
          flexDir="column"
          boxShadow="md"
          borderRadius={"lg"}
        >
          {/* Change width % based on viewport size for responsiveness  */}
          {/* Box holds the heatmap so it can be centered */}
          <HeatMap mapwidth="82%" mapheight="20rem" numDays={100}></HeatMap>
        </Flex>

        {/* Container for header and datepicker  */}
        <Flex
          bg="white"
          boxShadow="lg"
          borderRadius={"lg"}
          direction={"column"}
          alignItems="center"
          m={2}
        >
          <DateRangeSelector
            setDateRange={setDateRange}
            dateRange={dateRange}
          />
        </Flex>

        <StatsDisplay dateRange={dateRange} />
      </Flex>
    </Flex>
  );
};

export default AppHome;
