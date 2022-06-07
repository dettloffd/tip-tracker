const express = require("express");
const { check } = require("express-validator");

//const HttpError = require("../models/http-error");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

//router.get("/", usersControllers.getUsers);

router.post(
  "/signup",
  [
    check("username").isLength({ min: 2 }),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersControllers.signup
);

router.post(
  "/login",

  usersControllers.login
);

module.exports = router;