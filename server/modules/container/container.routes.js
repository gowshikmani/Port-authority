const router = require("express").Router();

const {
  addContainer,
  updateLocation,
  getContainers,
  deleteContainer
} = require("./container.controller");

router.post("/", addContainer);
router.get("/", getContainers);
router.put("/:id/location", updateLocation);
router.delete("/:id", deleteContainer);

module.exports = router;
