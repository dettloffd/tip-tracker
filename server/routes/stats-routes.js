const express = require("express");
const colors = require("colors");
const router = express.Router();

const statsControllers = require("../controllers/stats-controllers");


router.get("/", statsControllers.testing);


router.get("/avg/:statVar/:timeVar", statsControllers.avgVarByTime);

//router.get("/avgTipByWeekDay", statsControllers.avgTipByWeekDay);

//router.get("/highAvgTipDay", statsControllers.highAvgTipDay);

// router.get("/highAvgTipsTotal", statsControllers.highAvgTipsTotal);

// router.get("/avgDeliveriesPerWeekday", statsControllers.avgDeliveriesPerWeekday);

// router.get("/topDatesByTipsTotal", statsControllers.topDatesByTipsTotal);


module.exports = router;