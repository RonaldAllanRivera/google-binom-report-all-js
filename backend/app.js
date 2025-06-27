// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const binomRoutes = require('./routes/binom'); // <-- modular binom route


const app = express();
const PORT = process.env.PORT || 3001;
const uploadedGoogleAdsReports = {}; // { [filename]: parsedDataArray }

app.use(express.json());

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

  const filePath = req.file.path;
  const fs = require('fs');
  const parse = require('csv-parse').parse;
  const { Transform } = require('stream');

  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) return res.status(500).json({ error: "File read failed" });

    const lines = fileData.split(/\r?\n/);
    const cleaned = lines.slice(2).join('\n'); // skip first 2 lines

    const results = [];

    const filterTransform = new Transform({
      objectMode: true,
      transform(record, encoding, callback) {
        // Remove unwanted columns
        delete record["Customer ID"];
        delete record["Currency code"];

        // Parse cost column
        let cost = record["Cost"] || record["Cost (converted)"] || "0";
        cost = parseFloat(cost.toString().replace(/[^\d.]/g, ""));
        if (!cost) return callback(); // skip if cost is 0

        callback(null, record);
      }
    });

    require('stream').Readable.from(cleaned)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .pipe(filterTransform)
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // Save in memory
        uploadedGoogleAdsReports[req.file.filename] = results;

        // Save to JSON file for persistence
        fs.writeFile(
          path.join(__dirname, 'uploads', req.file.filename + '.json'),
          JSON.stringify(results, null, 2),
          (err) => {
            if (err) console.error("Failed to save parsed JSON:", err);
          }
        );

        // Log for validation
        console.log(
          `[UPLOAD] ${req.file.originalname}: Parsed ${results.length} valid rows. First row:`,
          results[0]
        );

        res.json({
          message: 'File uploaded and filtered successfully',
          filename: req.file.filename,
          originalname: req.file.originalname,
          rowCount: results.length,
          sample: results.slice(0, 3),
        });
      })
      .on('error', (err) => {
        res.status(500).json({ error: "CSV parsing failed", details: err.message });
      });
  });
});


// Modular Binom routes
app.use('/api/binom', binomRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: "OK", time: new Date() });
});

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
