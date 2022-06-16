//const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  let hashedPassword;

  try{
    hashedPassword = await bcrypt.hash(password, 12);

  } catch (err){
    res.status(500).json({
      success: false,
      message: "Could not create user; please try again later",
    });
  }

  const createdUser = new User({
    username,
    email,
    password: hashedPassword,
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

  let token;
  try{
    token = jwt.sign({userId: createdUser.id, email: createdUser.email}, 'super_secret_key', {expiresIn: "1h"});
    // "id" provided by mongoose for every document created..
  } catch (err){
    return res.status(500).json({
      success: false,
      message: "User creation failed due to server issue; please try later",
    });
  }


  res.status(201).json({success: true, createdUser, token: token  });
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

  if (!existingUser) {

    return res.status(403).json({
      // 403 => invalid credentials
      success: false,
      message: "Invalid credentials",
    });
  }

  let isValidPassword = false;

  try{
    isValidPassword = await bcrypt.compare(password, existingUser.password);
    // returns a boolean

  } catch (err){
    return res.status(500).json({
      // Serverside error: will only return error in case of server error
      success: false,
      message: "Could not log you in! Please check credentials and try again",
    });

  }

  if (!isValidPassword){
    return res.status(401).json({
      // Credentials error: will only return error in case of incorrect credentials/password
      success: false,
      message: "Invalid credentials! Please check your password and try again.",
    });

  }

  let token;
  try{
    token = jwt.sign({userId: existingUser.id, email: existingUser.email}, 'super_secret_key', {expiresIn: "1h"});
    // "id" provided by mongoose for every document created..
  } catch (err){
    return res.status(500).json({
      success: false,
      message: "Logging in failed due to server issue! Please try later.",
    });
  }

  return res.json({
    success: true,
    message: "Logged in!",
    existingUser,
    // user: existingUser.toObject(),
    // userId: existingUser.id,
    // email: existingUser.email,
    token: token
  });
};

//exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
