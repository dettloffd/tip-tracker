const Entry = require("../models/Entry");
const User = require("../models/User");
//
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");


// Cast creator string to mongodb objectId type
const ObjectId = mongoose.Types.ObjectId;

const getEntriesByUserIdBetweenDates = async (req, res, next) => {
  const queryString = req.query;

  let startDate = queryString.startDate;
  let endDate = queryString.endDate;
  const userId = req.params.uid;

  let entries;

  try {
    //In the document, the userId is saved as an ObjectId, not simply a string..
    //Must cast to ObjectId in order to match

    //entries = await Entry.find({ creator: userId });
    //Same as above

    entries = await Entry.aggregate([
      // { $match: { creator: userId } },
      { $match: { creator: ObjectId(userId) } },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          numTransactions: 1,
          tipsTotal: 1,
          creator: 1,
        },
      },
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      { $sort: { date: -1 } },
    ]);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong! Unable to locate data with provided arguments",
    });
  }

  if (!entries || entries.length === 0) {
    return res.json({
      success: false,
      message: `No entries exist between ${startDate} and ${endDate} with provided user ID`,
    });
  }

  return res.json({
    success: true,
    count: entries.length,
    message: `Retrieval successful. [${entries.length}] entries located with provided user ID.`,
    entries: entries,
  });
};

const getEntriesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let entries;

  try {
    entries = await Entry.aggregate([
      { $match: { creator: ObjectId(userId) } },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          numTransactions: 1,
          tipsTotal: 1,
          creator: 1,
        },
      },
      { $sort: { date: -1 } },
    ]);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong; unable to locate data with provided arguments",
    });
  }

  if (!entries || entries.length === 0) {
    return res.json({
      success: false,
      message: `No entries exist with provided user ID`,
    });
  }

  return res.json({
    success: true,
    count: entries.length,
    message: `Retrieval successful. [${entries.length}] entries located with provided user ID.`,
    entries: entries,
  });
};

const createEntry = async (req, res, next) => {
  //const { date, numTransactions, tipsTotal, creator } = req.body;
  // ^ Before getting creator from token..
  // Now creator comes along from check-auth

  const { date, numTransactions, tipsTotal } = req.body;
  const creator = req.userData.userId;
  // req.userData.userId set in check-auth instead of on request body

  const newEntry = new Entry({
    date: date,
    numTransactions: numTransactions,
    tipsTotal: tipsTotal,
    creator: creator,
  });

  ///////////////////////////////*****FROM HERE DOWN... all involve user */
  let user;

  try {
    user = await User.findById(creator);
    //Check if ID of logged in user exists juuust to make sure
  } catch (err) {
    return res.status(500).json({
      //general error
      success: false,
      message: "Entry creation failed (server error)",
    });
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User for provided ID not found",
    });
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newEntry.save({ session: sess });
    //stores
    user.entries.push(newEntry);
    //MONGOOSE push, not regular JS push.. establishes connection between two models (user and entry)
    //mongo takes newEntry id and adds to entries field of user
    await user.save({ session: sess });
    await sess.commitTransaction();
    // ONLY at this point do changes take place in database
    //***BOTH collections (entries and users) must ALREADY exist for this to work; wont auto create collections */
  } catch (err) {
    console.log(err);
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
        message: "Server error",
      });
    }
  }
  ///////////////////////////////*****FROM HERE UP... all involve user */
  res.status(201).json({ success: true, entry: newEntry });
};

const editEntry = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //method on the validator to check if empty
    res.status(422).json({
      success: false,
      message: "Invalid inputs passed! Check data and try again",
    });
  }

  const { date, numTransactions, tipsTotal } = req.body;
  //Other data CAN be send along, but by only putting these here will only be considered
  const entryId = req.params.eid;

  let entry;
  try {
    entry = await Entry.findById(entryId);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something wrong with request",
    });
  }
  if (entry.creator.toString() !== req.userData.userId) {
    // entry.creator is of type mongooseId in database; must be converted to string in order for comparison to work
    return res.status(401).json({
      success: false,
      message:
        "Unauthorized attempt to edit data - you are not allowed to edit this entry",
    });
  }
  // req.userData set in check-auth middleware; should match userId

  entry.date = date;
  entry.numTransactions = numTransactions;
  entry.tipsTotal = tipsTotal;

  try {
    await entry.save();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong; cannot update",
    });
  }
  res.status(200).json({
    success: true,
    entry: entry,
  });
};

const deleteEntry = async (req, res, next) => {
  const entryId = req.params.eid;

  let entry;
  try {
    entry = await Entry.findById(entryId).populate("creator");
    // populate allows working with document in another collection
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something wrong with request",
    });
  }

  if (!entry) {
    return res.status(404).json({
      success: false,
      message: "Could not find entry with provided ID!",
    });
  }

  if (entry.creator.id !== req.userData.userId) {
    // entry.creator.id already populated as string from populate method above -
    // no need to set toString() like with the edit action
    return res.status(401).json({
      success: false,
      message:
        "Unauthorized attempt to delete - you are not allowed to delete this entry",
    });
  }
  // req.userData set in check-auth middleware; should match userId

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await entry.remove({ session: sess });
    entry.creator.entries.pull(entry);
    //MONGOOSE pull, not regular JS push.. establishes connection between two models (user and entry)
    await entry.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong; cannot delete entry",
    });
  }

  res.json({ success: true, message: "Entry deleted" });
};

const testing = async (req, res, next) => {
  //  Apply creator objectId to all entries
  try {
    userIdString = "62b3ac2a65762acd39a815d7";

    let id = mongoose.Types.ObjectId("62b3ac2a65762acd39a815d7");
    entries = await Entry.updateMany(
      { $match: { creator: userIdString } },
      { creator: id }
    );
  } catch (err) {
    return res.json({ message: err });
  }

  res.json({ count: entries.length, entries: entries });
};


const getAll = async (req, res, next) => {
  try {
    entries = await Entry.aggregate([
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          numTransactions: 1,
          tipsTotal: 1,
          creator: 1,
        },
      },
      { $sort: { date: -1 } },
    ]);
  } catch (err) {
    return res.json({ message: err });
  }

  res.json({ count: entries.length, entries: entries });
};


///// Don't involve user check
const getAllEntriesBetweenDates = async (req, res, next) => {
  const queryString = req.query;
  let startDate = queryString.startDate;
  let endDate = queryString.endDate;
  try {
    entries = await Entry.aggregate([
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          numTransactions: 1,
          tipsTotal: 1,
          creator: 1,
        },
      },
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },

      { $sort: { date: -1 } },
    ]);
  } catch (err) {
    return res.json({ message: err });
  }
  res.json({ count: entries.length, entries: entries });
};

exports.createEntry = createEntry;
exports.editEntry = editEntry;
exports.deleteEntry = deleteEntry;
exports.getAll = getAll;
exports.getAllEntriesBetweenDates = getAllEntriesBetweenDates;
exports.getEntriesByUserId = getEntriesByUserId;
exports.getEntriesByUserIdBetweenDates = getEntriesByUserIdBetweenDates;
exports.testing = testing;
