import express from "express";
import axios from "axios";

const router = express.Router();

let cachedData = null;

async function fetchLotteryData() {
  try {
    console.log("Fetching latest lottery data...");
    const options = {
      method: "GET",
      url: "https://ca-lottery.p.rapidapi.com/DrawGamesPastDrawResults/8/1/20",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "ca-lottery.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(options);
    cachedData = response.data;
    console.log("Lottery data updated successfully.");
  } catch (error) {
    console.error("API ERROR:", error.message);
  }
}

function scheduleDailyFetch() {
  const now = new Date();
  const nextFetch = new Date();
  nextFetch.setHours(20, 15, 0, 0); // 20:15:00

  if (now > nextFetch) {
  nextFetch.setDate(nextFetch.getDate() + 1);
  }

  const msUntilNextFetch = nextFetch - now;
  console.log(`Next lottery fetch scheduled in ${Math.round(msUntilFirstFetch / 1000 / 60)} minutes`);

  setTimeout(() => {
    fetchLotteryData();
    setInterval(fetchLotteryData, 24 * 60 * 60 * 1000);
  }, msUntilNextFetch);
}

fetchLotteryData()

scheduleDailyFetch();

router.get("/superlotto", (req, res) => {
  if (!cachedData) {
    return res.status(503).json({ error: "Lottery data not available yet. Try again later." });
  }
  res.json(cachedData);
});

export default router;