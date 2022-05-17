const Entry = require("../models/Entry");
// const { validationResult } = require("express-validator");
// const { json } = require("express");

function formatDate() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  console.log(d);

  return [year, month, day].join("-");
}

const avgVarByTime = async (req, res, next) => {
  const queryString = req.query;

  let startDate = queryString.startDate ? queryString.startDate : "1900-01-01";
  let endDate = queryString.endDate ? queryString.endDate : formatDate();

  const { statVar, timeVar } = req.params;

  //////////////http://localhost:5000/api/stats/avg/avgTip/day/?startDate=1900-01-01&endDate=2021-08-09

  let results;

  try {
    results = await Entry.aggregate([
      {
        $project: {
          formattedDate: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          day: { $dayOfWeek: "$date" },
          month: { $month: "$date" },
          year: { $year: "$date" },
          numTransactions: 1,
          tipsTotal: 1,
  
          avgTip: {
            $round: [{ $divide: ["$tipsTotal", "$numTransactions"] }, 2],
          },
        },
      },
      {
        $match: {
          formattedDate: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
  
      { $group: { _id: `$${timeVar}`, Avg: { $avg: `$${statVar}` } } },
      // Uses timeVar (day, month, year..) to group
      // starVar holds whether it's going to be average tip, tip total, numTransactions, etc.
  
      {
        $project: {
          _id: 0,
          // can change to _id: 1, .... if a reason is found to use _id rather than the time variable
          [timeVar]: "$_id",
          [statVar]: { $round: ["$Avg", 2] },
        },
      }, // remove "_id", change to actual time period being requested in results
  
      { $sort: { [timeVar]: 1 } },  // return the results sorted in ascending order by the time variable - day, month, year, etc
    ]);
  } catch (err) {
    res.json({ message: err });
  }

  res.json({
    count: results.length,
    results: results,
    params: { statVar, timeVar },
    dateStuff: { startDate, endDate },

  });
};



const testing = async (req, res, next) => {
  let results;

  try {
    results = await Entry.aggregate([
      {
        $project: {
          day: { $dayOfWeek: "$date" },
          weekday: { $dayOfWeek: "$date" },
          month: { $month: "$date" },
          year: { $year: "$date" },
          numTransactions: 1,
          tipsTotal: 1,
          AvgTips: {
            $round: [{ $divide: ["$tipsTotal", "$numTransactions"] }, 2],
          },
        },
      },

      { $group: { _id: "$day", Avg: { $avg: "$AvgTips" } } },
      // { $group: { _id: "$month", Avg: { $avg: "$AvgTips" } } },
      //{ $group: { _id: "$year", Avg: { $avg: "$AvgTips" } } },

      //    { $project: { _id: 1, AvgTips: { $round: ["$Avg", 2] } } },
      //   { $sort: { _id: 1 } },
    ]);
  } catch (err) {
    res.json({ message: err });
  }

  res.json({ count: results.length, results: results });
};


// const testing = async (req, res, next) => {
//     let results;

//     try {
//       results = await Entry.aggregate([
//         {
//           $project: {
//             day: { $dayOfWeek: "$date" },
//             numTransactions: 1,
//             tipsTotal: 1,
//             AvgTips: {
//               $round: [{ $divide: ["$tipsTotal", "$numTransactions"] }, 2],
//             },
//           },
//         },

//         { $group: { _id: "$day", Avg: { $avg: "$AvgTips" } } },

//         { $project: { day: 1, AvgTips: { $round: ["$Avg", 2] } } },
//         { $sort: { _id: 1 } },
//       ]);
//     } catch (err) {
//       res.json({ message: err });
//     }

//     res.json({ count: results.length, results: results });
//   };

// const testing = async (req, res, next) => {
//   let results;

//   results = await Entry.aggregate([
//     {
//       $project: {
//         date: 1,
//         numDelivs: 1,
//         tipsTotal: 1,
//         day: { $dayOfWeek: "$date" },
//       },
//     },
//     { $sort: { tipsTotal: -1 } },
//   ]);
//   res.json({ count: results.length, results: results });
// };

exports.testing = testing;
exports.avgVarByTime = avgVarByTime;
//exports.avgTipByWeekDay = avgTipByWeekDay;

///////////////
//

// const avgTesting = async (req, res, next) => {
//   const queryString = req.query;
//   //const statParameter = req.params.statParameter;

//   let startDate = queryString.startDate ? queryString.startDate : "1900-01-01";
//   let endDate = queryString.endDate ? queryString.endDate : formatDate();

//   const { statVar, timeVar } = req.params;

//   //////////////http://localhost:5000/api/stats/avg/avgTip/day/?startDate=1900-01-01&endDate=2021-08-09

//   let results;

//   try {
//     results = await Entry.aggregate([
//       {
//         $project: {
//           formattedDate: {
//             $dateToString: { format: "%Y-%m-%d", date: "$date" },
//           },
//           day: { $dayOfWeek: "$date" },
//           //weekday: { $dayOfWeek: "$date" },
//           month: { $month: "$date" },
//           year: { $year: "$date" },
//           numTransactions: 1,
//           tipsTotal: 1,
//           // avgDailyTip: {
//           //   $round: [{ $divide: ["$tipsTotal", "$numTransactions"] }, 2],
//           // },
//           avgTip: {
//             $round: [{ $divide: ["$tipsTotal", "$numTransactions"] }, 2],
//           },
//         },
//       },
//       {
//         $match: {
//           formattedDate: {
//             $gte: startDate,
//             $lte: endDate,
//           },
//         },
//       },

//       //   { $group: { _id: "$day", Avg: { $avg: "$AvgTips" } } },
//       // { $group: { _id: "$month", Avg: { $avg: "$AvgTips" } } },

//       //{ $group: { _id: `$${timeVar}`, Avg: { $avg: `$${statVar}` } } },
//       ///////{ $project: { _id: 1, AvgTips: { $round: ["$Avg", 2] } } },
//       ///////{ $project: { _id: 1, avgggg: { $round: ["$Avg", 2] } } },
//       //////*****{ $project: { _id: 1, ["avg_" + statVar]: { $round: ["$Avg", 2] } } },

//       ////{ $project: { _id: 1, ["avg_" + statVar + "_" + timeVar]: { $round: ["$Avg", 2] } } },

//       /////***** */
//       //////Playing with getting total tips by different times here*************
//       ///// { $group: { _id: `$${timeVar}`, Avg: "tipsTotal" } },

//       ///{ $group: { _id: `$${timeVar}`, Avg: { $avg: "$avgDailyTip" } } },

//       { $group: { _id: `$${timeVar}`, Avg: { $avg: `$${statVar}` } } },
//       // Think this is it.
//       // Uses timeVar (day, month, year..)
//       // Then starVar holds whether it's going to be daily tip, tips total.. could do numTransactions as well

//       //{ $project: { _id: 1, [statVar]: { $round: ["$Avg", 2] },  } },
//       {
//         $project: {
//           _id: 0,
//           [timeVar]: "$_id",
//           [statVar]: { $round: ["$Avg", 2] },
//         },
//       }, // remove "_id", change to actual time period being requested in results
//       { $sort: { [timeVar]: 1 } },  // return the results sorted in ascending order by the time variable - day, month, year, etc
//     ]);
//   } catch (err) {
//     res.json({ message: err });
//   }

//   res.json({
//     count: results.length,
//     results: results,
//     params: { statVar, timeVar },
//     dateStuff: { startDate, endDate },
//     topValue: results[0],
//     bottomValue: results[results.length - 1],
//   });
// };