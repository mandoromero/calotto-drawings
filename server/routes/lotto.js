import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------
// Load JSON data
// ---------------------------
const DATA_DIR = path.join(__dirname, "../data");
const DERBY_JSON = path.join(DATA_DIR, "dailyDerbyHistory.json");
const MEGA_JSON = path.join(DATA_DIR, "megaMillionsHistory.json");
const POWERBALL_JSON = path.join(DATA_DIR, "powerballHistory.json");
const SUPER_JSON = path.join(DATA_DIR, "superLottoPlusHistory.json");

let derbyHistory = [];
let megaHistory = [];
let powerballHistory = [];
let superLottoHistory = [];

try {
  console.log(`✅ Daily Derby loaded: ${derbyHistory.length}`);
} catch (err) {
  console.err("❌ Daily Derby ;oad failed:", err.message);
}

try {
  megaHistory = JSON.parse(fs.readFileSync(MEGA_JSON, "utf8"));
  console.log(`✅ Mega Millions history loaded: ${megaHistory.length} draws`);
} catch (err) {
  console.error("❌ Failed to load Mega Millions history:", err.message);
}

try {
  powerballHistory = JSON.parse(fs.readFileSync(POWERBALL_JSON, "utf8"));
  console.log(`✅ Powerball history loaded: ${powerballHistory.length} draws`);
} catch (err) {
  console.error("❌ Failed to load Powerball history:", err.message);
}

try {
  superLottoHistory = JSON.parse(fs.readFileSync(SUPER_JSON, "utf8"));
  console.log(`✅ Super Lotto Plus history loaded: ${superLottoHistory.length} draws`);
} catch (err) {
  console.error("❌ Failed to load Super Lotto Plus history:", err.message);
}

// ---------------------------
// Routes
// ---------------------------
router.get("/mega-millions", (req, res) => {
  if (!megaHistory.length) return res.status(500).json({ error: "Mega Millions data not available" });
  res.json(megaHistory);
});

router.get("/powerball", (req, res) => {
  if (!powerballHistory.length) return res.status(500).json({ error: "Powerball data not available" });
  res.json(powerballHistory);
});

router.get("/super-lotto-plus", (req, res) => {
  if (!superLottoHistory.length) return res.status(500).json({ error: "Super Lotto Plus data not available" });
  res.json(superLottoHistory);
});

export default router;