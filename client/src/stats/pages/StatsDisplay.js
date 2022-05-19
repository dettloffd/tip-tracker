import React, { useState } from "react";

import { Box, Divider, Flex } from "@chakra-ui/react";

import ChartConstructor from "../components/ChartConstructor";
import { chartFieldsArray } from "../chartFieldsArray";

const StatsEntries = ({dateRange}) => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });


  return (
    <>

        <Box>
          {/* <input
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
          /> */}

          {/* <button
            onClick={() => {
              setDateRange({ startDate: startDate, endDate: endDate });
            }}
          >
            setDateRange
          </button> */}

            {chartFieldsArray.map((chart) => (
              <Box flexBasis={"100%"}>
                <ChartConstructor
                  key={chart.chartTitle}
                  {...chart}
                  dateRange={dateRange}
                />
              </Box>
            ))}

          <Divider></Divider>
        </Box>
      
    </>
  );
};

export default StatsEntries;
