export const chartFieldsArray = [
    {
      chartTitle: "Average Tip by Weekday",
      chartType: "line",
      url: "avg/avgTip/day/",
      //url: "avgByWeekday/tips",
      //xKey: "weekDay",
      xKey: "day",
      yKey: "avgTip",
    },
    {
      chartTitle: "Average Tip by Month",
      chartType: "line",
      url: "avg/avgTip/month",
      xKey: "month",
      yKey: "avgTip",
    },
    {
      chartTitle: "Average Tip by Year",
      chartType: "bar",
      url: "avg/avgTip/year",
      xKey: "year",
      yKey: "avgTip",
    },
    {
      chartTitle: "Average Total Tips by Weekday",
      chartType: "bar",
      url: "avg/tipsTotal/day",
      //url: "avgByWeekday/tipsTotal",
      xKey: "day",
      yKey: "tipsTotal",
      //high={"Highest Average Total Tips by Weekday "},
      //low={"Lowest Average Total Tips by Weekday "},
    },
    {
      chartTitle: "Average Number of Transactions per Weekday",
      chartType: "line",
      url: "avg/numTransactions/day",
      xKey: "day",
      yKey: "numTransactions",
    },



    {
      chartTitle: "Average Number of Transactions per Month",
      chartType: "bar",
      url: "avg/numTransactions/day",
      xKey: "month",
      yKey: "numTransactions",
    },


    {
      chartTitle: "Average Total Tips per Month",
      chartType: "line",
      url: "avg/numTransactions/day",
      xKey: "month",
      yKey: "tipsTotal",
    },

    {
      chartTitle: "Average Number of Transactions per Year",
      chartType: "bar",
      url: "avg/numTransactions/day",
      xKey: "year",
      yKey: "numTransactions",
    },
  ];

  export default chartFieldsArray;