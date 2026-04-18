const router = require("express").Router();
const { addCargo, getCargo, updateCargoStatus, deleteCargo } = require("./cargo.controller");

router.get("/", getCargo);
router.post("/", addCargo);
router.put("/:id/status", updateCargoStatus);
router.delete("/:id", deleteCargo);

module.exports = router;
