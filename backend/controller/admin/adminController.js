const Category = require("../../model/testCategory");
const Test = require("../../model/testModel");

// Kategoriya va mavzu qo'shish
exports.createCategory = async (req, res) => {
  try {
    const { name, topics } = req.body;

    const category = new Category({ name, topics });
    await category.save();

    res.status(201).send({ message: "Kategoriya yaratildi", category });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Test qo'shish
exports.createTest = async (req, res) => {
  try {
    const { categoryId, topic, question, options, correctAnswer } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({ error: "Kategoriya topilmadi" });
    }

    const test = new Test({
      question,
      options,
      correctAnswer,
      category: categoryId,
      topic,
    });
    await test.save();

    res.status(201).send({ message: "Test qo'shildi", test });
  } catch (error) {
    res.status(500).send({ error: "Test yaratishda xatolik" });
  }
};
