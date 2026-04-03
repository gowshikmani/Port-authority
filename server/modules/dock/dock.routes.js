const router = require("express").Router();
const {
  getDocks,
  createDock,
  assignShipToDock,
  removeShipFromDock
} = require("./dock.controller");

router.get("/", getDocks);
router.post("/", createDock);
router.post("/assign", assignShipToDock);
router.post("/remove", removeShipFromDock);

module.exports = router;