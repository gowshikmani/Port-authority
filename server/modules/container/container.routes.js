const router = require("express").Router();

const {
  addContainer,
  updateLocation,
  getContainers
} = require("./container.controller");

router.post("/", addContainer);
router.get("/", getContainers);
router.put("/:id/location", updateLocation);

module.exports = router;