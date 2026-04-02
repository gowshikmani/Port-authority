const mongoose = require("mongoose");

const shipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imoNumber: { type: String, required: true },
  arrivalTime: { type: Date, required: true },
  status: { type: String, default: "Scheduled" },
  cargoWeight: { type: Number, default: 0 }
});

module.exports = mongoose.model("Ship", shipSchema);