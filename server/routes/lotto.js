import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import { normalize } from "../utils/index.js"; 

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_FILE = path.join(__dirname, "lotteryCache.json");

// Load cache from disk
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

// Async save cache to disk
function saveCache() {
  fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), (err) => {
    if (err) console.error("Cache save failed:", err);
    else console.log("Lottery cache saved to disk.");
  });
}

// Lottery games mapping
const lotteryGames = {
  "Super Lotto Plus": 8,
  "Mega Millions": 15,
  "Powerball": 12,
};

// Fetch a single game
export async function fetchGameData(gameName, gameId) {
  try {
    const key = normalize(gameName);
    const todayPST = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    ).toDateString();

    if (cache[key]?.lastFetchDate === todayPST) {
      console.log(`${gameName} already fetched today. Skipping.`);
      return;
    }

    console.log(`Fetching ${gameName} data...`);
    console.log("API KEY:", process.env.RAPIDAPI_KEY);

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

    cache[key] = {
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
export async function fetchAllGames() {
  for (const [name, id] of queryObjects.entries(lotteryGames)) {
    await fetchGameData(name, id);

    await new Promise((res) => setTimeout(res, 1500));
  }
}


// API route: GET /api/lotto/:game
router.get("/:game", async (req, res) => {
  const gameName = req.params.game;
  const key = normalize(gameName);

  const gameEntry = Object.entries(lotteryGames).find(
    ([name]) => normalize(name) === key
  );

  if (!gameEntry) {
    return res.status(404).json({ error: "Invalid game name" });
  }

  const [realName, gameId] = gameEntry;

  // 🔹 fetchGameData is async, so we need await
  await fetchGameData(realName, gameId);

  const gameData = cache[key];

  if (!gameData) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }

  res.json(gameData.data);
});

export default router;