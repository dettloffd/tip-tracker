import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";

import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import { useHttpHook } from "../../hooks/useHttpHook";

import useChartConstructorHook from "../../hooks/useChartConstructorHook";
import useHighLowStatsHook from "../../hooks/useHighLowStatsHook";

const ChartConstructor = (props) => {
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

  const { constructAxis } = useChartConstructorHook(props.xKey, props.yKey);

  const { extractHighAndLowValues } = useHighLowStatsHook(
    props.xKey,
    props.yKey
  );

  const { errorMessage, sendRequest } = useHttpHook();

  let requestUrl = `http://localhost:5000/api/stats/${props.url}?startDate=${props.dateRange.startDate}&endDate=${props.dateRange.endDate}`;

  useEffect(() => {
    const getChartData = async () => {
      try {
        let chartResponse = await sendRequest({
          url: requestUrl,
          reqMethod: "GET",
        });

        let values = extractHighAndLowValues(chartResponse);
        let chartData = constructAxis(chartResponse);
        setChartData({ categories: chartData.xAxis, yValues: chartData.yAxis });
        //Much more succint but less explicit version of above..
        // setChartData({
        //   categories: constructAxis(chartResponse).xAxis,
        //   yValues: constructAxis(chartResponse).yAxis,
        // });

        setHighAndLowValues({
          topValue: { x: values.topValue.x, y: values.topValue.y },
          bottomValue: { x: values.bottomValue.x, y: values.bottomValue.y },
        });
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
    xAxis: { categories: chartData.categories },
    plotOptions: {
      series: {
          color: '#38B2AC'
      }
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
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
        <Divider></Divider>

        <Flex
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

        <Divider />
        <Flex
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
        </Flex>
      </Flex>
    </>
  );
};

export default ChartConstructor;
