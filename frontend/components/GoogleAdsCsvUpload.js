import { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function GoogleAdsCsvUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/google-ads-csv`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResponse(res.data);
      setFile(null); // Reset file input after success
    } catch (err) {
      console.error("Upload error:", err);
      setResponse({ error: err?.response?.data?.error || "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "2rem auto", padding: "2rem" }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom color="primary">
          Upload Google Ads CSV
        </Typography>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          value={file ? undefined : ""}
          style={{ display: "block", margin: "1rem 0" }}
        />

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{
            padding: "10px 20px",
            backgroundColor: uploading || !file ? "#ccc" : "#6d28d9",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: uploading || !file ? "not-allowed" : "pointer",
            position: "relative"
          }}
        >
          {uploading ? <CircularProgress size={20} color="inherit" /> : "Upload"}
        </button>

        {response && (
          <Typography
            variant="body2"
            align="center"
            sx={{ marginTop: "1rem" }}
            color={response.error ? "error" : "success.main"}
          >
            {response.error
              ? response.error
              : `✅ Uploaded: ${response.originalname} | Rows: ${response.rowCount}`}
          </Typography>
        )}

        {/* Preview Sample */}
        {response && response.sample && Array.isArray(response.sample) && (
          <pre
            style={{
              background: "#1f2937", // Tailwind's gray-800
              color: "#e5e7eb",       // Tailwind's gray-200
              marginTop: 12,
              padding: 10,
              borderRadius: 6,
              fontSize: 12,
              overflow: "auto",
              maxHeight: 300,
            }}
          >
            {JSON.stringify(response.sample, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}
