// ================================
// 🏯 DYNASTY JACKPOT BACKEND SERVER
// ================================

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();


// === MIDDLEWARE ===
app.use(express.json());
app.use(express.static("public")); // Serves index.html, etc.

// === TIMER STATE (shared across users) ===
const TIMER_FILE = path.join(__dirname, "public", "timers.json");

// Ensure timers.json exists
if (!fs.existsSync(TIMER_FILE)) {
  const defaultTimers = {
    "Mini Makis": { startedAt: Date.now() },
    "Lucky Rollers": { startedAt: Date.now() },
    "High Emperors (Mega)": { startedAt: Date.now() },
    "High Emperors (Mega 2)": { startedAt: Date.now() },
  };
  fs.writeFileSync(TIMER_FILE, JSON.stringify(defaultTimers, null, 2));
}



// === CONSTANTS ===
const WINNERS_FILE = path.join(__dirname, "public", "winner.json");
const DEV_KEY = process.env.DEV_KEY || "your";

// === Ensure winners.json exists ===
if (!fs.existsSync(WINNERS_FILE)) {
  fs.writeFileSync(WINNERS_FILE, JSON.stringify([], null, 2));
  console.log("🆕 Created empty winners.json file");
}


// === GET current timers ===
app.get("/api/timers", (req, res) => {
  try {
    const timers = JSON.parse(fs.readFileSync(TIMER_FILE, "utf8"));
    res.json(timers);
  } catch (err) {
    console.error("❌ Failed to load timers:", err);
    res.status(500).json({ error: "Failed to load timers" });
  }
});

// === POST: reset/start timer for a tier ===
app.post("/api/reset-timer", (req, res) => {
  const { tier, key } = req.body;
  if (key !== DEV_KEY) return res.status(403).json({ error: "Invalid key" });

  try {
    const timers = JSON.parse(fs.readFileSync(TIMER_FILE, "utf8"));
    timers[tier] = { startedAt: Date.now() };
    fs.writeFileSync(TIMER_FILE, JSON.stringify(timers, null, 2));
    console.log(`⏱️ Reset timer for ${tier}`);
    res.json({ success: true, tier, startedAt: timers[tier].startedAt });
  } catch (err) {
    console.error("❌ Error resetting timer:", err);
    res.status(500).json({ error: "Failed to reset timer" });
  }
});


// === GET all winners ===
app.get("/api/winners", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(WINNERS_FILE, "utf8"));
    res.json(data);
  } catch (err) {
    console.error("❌ Error reading winners.json:", err);
    res.status(500).json({ error: "Failed to load winners" });
  }
});

// Return only recent (3 per tier) for homepage
app.get("/api/recent-winners", (req, res) => {
  try {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "public", "recent-winners.json"), "utf8")
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load recent winners" });
  }
});


// === DEV endpoint: return current key (optional use) ===
app.get("/api/dev-key", (req, res) => {
  res.json({ key: DEV_KEY });
});

