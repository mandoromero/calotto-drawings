import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import lottoRoutes from "./routes/lotto.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// All lottery games
app.use("/api/lotto", lottoRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("CALotto API running");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});