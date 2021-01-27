const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    customerName: String,
    roomNo: Number,
    hotelName: String,
    Date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", TodoSchema);
