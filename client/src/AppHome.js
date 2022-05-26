import { Box, Container, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import EntryInputForm from "./entries/components/EntryInputForm";
import EntryLog from "./entries/components/EntryLog";
import HeatMap from "./entries/components/HeatMap";
import StatsDisplay from "./stats/pages/StatsDisplay";
import SideBar from "./UIElements/SideBar";

import DateRangeSelector from "./util/DateRangeSelector";

const AppHome = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  return (
    <Flex flexDir="row" maxWidth={"155rem"}>
      {/* col1 */}
      <Box backgroundColor="#252627" w="10%" pos="relative">
        Something
        <Flex pos="fixed" flexDir={"column"} alignItems="center">
          Scrolly!
          {/* <SideBar></SideBar> */}
        </Flex>
      </Box>

      {/* col2 */}
      <Flex w="35%" p="1.25%" flexDir="column" bg="gray.100">
        <EntryInputForm />

        <Box bg={"white"} m={3} boxShadow="lg" p={4} borderRadius="lg">
          <Flex justifyContent={"space-between"} p={3} mt={3} mb={1} bg="white">
            <Text fontSize={"xl"}>Recent Entries</Text>{" "}
            <Text fontWeight={"bold"} color="teal.500">
              See All
            </Text>
            
          </Flex>
          <Divider mb={5} />
          <EntryLog
            numResults={10}
            dateRange={{ startDate: "", endDate: "" }}
          />
        </Box>
      </Flex>

      {/* col3 */}
      <Flex flexDir="column" minH="100vh" p="1% 2% 1% 1%" w="55%" bg="gray.100">
        <Flex
          p={5}
          justifyContent={"center"}
          alignItems="center"
          bgColor={"white"}
          flexDir="column"
          boxShadow="md"
          borderRadius={"lg"}
        >
          {/* Box holds the heatmap so it can be centered */}
          {/* Change width % based on viewport size for responsiveness  */}
          <Box w="82%" h="20rem">
            <HeatMap numDays={100}></HeatMap>
          </Box>
          <Text p={2} color="gray.500">
            {"( Previous 100 days )"}
          </Text>
        </Flex>

        <DateRangeSelector setDateRange={setDateRange} />
        <StatsDisplay dateRange={dateRange} />
      </Flex>
    </Flex>
  );
};

export default AppHome;
