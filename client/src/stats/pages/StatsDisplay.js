import React, { useState } from "react";

import { Box, Divider, Flex } from "@chakra-ui/react";

import ChartConstructor from "../components/ChartConstructor";
import { chartFieldsArray } from "../chartFieldsArray";

const StatsEntries = () => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });


  return (
    <>
      <Flex
      direction={"column"}
      border={"1px solid red"}
      width="40vw"
      // min-width="50vw"
      >
        <Box>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />

          <button
            onClick={() => {
              setDateRange({ startDate: startDate, endDate: endDate });
            }}
          >
            setDateRange
          </button>
          {/* </Grid><Grid item xs={11} md={8} lg={4}> */}


            {chartFieldsArray.map((chart) => (
              <Box width={"100%"}>
                <ChartConstructor
                  key={chart.chartTitle}
                  {...chart}
                  dateRange={dateRange}
                />
              </Box>
            ))}

          <Divider></Divider>
        </Box>
      </Flex>
      
    </>
  );
};

export default StatsEntries;
