import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";

import { Box, Divider, Flex, Icon, Text, useStyles } from "@chakra-ui/react";

import useChartConstructorHook from "../../hooks/useChartConstructorHook";
import useHighLowStatsHook from "../../hooks/useHighLowStatsHook";

import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";
import { fetchChartDataBetweenDates, fetchChartDataNoDates } from "../api/statsApi";

// {dateRange, yKey, xKey, chartType, chartTitle   }
const ChartConstructor = ({   dateRange , yKey, xKey, chartType, chartTitle   }) => {
  const [chartData, setChartData] = useState({ categories: [], yValues: [] });
  const [highAndLowValues, setHighAndLowValues] = useState({
    topValue: {
      x: "",
      y: "",
    },
    bottomValue: {
      x: "",
      y: "",
    },
  });

  console.log(dateRange);

  // necessary import in order for noData module to work correctly
  NoDataToDisplay(Highcharts);

  let startDate = dateRange.startDate;
  let endDate = dateRange.endDate;
  // let url = props.url;

  const dateRangeProvided = dateRange.startDate !== "";
  let theQueryKey;
  let theQueryFn;
  let statVar = yKey;
  let timeVar = xKey;


  if (dateRangeProvided) {
    theQueryKey = [`fetchChartDataBetweenDates_${xKey}_${yKey}`, { startDate, endDate, statVar, timeVar }];
    theQueryFn = fetchChartDataBetweenDates;
  } else {
    theQueryKey = [`fetchChartDataNoDates_${xKey}_${yKey}`, {statVar, timeVar}];
    theQueryFn = fetchChartDataNoDates;
  }


  const { data, error, isLoading, isError } = useQuery(theQueryKey, theQueryFn);

  useEffect(() => {
    if (data) {
      // console.log(data);
      // if no data returned from database call..
      if (data.data.count == 0) {
        // set x and y axis to empty arrays
        // this will inform highcharts that there is no data triggering a noData message
        let chartData = { xAxis: [], yAxis: [] };
        setChartData({
          categories: chartData.xAxis,
          yValues: chartData.yAxis,
        });
        setHighAndLowValues({
          topValue: { x: null, y: null },
          bottomValue: { x: null, y: null },
        });
      } else {
        console.log(data);
        let values = extractHighAndLowValues(data);
        let chartData = constructAxis(data);
        // console.log(values);
        setChartData({
          categories: chartData.xAxis,
          yValues: chartData.yAxis,
        });
        //Much more succint but less explicit version of above..
        // setChartData({
        //   categories: constructAxis(chartResponse).xAxis,
        //   yValues: constructAxis(chartResponse).yAxis,
        // });

        setHighAndLowValues({
          topValue: { x: values.topValue.x, y: values.topValue.y },
          bottomValue: { x: values.bottomValue.x, y: values.bottomValue.y },
        });
      }      

    }
  }, [data]);
  const { constructAxis } = useChartConstructorHook(xKey, yKey);

  const { extractHighAndLowValues } = useHighLowStatsHook(
    xKey,
    yKey
  );

  const options = {
    chart: {
      type: `${chartType}`,
      //height: (9 / 16 * 100) + '%',
      //16:9 ratio
      //height: "500px",
    },
    title: {
      text: `${chartTitle}`,
    },
    subtitle: {
      // If no start / end date provided, don't show anything..
      // otherwise, formata and show the date range in the subtitle
      text:
        dateRange.startDate == ""
          ? "Date Range: All Time"
          : "Date Range: " +
            format(parseISO(dateRange.startDate), "yyyy/MM/dd") +
            " - " +
            format(parseISO(dateRange.endDate), "yyyy/MM/dd"),
          
    },
    xAxis: { categories: chartData.categories },
    plotOptions: {
      series: {
        color: "#38B2AC",
      },
    },

    yAxis: {
      // In order to keep the bar graph more readable
      // Take the lowest of all the y values and divide in half
      min:
        `${chartType}` === "bar"
          ? Math.min(...chartData.yValues) / 2
          : Math.min(...chartData.yValues),
    },
    series: [
      {
        name: `${chartTitle}`,
        data: chartData.yValues,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: "center",
              verticalAlign: "bottom",
              layout: "horizontal",
            },
          },
        },
      ],
    },
    lang: {
      noData: "No data exists for this time period",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "1rem",
        color: "#303030",
      },
    },
  };
  return (
    <>
      <Flex
        boxShadow="md"
        bg="white"
        p={1}
        m={1}
        //   w={"lg"}
        borderRadius="lg"
        direction={"column"}
      >
        <Box>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          ></HighchartsReact>
        </Box>
        <Divider></Divider>

        <Flex
          p={1}
          alignSelf={"center"}
          width={"100%"}
          maxW={"30rem"}
          justify={"space-between"}
        >
          <Flex align={"center"}>
            <Icon as={MdOutlineTrendingUp} w={6} h={6} color="teal.500" m={2} />
            <Text>Highest</Text> {" ~ "}
            <Text>
              {highAndLowValues.topValue.x}: {highAndLowValues.topValue.y}
            </Text>
          </Flex>

          <Flex align={"center"}>
            <Icon
              as={MdOutlineTrendingDown}
              w={6}
              h={6}
              color="teal.500"
              m={2}
            />
            <Text>Lowest~</Text>
            {highAndLowValues.bottomValue.x}: {highAndLowValues.bottomValue.y}
          </Flex>
        </Flex>

        {/* <Flex
          p={1}
          alignSelf={"center"}
          width={"100%"}
          maxW={"25rem"}
          justify={"space-between"}
        >
          <Flex align={"center"}>
            <Icon
              as={MdOutlineTrendingUp}
              w={6}
              h={6}
              color="green.300"
              m={2}
            />
            <Text>High value</Text>
          </Flex>
          <Flex align={"center"}>
            {highAndLowValues.topValue.x} : {highAndLowValues.topValue.y}
          </Flex>
        </Flex>

        <Divider /> */}

        {/* <Flex
          p={1}
          alignSelf={"center"}
          width={"100%"}
          maxW={"25rem"}
          justify={"space-between"}
        >
          <Flex align={"center"}>
            <Icon
              as={MdOutlineTrendingDown}
              w={6}
              h={6}
              color="red.300"
              m={2}
            />
            <Text>Low value</Text>
          </Flex>
          <Flex align={"center"}>
            {highAndLowValues.bottomValue.x} : {highAndLowValues.bottomValue.y}
          </Flex>
        </Flex> */}
      </Flex>
    </>
  );
};

export default ChartConstructor;
