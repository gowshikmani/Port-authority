const mongoose = require("mongoose");

const shipSchema = new mongoose.Schema({
  name: String,
  imoNumber: String,
  arrivalTime: Date,
  status: String
});

module.exports = mongoose.model("Ship", shipSchema);