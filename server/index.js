import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import resultsRoutes from "./routes/results.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/api", resultsRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
