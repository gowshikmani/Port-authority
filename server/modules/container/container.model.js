const mongoose = require("mongoose");

const containerSchema = new mongoose.Schema({

  containerId: {
    type: String,
    required: true,
    unique: true
  },

  type: {
    type: String,
    enum: ["Dry", "Reefer", "Tank"],
    default: "Dry"
  },

  weight: {
    type: Number,
    required: true
  },

  cargo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cargo",
    required: true
  },

  location: {
    type: String,
    enum: ["Ship", "Dock", "Warehouse", "Truck"],
    default: "Ship"
  },

  status: {
    type: String,
    enum: ["Loaded", "In Transit", "Stored", "Delivered"],
    default: "Loaded"
  }

}, { timestamps: true });

module.exports = mongoose.model("Container", containerSchema);