import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config.js";
import Joi from "joi";

const router = express.Router();

// Joi-схема для регистрации
const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "Имя пользователя должно быть строкой",
      "string.empty": "Имя пользователя не может быть пустым",
      "string.min": "Имя пользователя должно быть минимум 3 символа",
      "string.max": "Имя пользователя должно быть максимум 30 символов",
      "string.alphanum": "Имя пользователя может содержать только буквы и цифры",
      "any.required": "Имя пользователя обязательно"
    }),
  password: Joi.string()
    .min(6)
    .max(50)
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+=-]+$"))
    .required()
    .messages({
      "string.base": "Пароль должен быть строкой",
      "string.empty": "Пароль не может быть пустым",
      "string.min": "Пароль должен быть минимум 6 символов",
      "string.max": "Пароль должен быть максимум 50 символов",
      "string.pattern.base": "Пароль содержит недопустимые символы",
      "any.required": "Пароль обязателен"
    })
});

// Регистрация
router.post("/register", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = value;

  try {
  console.log("REGISTER BODY:", req.body);

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    console.log("Пользователь уже есть");
    return res.status(400).json({ message: "Пользователь уже существует" });
  }

  const newUser = new User({ username, password });
  console.log("Перед save:", newUser);

  await newUser.save();
  console.log("После save:", newUser);

  const token = jwt.sign(
    { id: newUser._id, username: newUser.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(201).json({ username: newUser.username, token });
} catch (err) {
  console.error("REGISTER ERROR:", err);
  res.status(500).json({ message: "Ошибка сервера", error: err.message });
}
});

// Логин с валидацией
router.post("/login", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = value;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Пользователь не найден" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Неверный пароль" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Успешный вход", username: user.username, token });
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера", error: err.message });
  }
});

export default router;
