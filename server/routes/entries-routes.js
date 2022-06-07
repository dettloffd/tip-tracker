const express = require("express");
const router = express.Router();
const {check} = require('express-validator');


//router.get('/', (req,res) => res.send("Hello"));

const entriesControllers = require("../controllers/entries-controllers");

router.get("/", entriesControllers.getAll);

router.get("/user/:uid/between", entriesControllers.getEntriesByUserIdBetweenDates);
// url: `http://localhost:5000/api/entries/user/${userId}/between/?startDate=${startDate}&endDate=${endDate}`,

// router.get("/between/:startDate/:endDate", entriesControllers.getAllEntriesBetweenDates);
router.get("/between", entriesControllers.getAllEntriesBetweenDates)


router.get("/user/:uid", entriesControllers.getEntriesByUserId);

// router.get("between/user/:uid", entriesControllers.getEntriesByUserId);


//router.post("/", entriesControllers.createEntry);
router.patch("/:eid", [check("date").not().isEmpty(), check("numTransactions").not().isEmpty(), check("tipsTotal").not().isEmpty()], entriesControllers.editEntry);
router.post("/", [check("date").not().isEmpty(), check("numTransactions").not().isEmpty(), check("tipsTotal").not().isEmpty(), check("creator").not().isEmpty()], entriesControllers.createEntry);
router.delete("/:eid", entriesControllers.deleteEntry);

module.exports = router;