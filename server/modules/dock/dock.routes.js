const router = require("express").Router();
const {
  assignShipToDock,
  removeShipFromDock
} = require("./dock.controller");

router.post("/assign", assignShipToDock);
router.post("/remove", removeShipFromDock);

module.exports = router;