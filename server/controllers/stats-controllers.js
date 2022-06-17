const Entry = require("../models/Entry");
const mongoose = require("mongoose");

// Cast creator string to mongodb objectId type
const ObjectId = mongoose.Types.ObjectId;

const avgVarByTimeBetweenDates = async (req, res, next) => {
  const { startDate, endDate, statVar, timeVar } = req.query;
  const userId = req.params.uid;

  let results;

  try {
    results = await Entry.aggregate([
      { $match: { creator: ObjectId(userId) } },
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

      { $sort: { [timeVar]: 1 } }, // return the results sorted in ascending order by the time variable - day, month, year, etc
    ]);
  } catch (err) {
    // console.log(err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(422).json({
        success: false,
        message: "Creation failed; required parameters missing",
        messages: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Server Error! Please try again later.",
      });
    }
  }
  let count;

  if (results){
    count = results.length;

  } else{
    count = 0;
  }

   res.json({
    count: count,
    results: results,
    params: { statVar, timeVar },
    dateStuff: { startDate, endDate },
  });
};

const avgVarByTimeGetAll = async (req, res, next) => {
  const { statVar, timeVar } = req.query;
  const userId = req.params.uid;

  let results;

  try {
    results = await Entry.aggregate([
      { $match: { creator: ObjectId(userId) } },
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

      { $sort: { [timeVar]: 1 } }, // return the results sorted in ascending order by the time variable - day, month, year, etc
    ]);
  } catch (err) {
    // console.log(err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(422).json({
        success: false,
        message: "Creation failed; required parameters missing",
        messages: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Server Error! Please try again later.",
      });
    }
  }
  let count;

  if (results){
    count = results.length;

  } else{
    count = 0;
  }

   res.json({
    count: count,
    results: results,
    params: { statVar, timeVar },
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
    return res.json({ message: err });
  }

   res.json({ count: results.length, results: results });
};

exports.testing = testing;
exports.avgVarByTimeBetweenDates = avgVarByTimeBetweenDates;
exports.avgVarByTimeGetAll = avgVarByTimeGetAll;


