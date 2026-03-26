const Ship = require("./ship.model");

exports.getShips = async (req, res) => {
  const ships = await Ship.find();
  res.json(ships);
};

exports.createShip = async (req, res) => {
  const { name, imoNumber, arrivalTime } = req.body;

  if (!name || !imoNumber || !arrivalTime) {
    return res.status(400).json({ error: "name, imoNumber, and arrivalTime are required" });
  }

  const ship = new Ship({
    name,
    imoNumber,
    arrivalTime,
    status: "Scheduled"
  });

  await ship.save();
  res.status(201).json(ship);
};