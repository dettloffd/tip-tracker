const { check } = require("express-validator");
const express = require("express");
const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

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