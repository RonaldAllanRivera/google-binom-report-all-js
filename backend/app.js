// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS security
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
if (process.env.NODE_ENV === "development") {
  app.use(cors());
} else {
  app.use(
    cors({
      origin: allowedOrigin,
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
}

const upload = multer({ dest: path.join(__dirname, 'uploads/') });

app.post('/api/google-ads-csv', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    originalname: req.file.originalname,
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: "OK", time: new Date() });
});

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
