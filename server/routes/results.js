import express from "express";
import Result from "../models/Result.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Joi from "joi";

const router = express.Router();

// Joi-схема для результатов
const resultSchema = Joi.object({
  score: Joi.number().integer().min(0).required(),
  time: Joi.string().allow("", null)
});

// POST /api/results — сохранение результата
router.post("/results", authMiddleware, async (req, res) => {
  const { error, value } = resultSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { score, time } = value;
  const username = req.user.username;

  try {
    const newEntry = {
      score,
      time: time || "-",
      date: new Date()
    };

    let userResult = await Result.findOne({ username });

    if (!userResult) {
      userResult = await Result.create({
        username,
        bestScore: score,
        history: [newEntry],
      });
    } else {
      if (score > userResult.bestScore) userResult.bestScore = score;
      userResult.history = userResult.history || [];
      userResult.history.unshift(newEntry);
      if (userResult.history.length > 50) userResult.history.pop();

      await userResult.save();
    }

    res.json({ success: true, bestScore: userResult.bestScore });
  } catch (err) {
    console.error("Ошибка сохранения результата:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.get("/results/top", async (req, res) => {
  try {
    const topResults = await Result.find()
      .sort({ bestScore: -1 })
      .limit(20);

    res.json(topResults);
  } catch (err) {
    console.error("Ошибка получения топа:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

export default router;
