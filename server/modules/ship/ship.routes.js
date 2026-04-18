const router = require("express").Router();
const { getShips, createShip, deleteShip } = require("./ship.controller");

router.get("/", getShips);
router.post("/", createShip);
router.delete("/:id", deleteShip);

module.exports = router;
