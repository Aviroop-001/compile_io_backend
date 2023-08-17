const mongoose = require("mongoose");

const sharedCodeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SharedCode", sharedCodeSchema);
