import { Box, Flex, Text } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";
import { BasicTooltip } from "@nivo/tooltip";

import { ResponsiveTimeRange } from "@nivo/calendar";
import { getAllEntriesBetweenDates } from "../api/entriesApi";

export default function HeatMap({ numDays, mapwidth, mapheight }) {
  const today = new Date();

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  //   startDate -> shiftDate function gives date numDays before today, it's parsed as ISO, then formatted.
  let startDate = format(
    parseISO(shiftDate(today, -numDays).toISOString()),
    "yyyy-MM-dd"
  );
  let endDate = format(parseISO(today.toISOString()), "yyyy-MM-dd");

  const { data, error, isLoading, isError } = useQuery(
    ["heatMapDates", { startDate: startDate, endDate: endDate }],
    getAllEntriesBetweenDates
  );

  const entryTooltip = ({ day, tipsTotal, numTransactions }) => {
    return (
      <Box fontWeight={"bold"} opacity={".9"} color="teal.500" bgColor="gray.900" p={5}>
        <Text>Date: {day}</Text>
        <Text>Total tips: {tipsTotal}</Text>
        <Text>Number of transactions: {numTransactions}</Text>
        <Text>Average Tip: {(tipsTotal / numTransactions).toFixed(2)}</Text>
      </Box>
    );
  };

  let heatmapValues = [];
  if (data) {
    let returnEntries = data.data.entries;
    // Timerange is expecting "Day" and "value" fields
    returnEntries.forEach((entry) =>
      heatmapValues.push({
        day: entry.date,
        value: 1,
        tipsTotal: entry.tipsTotal,
        numTransactions: entry.numTransactions,
      })
    );
  }

  return (
    <>
      {/* Change width % based on viewport size for responsiveness  */}
      {/* Box holds the heatmap so it can be centered - added inside component to allow for adding numdays text easer */}
      <Box w={mapwidth} h={mapheight}>
        {" "}
        <ResponsiveTimeRange
          data={heatmapValues}
          // height={350}
          // width={900}
          from={startDate}
          to={endDate}
          emptyColor="#eeeeee"
          // colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
          colors={["#319795", "#319795", "#319795", "#319795"]}
          margin={{ top: 20, right: 20, bottom: 0, left: 20 }}
          // margin={{ top: 60, right: 10, bottom: 0, left: 10 }}
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          weekdayLegendOffset={60}
          dayRadius={3}
          tooltip={entryTooltip}
        />
      </Box>
      <Text textAlign={"center"} color="gray.500">
        {`( Previous ${numDays} days )`}
      </Text>
    </>
  );
}