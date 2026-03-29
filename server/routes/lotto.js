import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import { normalize } from "../utils/index.js";

const router = express.Router();

router.get("/:game", async (req,res) => {
  console.log("ROUTE HIT:",req.params.game);
})

// File paths
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

// Save cache (async)
function saveCache() {
  fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), (err) => {
    if (err) console.error("Cache save failed:", err);
    else console.log("Lottery cache saved to disk.");
  });
}

// 🎯 Lottery games mapping
const lotteryGames = {
  "Daily Derby": 11,
  "Daily 3": 9,
  "Daily 4": 14,
  "Fantasy 5": 10,
  "Super Lotto Plus": 8,
  "Mega Millions": 15,
  "Powerball": 12,
};

// ⚡ Optimized lookup map
const normalizedGameMap = Object.fromEntries(
  Object.entries(lotteryGames).map(([name, id]) => [
    normalize(name),
    { name, id },
  ])
);

// Fetch a single game
export async function fetchGameData(gameName, gameId) {
  try {
    const key = normalize(gameName);

    const todayPST = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      })
    ).toDateString();

    // Skip if already fetched today
    if (cache[key]?.lastFetchDate === todayPST) {
      console.log(`${gameName} already fetched today. Skipping.`);
      return;
    }

    console.log(`Fetching ${gameName}...`);

    const options = {
      method: "GET",
      url: `https://ca-lottery.p.rapidapi.com/DrawGamesPastDrawResults/${gameId}/1/20`,
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "ca-lottery.p.rapidapi.com",
      },
      params: { DrawGame: gameName },
    };

    const response = await axios.request(options);

    cache[key] = {
      data: response.data,
      lastFetchDate: todayPST,
    };

    saveCache();

    console.log(`${gameName} updated.`);
  } catch (error) {
    console.error(
      `API ERROR for ${gameName}:`,
      error.response?.data || error.message
    );
  }
}

// Fetch all games (with delay to avoid rate limit)
export async function fetchAllGames() {
  for (const [name, id] of Object.entries(lotteryGames)) {
    await fetchGameData(name, id);

    // ⏱ delay to prevent "Too many requests"
    await new Promise((res) => setTimeout(res, 1500));
  }
}

// 🚀 API route: GET /api/lotto/:game
router.get("/:game", async (req, res) => {
  const key = normalize(req.params.game);

  const game = normalizedGameMap[key];

  if (!game) {
    return res.status(404).json({ error: "Invalid game name" });
  }

  console.log("Matched Game:", game.name, "ID:", game.id);

  await fetchGameData(game.name, game.id);

  const gameData = cache[key];

  if (!gameData) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }

  res.json(gameData.data);
});

export default router;