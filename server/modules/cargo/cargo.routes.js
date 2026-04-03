const router = require("express").Router();
const { addCargo, getCargo, updateCargoStatus } = require("./cargo.controller");

router.get("/", getCargo);
router.post("/", addCargo);
router.put("/:id/status", updateCargoStatus);

module.exports = router;