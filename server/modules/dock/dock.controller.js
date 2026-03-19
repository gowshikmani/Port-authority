const Dock = require("./dock.model");
const Ship = require("../ship/ship.model");

exports.assignShipToDock = async (req, res) => {
  try {
    const { dockId, shipId } = req.body;

    const dock = await Dock.findById(dockId);
    const ship = await Ship.findById(shipId);

    if (!dock || !ship) {
      return res.status(404).json({ error: "Dock or Ship not found" });
    }

    // Check capacity
    if (dock.currentShips.length >= dock.capacity) {
      return res.status(400).json({ error: "Dock is full" });
    }

    // Assign ship
    dock.currentShips.push(shipId);
    dock.status = "Occupied";

    ship.status = "Docked";
    ship.dock = dockId;

    await dock.save();
    await ship.save();

    res.json({ message: "Ship assigned to dock" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.removeShipFromDock = async (req, res) => {
  try {
    const { dockId, shipId } = req.body;

    const dock = await Dock.findById(dockId);

    dock.currentShips = dock.currentShips.filter(
      id => id.toString() !== shipId
    );

    if (dock.currentShips.length === 0) {
      dock.status = "Available";
    }

    await dock.save();

    res.json({ message: "Ship removed from dock" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};