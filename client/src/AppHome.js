import { Box, Container, Flex } from "@chakra-ui/react";
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
    <Flex
      flexDir="row"
      maxWidth={"155rem"}
    >
      {/* col1 */}
      <Box backgroundColor="#252627" w="10%" pos="relative">
        Something
        <Flex
          pos="fixed"
          // w="10%"
          flexDir={"column"}
          alignItems="center"
        >
          Scrolly!
          {/* <SideBar></SideBar> */}
        </Flex>
      </Box>

      {/* col2 */}
      <Flex w="35%" p="1.25%" flexDir="column" bg="gray.100">
        <EntryInputForm />
        <EntryLog numResults={10} dateRange={{ startDate: "", endDate: "" }} />
      </Flex>

      {/* col3 */}
      <Flex flexDir="column" minH="100vh" p="1% 2% 1% 1%" w="55%" bg="gray.100">
        {/* <Container h="auto" w="auto"><HeatMap></HeatMap></Container> */}
        <Flex
          p={5}
          w="100%"
          minH="50vh"
          justifyContent={"center"}
          alignItems="center"
          bgColor={"white"}
          flexDir="column"
        >
          <HeatMap numDays={100}></HeatMap>
        </Flex>

        <DateRangeSelector setDateRange={setDateRange} />
        <StatsDisplay dateRange={dateRange} />
      </Flex>
    </Flex>
    // <Flex width="100%" bg="gray.100" height={"100%"} >
    // <SideBar/>

    // <Flex
    //   // bg="gray.100"
    //   align="center"
    //   justify="center"
    //   direction="column"
    //   // border={"1px solid black"}
    //   width="100%"
    // >

    //   {/* <DateRangePicker></DateRangePicker> */}

    //   {/* <Flex width={"50%"}>
    //   <EntryLog numResults={20}/>
    //   </Flex> */}

    //   <h1>App Homeeeee</h1>
    //   <Flex justify="center" maxW={"80rem"}>
    //     <Flex p={4} m={4} width={"30vw"}>
    //     <EntryInputForm />
    //     </Flex>
    //     {/* <Flex direction={"column"} width="40vw">
    //       <h1>placeholder</h1>
    //     </Flex> */}
    //   </Flex>

    //   <Box p={6}><DateRangeSelector setDateRange={setDateRange} /></Box>
    //   <Flex justify="center" maxW={"80rem"}>
    //     <Flex direction={"column"} width={"40vw"}>
    //       <EntryLog numResults={10} dateRange={{startDate: "", endDate: ""}} />
    //     </Flex>
    //     <Flex direction={"column"} width="50vw">
    //       <StatsDisplay dateRange={dateRange} />
    //     </Flex>
    //   </Flex>
    // </Flex>
    // </Flex>
  );
};

export default AppHome;
