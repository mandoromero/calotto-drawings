import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import lottoRoutes from "./routes/lotto.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/lotto", lottoRoutes);
console.log("Routes loaded")

app.get("/", (req, res) => {
  res.send("CALotto API running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});