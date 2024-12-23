const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topics: [
      {
        name: { type: String, required: true },
        duration: { type: Number, required: true }, // Test davomiyligi (minutlarda)
      },
    ],
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categoryModel", categorySchema);

module.exports = categoryModel;
