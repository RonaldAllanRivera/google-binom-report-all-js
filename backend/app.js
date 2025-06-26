// backend/app.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/health', (req, res) => {
  res.json({ status: "OK", time: new Date() });
});

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
