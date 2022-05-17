import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { Box, Divider, Flex } from "@chakra-ui/react";
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
    <Flex direction={"column"}>
        <Box >
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
        <Box
 
        >
          <h3>
            High: {highAndLowValues.topValue.x} with{" "}
            {highAndLowValues.topValue.y}
          </h3>
          <Divider />
          <h3>
            Low: {highAndLowValues.bottomValue.x} with{" "}
            {highAndLowValues.bottomValue.y}
          </h3>
        </Box>
        </Flex>
        </>
  );
};

export default ChartConstructor;
