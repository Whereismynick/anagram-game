import express from "express";
import cors from "cors";
import "./db.js";

import authRoutes from "./routes/auth.js";
import resultsRoutes from "./routes/results.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Разрешённые источники для CORS
const allowedOrigins = [
  "https://anagram-game-jet.vercel.app", 
  "http://localhost:5173"           
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS: Доступ запрещён"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Проверка работы сервера
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// Роуты
app.use("/", authRoutes);
app.use("/api", resultsRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
