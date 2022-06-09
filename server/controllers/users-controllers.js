//const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/User");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    //method on the validator to check if empty
    return res.status(422).json({
      success: false,
      message: "Invalid inputs passed. Please check data",
    });
  }

  
  const { username, email, password } = req.body;
 

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    //finds one document (entry in database) matching criteria of method
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed signup due to server issue; please try later",
    });
  }

  if (existingUser) {
    //if user with email found

    return res.status(422).json({
      success: false,
      message: "An account with this email address already exists.",
    });
  }

  const createdUser = new User({
    username,
    email,
    password,
    entries: [],
  });

  try {
    await createdUser.save();
    //save to mongo db; mongoose method. creates ID as well.
    //this also creates promise
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User creation failed due to server issue; please try later",
    });
  }

  res.status(201).json({ success: true, user: createdUser });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    //finds one document (entry in database) matching criteria of method
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed signup due to server issue; please try later",
    });
  }

  if (!existingUser || existingUser.password !== password) {

    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
    //return next(new HttpError('Credentials invalid', 401));
  }
  return res.json({
    success: true,
    message: "Logged in!",
    // user: existingUser.toObject(),

    user: existingUser.toObject({ getters: true }),
    
  });
};

//exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
