const router = require("express").Router();
const verifyToken = require("../middleware/verify-token");
const wellnessCtrl = require("../controllers/wellnessLogs");

router.get("/", verifyToken, wellnessCtrl.index);
router.post("/", verifyToken, wellnessCtrl.upsert);
router.delete("/:id", verifyToken, wellnessCtrl.destroy);

module.exports = router;
