const express = require("express");
const colors = require("colors");
const router = express.Router();

const statsControllers = require("../controllers/stats-controllers");


// router.get("/", statsControllers.testing);
router.get("/user/:uid/avgBetweenDates", statsControllers.avgVarByTimeBetweenDates);
// router.get("/avg/:statVar/:timeVar", statsControllers.avgVarByTimeGetAll);

router.get("/user/:uid/avg", statsControllers.avgVarByTimeGetAll);


// router.get("/user/:uid/between", entriesControllers.getEntriesByUserIdBetweenDates);




//router.get("/avgTipByWeekDay", statsControllers.avgTipByWeekDay);

//router.get("/highAvgTipDay", statsControllers.highAvgTipDay);

// router.get("/highAvgTipsTotal", statsControllers.highAvgTipsTotal);

// router.get("/avgDeliveriesPerWeekday", statsControllers.avgDeliveriesPerWeekday);

// router.get("/topDatesByTipsTotal", statsControllers.topDatesByTipsTotal);


module.exports = router;