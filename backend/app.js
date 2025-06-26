// backend/app.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const multer = require('multer');
const path = require('path');


const upload = multer({
  dest: path.join(__dirname, 'uploads/'),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

app.post('/api/google-ads-csv', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // TODO: parse the CSV and return a preview (add this tomorrow)
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
