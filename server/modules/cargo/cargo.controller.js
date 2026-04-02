const Cargo = require("./cargo.model");
const Ship = require("../ship/ship.model");

exports.addCargo = async (req, res) => {
  try {
    const { type, weight, shipId } = req.body;

    const ship = await Ship.findById(shipId);

    if (!ship) {
      return res.status(404).json({ error: "Ship not found" });
    }

    const numericWeight = Number(weight);
    if (Number.isNaN(numericWeight) || numericWeight <= 0) {
      return res.status(400).json({ error: "Invalid cargo weight" });
    }

    const cargo = new Cargo({
      type,
      weight: numericWeight,
      ship: shipId
    });

    await cargo.save();

    // Update ship total cargo weight
    ship.cargoWeight = (ship.cargoWeight || 0) + numericWeight;
    await ship.save();

    res.status(201).json(cargo);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getCargo = async (req, res) => {
  try {
    const cargo = await Cargo.find()
      .populate("ship")
      .populate("containers");

    res.json(cargo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateCargoStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const cargo = await Cargo.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(cargo);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};