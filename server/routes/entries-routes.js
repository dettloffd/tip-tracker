const express = require("express");
const router = express.Router();
const {check} = require('express-validator');


//router.get('/', (req,res) => res.send("Hello"));

const entriesControllers = require("../controllers/entries-controllers");

router.get("/", entriesControllers.getAll);

router.get("/user/:uid", entriesControllers.getEntriesByUserId);


//router.post("/", entriesControllers.createEntry);
router.patch("/:eid", [check("date").not().isEmpty(), check("numTransactions").not().isEmpty(), check("tipsTotal").not().isEmpty()], entriesControllers.editEntry);
router.post("/", [check("date").not().isEmpty(), check("numTransactions").not().isEmpty(), check("tipsTotal").not().isEmpty()], entriesControllers.createEntry);
router.delete("/:eid", entriesControllers.deleteEntry);

module.exports = router;