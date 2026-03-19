const mongoose = require("mongoose");

const cargoSchema = new mongoose.Schema({

  type: {
    type: String,
    required: true
  },

  weight: {
    type: Number,
    required: true
  },

  origin: {
    type: String
  },

  destination: {
    type: String
  },

  ship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ship",
    required: true
  },

  containers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Container"
  }],

  status: {
    type: String,
    enum: ["Pending", "Loading", "Unloading", "Stored", "Dispatched"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Cargo", cargoSchema);