const { Router } = require("express");

const router = Router();

const activitiesRoutes = require("./activities");
const countriesRoutes = require("./countries");

router.use("/activities", activitiesRoutes);
router.use("/countries", countriesRoutes);

module.exports = router;
