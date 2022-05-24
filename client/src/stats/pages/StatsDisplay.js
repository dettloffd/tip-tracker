import React, { useState } from "react";

import { Box, Divider, Flex } from "@chakra-ui/react";

import ChartConstructor from "../components/ChartConstructor";
import { chartFieldsArray } from "../chartFieldsArray";

const StatsEntries = ({ dateRange }) => {
  return (
    <>
    {/* This is the container for the column of charts - child of this item is the container of the chart */}
      <Flex direction={"column"} align={"center"}>
        {chartFieldsArray.map((chart) => (
          // <Box flexBasis={"90%"}>
            <ChartConstructor
              key={chart.chartTitle}
              {...chart}
              dateRange={dateRange}
            />
          // </Box>
        ))}

        {/* <Divider /> */}
      </Flex>
    </>
  );
};

export default StatsEntries;
