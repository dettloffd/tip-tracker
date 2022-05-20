import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";

import { Box, Divider, Flex, Icon, Text, useStyles } from "@chakra-ui/react";
import { useHttpHook } from "../../hooks/useHttpHook";

import useChartConstructorHook from "../../hooks/useChartConstructorHook";
import useHighLowStatsHook from "../../hooks/useHighLowStatsHook";
import { format } from "date-fns";

const ChartConstructor = (props) => {
  const [chartData, setChartData] = useState({ categories: [], yValues: [] });
  console.log(props.dateRange);

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

  const { constructAxis } = useChartConstructorHook(props.xKey, props.yKey);

  const { extractHighAndLowValues } = useHighLowStatsHook(
    props.xKey,
    props.yKey
  );

  const { errorMessage, sendRequest } = useHttpHook();
  // necessary import in order for noData module to work correctly
  NoDataToDisplay(Highcharts);

  let requestUrl = `http://localhost:5000/api/stats/${props.url}?startDate=${props.dateRange.startDate}&endDate=${props.dateRange.endDate}`;

  useEffect(() => {
    const getChartData = async () => {
      try {
        let chartResponse = await sendRequest({
          url: requestUrl,
          reqMethod: "GET",
        });

        // if no data returned from database call..
        if (chartResponse.data.count == 0) {
          // set x and y axis to empty arrays
          // this will inform highcharts that there is no data triggering a noData message
          let chartData = { xAxis: [], yAxis: [] };
          setChartData({
            categories: chartData.xAxis,
            yValues: chartData.yAxis,
          });
        } else {
          let values = extractHighAndLowValues(chartResponse);
          // console.log(values);
          let chartData = constructAxis(chartResponse);
          console.log(chartData);
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
      } catch (err) {
        console.log(err);
      }
    };
    getChartData();
  }, [props.dateRange]);

  const options = {
    chart: {
      type: `${props.chartType}`,
      //height: (9 / 16 * 100) + '%',
      //16:9 ratio
      //height: "500px",
    },
    title: {
      text: `${props.chartTitle}`,
    },
    subtitle: {
      // If no start / end date provided, don't show anything..
      // otherwise, formata and show the date range in the subtitle
      text:
        props.dateRange.startDate == ""
          ? "Date Range: All Time"
          : "Date Range: " +
            format(new Date(props.dateRange.startDate), "yyyy/MM/dd") +
            " - " +
            format(new Date(props.dateRange.endDate), "yyyy/MM/dd"),
            

      //text: (format(new Date(props.dateRange.startDate), "yyyy-MM-dd")) + " - " + format(new Date(props.dateRange.endDate), "yyyy/MM/dd")
      // text: "sdsdsd"
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
        `${props.chartType}` === "bar"
          ? Math.min(...chartData.yValues) / 2
          : Math.min(...chartData.yValues),
    },
    series: [
      {
        name: `${props.chartTitle}`,
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
