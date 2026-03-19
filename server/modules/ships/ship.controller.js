const Ship = require("./ship.model");

exports.getShips = async (req, res) => {
  const ships = await Ship.find();
  res.json(ships);
};