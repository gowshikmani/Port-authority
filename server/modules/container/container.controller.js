const Container = require("./container.model");
const Cargo = require("../cargo/cargo.model");

exports.addContainer = async (req, res) => {
  try {
    const { containerId, weight, cargoId } = req.body;

    const cargo = await Cargo.findById(cargoId);

    if (!cargo) {
      return res.status(404).json({ error: "Cargo not found" });
    }

    const container = new Container({
      containerId,
      weight,
      cargo: cargoId
    });

    await container.save();

    cargo.containers.push(container._id);
    await cargo.save();

    res.status(201).json(container);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { location } = req.body;

    const container = await Container.findByIdAndUpdate(
      req.params.id,
      { location },
      { new: true }
    );

    res.json(container);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContainers = async (req, res) => {
  try {
    const containers = await Container.find()
      .populate("cargo");

    res.json(containers);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};