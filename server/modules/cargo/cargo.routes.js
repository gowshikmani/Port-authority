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