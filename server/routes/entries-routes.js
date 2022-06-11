const express = require("express");
const router = express.Router();
const {check} = require('express-validator');
const checkAuth = require("../middleware/check-auth");


//router.get('/', (req,res) => res.send("Hello"));

const entriesControllers = require("../controllers/entries-controllers");

router.get("/", entriesControllers.testing);

router.get("/user/:uid/between", entriesControllers.getEntriesByUserIdBetweenDates);
// url: `http://localhost:5000/api/entries/user/${userId}/between/?startDate=${startDate}&endDate=${endDate}`,

// router.get("/between/:startDate/:endDate", entriesControllers.getAllEntriesBetweenDates);
router.get("/between", entriesControllers.getAllEntriesBetweenDates)
router.get("/user/:uid", entriesControllers.getEntriesByUserId);

router.use(checkAuth);
// Place checkAuth here - everything after this part must be authenticated
// The routes above require no authentication

//router.post("/", entriesControllers.createEntry);
router.patch("/:eid", [check("date").not().isEmpty(), check("numTransactions").not().isEmpty(), check("tipsTotal").not().isEmpty()], entriesControllers.editEntry);
router.post("/", [check("date").not().isEmpty(), check("numTransactions").not().isEmpty(), check("tipsTotal").not().isEmpty(), check("creator").not().isEmpty()], entriesControllers.createEntry);
router.delete("/:eid", entriesControllers.deleteEntry);

module.exports = router;