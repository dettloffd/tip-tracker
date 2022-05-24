import React, { useState } from "react";

import { Box, Divider, Flex } from "@chakra-ui/react";

import ChartConstructor from "../components/ChartConstructor";
import { chartFieldsArray } from "../chartFieldsArray";

const StatsEntries = ({ dateRange }) => {
  return (
    <>
      <Box>
        {chartFieldsArray.map((chart) => (
          <Box flexBasis={"100%"}>
            <ChartConstructor
              key={chart.chartTitle}
              {...chart}
              dateRange={dateRange}
            />
          </Box>
        ))}

        <Divider />
      </Box>
    </>
  );
};

export default StatsEntries;
