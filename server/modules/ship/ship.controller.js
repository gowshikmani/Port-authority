const Ship = require("./ship.model");

exports.getShips = async (req, res) => {
  const ships = await Ship.find().populate('dock');
  res.json(ships);
};



exports.createShip = async (req, res) => {
  const { name, imoNumber, arrivalTime, lat, lng } = req.body;

  if (!name || !imoNumber || !arrivalTime) {
    return res.status(400).json({ error: "name, imoNumber, and arrivalTime are required" });
  }

  const ship = new Ship({
    name,
    imoNumber,
    arrivalTime,
    status: "Scheduled",
    location: lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : undefined
  });

  await ship.save();
  res.status(201).json(ship);
};

exports.deleteShip = async (req, res) => {
  try {
    const ship = await Ship.findByIdAndDelete(req.params.id);
    if (!ship) {
      return res.status(404).json({ error: "Ship not found" });
    }
    res.json({ message: "Ship deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

