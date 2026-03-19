const mongoose = require("mongoose");

const dockSchema = new mongoose.Schema({

  dockNumber: {
    type: String,
    required: true,
    unique: true
  },

  capacity: {
    type: Number,
    default: 1
  },

  currentShips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ship"
  }],

  status: {
    type: String,
    enum: ["Available", "Occupied", "Maintenance"],
    default: "Available"
  }

}, { timestamps: true });

module.exports = mongoose.model("Dock", dockSchema);