// fixAllVrfUrls.js
const fs = require("fs");
const path = require("path");

const domain = "https://dynastyjackpot.asia";

const files = [
  path.join(__dirname, "public", "winner.json"),
  path.join(__dirname, "public", "recent-winners.json"),
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.warn(`⚠️ File not found: ${file}`);
    continue;
  }

  let data = JSON.parse(fs.readFileSync(file, "utf8"));
  let changed = false;

  if (Array.isArray(data)) {
    data = data.map(w => {
      if (w.vrf && w.vrf.includes("http://localhost:3000")) {
        w.vrf = w.vrf.replace("http://localhost:3000", domain);
        changed = true;
      }
      return w;
    });
  }

  if (changed) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log(`✅ Fixed VRF URLs in: ${path.basename(file)}`);
  } else {
    console.log(`ℹ️ No localhost URLs found in: ${path.basename(file)}`);
  }
}

console.log("🎯 All done!");
