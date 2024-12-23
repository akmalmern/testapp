const Attempt = require("../model/testNatijalarModel");
const Test = require("../model/testModel");

// Testni boshlash
exports.startTest = async (req, res) => {
  try {
    const { userId, categoryId, topic } = req.body;

    const tests = await Test.find({ category: categoryId, topic }).limit(30);
    if (!tests.length) {
      return res.status(404).send({ error: "Testlar topilmadi" });
    }

    const attempt = new Attempt({
      userId,
      category: categoryId,
      topic,
      answers: tests.map((test) => ({ testId: test._id, userAnswer: "" })),
      startTime: new Date(),
    });

    await attempt.save();

    res
      .status(201)
      .send({ message: "Test boshlandi", attemptId: attempt._id, tests });
  } catch (error) {
    res.status(500).send({ error: "Testni boshlashda xatolik" });
  }
};

// Test natijalarini ko'rsatish
exports.finishTest = async (req, res) => {
  try {
    const { attemptId } = req.body;

    const attempt = await Attempt.findById(attemptId).populate(
      "answers.testId"
    );
    if (!attempt) {
      return res.status(404).send({ error: "Sessiya topilmadi" });
    }

    const currentTime = new Date();
    const maxDuration =
      attempt.endTime ||
      new Date(attempt.startTime.getTime() + attempt.topic.duration * 60000);

    if (currentTime > maxDuration) {
      return res.status(400).send({ error: "Vaqt tugagan!" });
    }

    let correct = 0;
    let incorrect = 0;

    attempt.answers.forEach((answer) => {
      if (answer.userAnswer === answer.testId.correctAnswer) {
        correct++;
      } else if (answer.userAnswer) {
        incorrect++;
      }
    });

    res.send({ message: "Test yakunlandi", correct, incorrect });
  } catch (error) {
    res.status(500).send({ error: "Natijalarni chiqarishda xatolik" });
  }
};
