import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import lottoRoutes, { fetchAllGames } from "./routes/lotto.js";

console.log("fetchAllGames:", fetchAllGames);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/lotto", lottoRoutes);
console.log("Routes loaded")

app.get("/", (req, res) => {
  res.send("CALotto API running");
});

app.listen(5000, async() => {
  console.log("Server running on port 5000");
  await fetchAllGames();
  console.log("✅ Lottery cache ready")
});