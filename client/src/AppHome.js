import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import EntryInputForm from "./entries/components/EntryInputForm";
import EntryLog from "./entries/components/EntryLog";
import StatsDisplay from "./stats/pages/StatsDisplay";
import SideBar from "./UIElements/SideBar";

import DateRangeSelector from "./util/DateRangeSelector";

const AppHome = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  return (
    <Flex
      flexDir="row"
      // h={"100vh"}
      // overflow={"hidden"}
      maxWidth={"155rem"}
      // bg="gray.100"
    >
      {/* col1 */}
      <Box backgroundColor="#252627" w="10%" pos="relative">Something
      {/* <Box bg="gray.100" w="10%" pos="relative"> */}

      <Flex
        
        pos="fixed"
        // w="10%"
        flexDir={"column"}
        alignItems="center"
        // border="1px solid red"
      >
        Scrolly!
        
        
        
        {/* <SideBar></SideBar> */}
      </Flex>
      </Box>

      {/* col2 */}
      <Flex
        w="35%"
        p="1.25%"
        flexDir="column"
        // border="1px solid purple"
        // overflow="auto"
        bg="gray.100"
      >
        <EntryInputForm />
        <EntryLog numResults={10} dateRange={{ startDate: "", endDate: "" }} />
      </Flex>

      {/* col3 */}
      <Flex
        flexDir="column"
        // overflow="auto"
        minH="100vh"
        p="1% 2% 1% 1%"
        w="55%"
        // border="1px solid blue"
        bg="gray.100"
      >
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
