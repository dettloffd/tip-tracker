const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  "date": {
    type: Date,
    required: true,
  },
  "numTransactions": {
    type: Number,
    required: true,
  },
  "tipsTotal": {
    type: Number,
    required: true,
  },
  // "creator": {
  //   type: mongoose.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // }
});

module.exports = mongoose.model('Entry', entrySchema);