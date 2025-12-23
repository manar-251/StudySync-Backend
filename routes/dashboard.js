const router = require("express").Router();
const verifyToken = require("../middleware/verify-token");
const dashboardCtrl = require("../controllers/dashboard");

router.get("/", verifyToken, dashboardCtrl.getSummary);

module.exports = router;
