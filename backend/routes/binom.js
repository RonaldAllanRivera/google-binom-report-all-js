// backend/routes/binom.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const { fetchBinomReport } = require("../services/binomService");

const router = express.Router();
const uploadedBinomReports = {}; // in-memory

router.post("/sync", async (req, res) => {
  // Accept from body, fallback to query params
  const {
    start_date,
    end_date,
    timezone_value = "America/Atikokan",
    traffic_source_ids = "1,6",
    date_type = "custom-time"
  } = { ...req.body, ...req.query };

  if (!start_date || !end_date) {
    return res.status(400).json({ error: "'start_date' and 'end_date' are required" });
  }

  try {
    const binomRawData = await fetchBinomReport({
      start_date,
      end_date,
      timezone_value,
      traffic_source_ids,
      date_type,
    });

    // Store all the returned JSON, not just campaigns!
    const key = `${start_date}_${end_date}`;
    uploadedBinomReports[key] = binomRawData;

    fs.writeFile(
      path.join(__dirname, "..", "uploads", `binom_${key}.json`),
      JSON.stringify(binomRawData, null, 2),
      (err) => {
        if (err) console.error("Failed to save Binom report JSON:", err);
      }
    );

    // If campaigns or summary data exists, show a preview
    const preview =
      binomRawData.campaigns
        ? binomRawData.campaigns.slice(0, 3)
        : binomRawData.data
        ? binomRawData.data.slice(0, 3)
        : [];

    res.json({
      message: "Binom sync successful",
      start_date,
      end_date,
      count: Array.isArray(preview) ? preview.length : 0,
      sample: preview,
      raw: !!binomRawData ? true : false,
    });
  } catch (err) {
    console.error("Binom sync failed:", err.message);
    res.status(500).json({ error: "Binom sync failed", details: err.message });
  }
});

module.exports = router;
