// backend/services/binomService.js
const axios = require("axios");

const BINOM_API_URL = process.env.BINOM_API_URL;
const BINOM_API_KEY = process.env.BINOM_API_KEY;

/**
 * Fetch Binom report with full params
 * @param {object} opts
 * @param {string} opts.start_date (YYYY-MM-DD)
 * @param {string} opts.end_date (YYYY-MM-DD)
 * @param {string} [opts.timezone_value]
 * @param {string} [opts.traffic_source_ids]
 * @param {string} [opts.date_type]
 */
async function fetchBinomReport({
  start_date,
  end_date,
  timezone_value = "America/Atikokan",
  traffic_source_ids = "1,6",
  date_type = "custom-time",
}) {
  if (!start_date || !end_date) throw new Error("'start_date' and 'end_date' are required");

  const date_from = `${start_date} 00:00:00`;
  const date_to = `${end_date} 23:59:59`;

  const params = [
    ['datePreset', 'custom_time'],
    ['dateType', date_type],
    ['dateFrom', date_from],
    ['dateTo', date_to],
    ['timezone', timezone_value]
  ];

  // trafficSourceIds[] as array params
  if (traffic_source_ids && traffic_source_ids.split) {
    traffic_source_ids.split(',').forEach(id => {
      if (id.trim()) params.push(['trafficSourceIds[]', id.trim()]);
    });
  } else if (traffic_source_ids) {
    params.push(['trafficSourceIds[]', String(traffic_source_ids).trim()]);
  }

  const qs = new URLSearchParams(params).toString();
  const url = `${BINOM_API_URL}?${qs}`;
  const headers = {
    "Api-Key": BINOM_API_KEY,
    "cache-control": "no-cache"
  };

  const response = await axios.get(url, { headers });
  // You might want to adjust which key you use here!
  return response.data;
}

module.exports = { fetchBinomReport };
