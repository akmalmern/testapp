const mongoose = require("mongoose");

const testNatijalarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryModel",
    required: true,
  },
  topic: { type: String, required: true },
  answers: [
    {
      testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "testModel",
        required: true,
      },
      userAnswer: { type: String },
    },
  ],
  startTime: { type: Date, required: true },
  endTime: { type: Date },
});

module.exports = mongoose.model("Attempt", testNatijalarSchema);
