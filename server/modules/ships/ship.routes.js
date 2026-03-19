const router = require("express").Router();
const { getShips } = require("./ship.controller");

router.get("/", getShips);

module.exports = router;