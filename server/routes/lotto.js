import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { setTimeout } from "timers";

const router = express.Router();

// Folder/file for persistent cache
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_FILE = path.join(__dirname, "lotteryCache.json");

// Load cache from disk if exists
let cache = {};
try {
  if (fs.existsSync(CACHE_FILE)) {
    const data = fs.readFileSync(CACHE_FILE, "utf8");
    cache = JSON.parse(data);
    console.log("Loaded lottery cache from disk.");
  }
} catch (err) {
  console.error("Failed to read cache from disk:", err.message);
}

// Lottery games to fetch
const lotteryGames = {
  "Super Lotto Plus": 8,
  "Mega Millions": 9,
  "Powerball": 10,
};

// Helper: Save cache to disk
function saveCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  console.log("Lottery cache saved to disk.");
}

// Fetch a single game
async function fetchGameData(gameName, gameId) {
  try {
    const todayPST = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })).toDateString();

    // Skip if already fetched today
    if (cache[gameName]?.lastFetchDate === todayPST) {
      console.log(`${gameName} already fetched today. Skipping.`);
      return;
    }

    console.log(`Fetching ${gameName} data...`);
    const options = {
      method: "GET",
      url: `https://ca-lottery.p.rapidapi.com/DrawGamesPastDrawResults/${gameId}/1/20`,
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "ca-lottery.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      params: { DrawGame: gameName },
    };

    const response = await axios.request(options);
    cache[gameName] = {
      data: response.data,
      lastFetchDate: todayPST,
    };
    saveCache();
    console.log(`${gameName} data updated successfully.`);
  } catch (error) {
    console.error(`API ERROR for ${gameName}:`, error.response?.data || error.message);
  }
}

// Fetch all games
async function fetchAllGames() {
  for (const [gameName, gameId] of Object.entries(lotteryGames)) {
    await fetchGameData(gameName, gameId);
  }
}

// Schedule daily fetch at 8:15 PM PST
function scheduleDailyFetch() {
  const now = new Date();
  const nowPST = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));

  const nextFetch = new Date(nowPST);
  nextFetch.setHours(20, 15, 0, 0); // 8:15 PM PST today

  if (nowPST > nextFetch) {
    nextFetch.setDate(nextFetch.getDate() + 1);
  }

  const msUntilNextFetch = nextFetch - nowPST;
  console.log(`Next lottery fetch scheduled in ${Math.round(msUntilNextFetch / 1000 / 60)} minutes.`);

  setTimeout(() => {
    fetchAllGames();
    setInterval(fetchAllGames, 24 * 60 * 60 * 1000); // repeat every 24h
  }, msUntilNextFetch);
}

// Initial fetch (fetch only if data is outdated)
fetchAllGames();
scheduleDailyFetch();

// Route: GET /api/lotto/:game
router.get("/:game", (req, res) => {
  const gameName = req.params.game;
  const gameData = cache[gameName];

  if (!gameData) {
    return res.status(404).json({ error: `Data for ${gameName} not found.` });
  }

  res.json(gameData.data);
});

export default router;