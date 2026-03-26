const router = require("express").Router();
const { getShips, createShip } = require("./ship.controller");

router.get("/", getShips);
router.post("/", createShip);

module.exports = router;