// === POST: add a new global winner entry ===
app.post("/api/update-winner", (req, res) => {
  const { tier, wallet, vrf, amount, txid, key } = req.body;

  if (key !== DEV_KEY) {
    console.log("🚫 Invalid Dev Key attempt");
    return res.status(403).json({ success: false, error: "Invalid key" });
  }

  if (!tier || !wallet || !amount) {
    return res.status(400).json({ success: false, error: "Missing data" });
  }

  try {
    // --- Read existing data ---
    let winners = [];
    try {
      winners = JSON.parse(fs.readFileSync(WINNERS_FILE, "utf8"));
      if (!Array.isArray(winners)) winners = [];
    } catch {
      winners = [];
    }

    // --- Prevent duplicate entries ---
    const duplicate = winners.find(
      w =>
        w.tier === tier &&
        (w.txid === txid || w.wallet.toLowerCase() === wallet.toLowerCase())
    );

    if (duplicate) {
      console.warn(`⚠️ Duplicate winner skipped for ${tier} (${wallet})`);
      return res.json({ success: false, error: "Duplicate winner skipped" });
    }

    // --- Create new entry ---
    const newWinner = {
      tier,
      wallet,
      vrf: vrf || "—",
      amount,
      txid: txid || "—",
      date: new Date().toISOString(),
    };

    // --- Append and sort ---
    winners.push(newWinner);
    winners.sort((a, b) => new Date(b.date) - new Date(a.date));

    // --- Save full history (for VRF page) ---
    fs.writeFileSync(WINNERS_FILE, JSON.stringify(winners, null, 2));

    // --- Create a "recent" trimmed version (3 per tier) ---
    const recent = {};
    for (const w of winners) {
      const key = w.tier.toLowerCase();
      if (!recent[key]) recent[key] = [];
      if (recent[key].length < 3) recent[key].push(w);
    }

    const recentList = Object.values(recent).flat();
    fs.writeFileSync(
      path.join(__dirname, "public", "recent-winners.json"),
      JSON.stringify(recentList, null, 2)
    );

    console.log(`✅ Added ${tier} winner: ${wallet}`);
    res.json({ success: true, updated: newWinner });
  } catch (err) {
    console.error("❌ Error updating winners.json:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});


// === POST: sync winner (called by syncWinners in script.js) ===
// === POST: sync winner safely ===
app.post("/api/winners", (req, res) => {
  try {
    const newWinner = req.body;
    const tier = newWinner.tier || newWinner.pool;

    if (!tier) return res.status(400).json({ error: "Missing tier/pool field" });

    let winners = [];
    try {
      winners = JSON.parse(fs.readFileSync(WINNERS_FILE, "utf8"));
      if (!Array.isArray(winners)) winners = [];
    } catch {
      winners = [];
    }

    // Remove same-tier duplicates
    winners = winners.filter(w => w.tier !== tier && w.pool !== tier);

    winners.unshift({
      ...newWinner,
      date: newWinner.date || new Date().toISOString(),
    });

    fs.writeFileSync(WINNERS_FILE, JSON.stringify(winners, null, 2));
    console.log(`✅ Synced ${tier}`);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error syncing winner:", err);
    res.status(500).json({ error: "Server error syncing winner" });
  }
});

// === POST: Reset ALL timers (RT) ===
app.post("/api/reset-all-timers", (req, res) => {
  const { key } = req.body;
  if (key !== DEV_KEY) return res.status(403).json({ error: "Invalid key" });

  try {
    const now = Date.now();
    const resetTimers = {
      "Mini Makis": { startedAt: now },
      "Lucky Rollers": { startedAt: now },
      "High Emperors (Mega)": { startedAt: now },
      "High Emperors (Mega 2)": { startedAt: now },
    };

    fs.writeFileSync(TIMER_FILE, JSON.stringify(resetTimers, null, 2));
    console.log("♻️ All timers reset globally");
    res.json({ success: true, startedAt: now });
  } catch (err) {
    console.error("❌ Failed to reset all timers:", err);
    res.status(500).json({ error: "Failed to reset all timers" });
  }
});

// === GLOBAL CONTRACT ADDRESS STORE ===
const CONTRACT_FILE = path.join(__dirname, "public", "contract.json");

// Ensure it exists
if (!fs.existsSync(CONTRACT_FILE)) {
  fs.writeFileSync(CONTRACT_FILE, JSON.stringify({ address: "" }, null, 2));
}

// Get contract address
app.get("/api/contract", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(CONTRACT_FILE, "utf8"));
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to load contract address" });
  }
});

// Update contract address (requires dev key)
app.post("/api/update-contract", (req, res) => {
  const { address, key } = req.body;
  if (key !== process.env.DEV_KEY) {
    return res.status(403).json({ success: false, error: "Invalid dev key" });
  }

  if (!address || !address.startsWith("0x") || address.length !== 42) {
    return res.status(400).json({ success: false, error: "Invalid contract address format" });
  }

  fs.writeFileSync(CONTRACT_FILE, JSON.stringify({ address }, null, 2));
  console.log(`🪙 Updated global contract address: ${address}`);
  res.json({ success: true });
});


// === FALLBACK: 404 handler ===
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

// === START SERVER ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Dynasty Jackpot server running on port ${PORT}`));

