import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/superlotto", async (req, res) => {
  try {
    const response = await axios.get(
      "https://ca-lottery.p.rapidapi.com/DrawGamePastDrawResults/8/1/20",
      {
        headers: {
          "x-rapidapi-host": "ca-lottery.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("API ERROR:", error.message);
    res.status(500).json({ error: "Failed to fetch lottery data" });
  }
});

export default router;