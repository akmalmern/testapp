const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Savolni kiritishingiz shart"],
    },
    options: [
      {
        type: String,
        required: [true, " varyantlarni kiritishingiz shart"],
      },
    ],
    correctAnswer: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryModel",
      required: true,
      topic: { type: String, required: true },
    },
  },
  { timestamps: true }
);
const testModel = mongoose.model("testModel", testSchema);

module.exports = testModel;
