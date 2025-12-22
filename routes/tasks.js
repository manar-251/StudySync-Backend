const router = require("express").Router();
const tasksCtrl = require("../controllers/tasks");

router.get("/", tasksCtrl.index);
router.post("/", tasksCtrl.create);
router.put("/:id", tasksCtrl.update);
router.delete("/:id", tasksCtrl.destroy);

module.exports = router;
