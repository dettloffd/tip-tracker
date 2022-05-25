import { Flex, Text } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";

import { ResponsiveTimeRange } from "@nivo/calendar";
import { getAllEntriesBetweenDates } from "../api/entriesApi";

export default function HeatMap({ numDays }) {
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

  let heatmapValues = [];
  if (data) {
    let returnEntries = data.data.entries;
    // Timerange is expecting "Day" and "value" fields
    returnEntries.forEach((entry) =>
      heatmapValues.push({ day: entry.date, value: 1 })
    );
  }

  return (
    <>
      <ResponsiveTimeRange
        data={heatmapValues}
        // height={350}
        // width={900}
        from={startDate}
        to={endDate}
        emptyColor="#eeeeee"
        // colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        colors={["#319795", "#319795", "#319795", "#319795"]}
        margin={{ top: 40, right: 40, bottom: 0, left: 40 }}
        // margin={{ top: 60, right: 10, bottom: 0, left: 10 }}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        weekdayLegendOffset={50}
        dayRadius={3}
      />
      <h1>yoo</h1>
      <h1>ayyye</h1>
    </>
  );
}

// export default function HeatMap({ numDays }) {
//     const today = new Date();
//     function shiftDate(date, numDays) {
//       const newDate = new Date(date);
//       newDate.setDate(newDate.getDate() + numDays);
//       return newDate;
//     }

//     //   const testt = format(parseISO(new Date("2022-05-25")), "yyyy-MM-dd" );

//   //   let testt = format(
//   //     parseISO(new Date("2022-05-25").toISOString()),
//   //     "yyyy-MM-dd"
//   //   );
//     //   console.log(testt);

//     //   let startDate = shiftDate(today, -numDays);
//     //   let endDate = today;

//     // startDate -> shiftDate function gives date numDays before today, it's parsed as ISO, then formatted.
//     let startDate = format(
//       parseISO(shiftDate(today, -numDays).toISOString()),
//       "yyyy-MM-dd"
//     );
//     let endDate = format(parseISO(today.toISOString()), "yyyy-MM-dd");

//     //   console.log(startDate);
//     //   console.log(endDate);
//     const { data, error, isLoading, isError } = useQuery(
//       ["heatMapDates", { startDate: startDate, endDate: endDate }],
//       getAllEntriesBetweenDates
//     );

//     let heatmapValues = [];
//     if (data) {
//       console.log(data);
//       //   format(parseISO(today.toISOString()), "yyyy-MM-dd")

//       let returnEntries = data.data.entries;
//       //   console.log(returnEntries);

//       returnEntries.forEach((entry) => heatmapValues.push({ date: entry.date }));

//       //   console.log(heatmapValues);
//     }

//   //   titleForValue={(value) => `Date is ${value}`}

//   const somethingfunc = (value) => {
//       if (value.date){
//           return `date is ${value.date}`
//       }else{
//           return`no date`
//       }

//   }

//   //   const getTooltipDataAttrs = (value) => {
//   //     return { "data-tip":  value.date };
//   //   };
//   const getTooltipDataAttrs = (value) => {
//       // Temporary hack around null value.date issue
//       if (!value.date) {
//         return null;
//       }

//       if (value.date) {
//           return { "data-tip": "Tooltip: " + value.date };
//       }
//       // Configuration for react-tooltip
//       return {
//         'data-tip': ` ${value.date} `,
//       };
//     };

//       // const getTooltipDataAttrs = (value) => {
//       //   // Temporary hack around null value.date issue
//       //   if (!value || !value.date) {
//       //     return null;
//       //   }

//       //   if (value.date) {
//       //     return {
//       //       'data-tip': `Date ${value.date} has the value  `,
//       //     }
//       //   }
//       //   // Configuration for react-tooltip
//       //   // return {
//       //   //   'data-tip': ` ${value.date} `,
//       //   // };
//       // };
//     //   ReactTooltip.rebuild();

//     return (
//       <>
//         <CalendarHeatmap
//           startDate={shiftDate(today, -numDays)}
//           endDate={endDate}
//           values={heatmapValues}
//           onMouseOver={() => {
//             return (
//               <>
//                 <a data-tip="React-tooltip"></a>

//                 <ReactTooltip place="top" type="dark" effect="float" />
//               </>
//             );
//           }}
//           // tooltipDataAttrs={"a word"}
//           // onClick={(value) => alert(`Clicked on value with count: ${value.date}`)}
//           // tooltipDataAttrs={{'data-tooltip': 'tooltip'}}
//           titleForValue={(value) => `Date is ${value}`}
//           // titleForValue={(value) => value.date ?  `Date is ${value.date}` : `no data` }

//           // titleForValue={somethingfunc}

//           tooltipDataAttrs={getTooltipDataAttrs}
//           // values={[
//           //   { date: "2022-01-01" },
//           //   { date: "2022-02-22", count: 122 },
//           //   { date: "2022-03-29", count: 38 },
//           //   // ...and so on
//           // ]}
//           //   classForValue={value => {
//           //     if (!value) {
//           //       return {somethng};
//           //     }
//           //     return {somethng};
//           //   }}
//           showWeekdayLabels={false}
//           showMonthLabels={true}
//           gutterSize={2}
//         ></CalendarHeatmap>
//         <Text pt={1} fontSize="sm" color={"gray.500"} textAlign="center">
//           {"("}Previous {numDays} days{")"}
//         </Text>
//         <ReactTooltip />
//       </>
//     );
//   }
