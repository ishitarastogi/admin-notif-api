const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    wallet: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    eventHash: {
      type: String,
      required: true,
    },
    lastBlockNumber: {
        type: Number,
        required: true,
      },
      contractAddress: {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("events", eventSchema);