import mongoose from "../db.js";

const resultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  bestScore: { type: Number, required: true },
  history: [
    {
      score: Number,
      date: { type: Date, default: Date.now },
      time: String,
    },
  ],
});

export default mongoose.model("Result", resultSchema);
