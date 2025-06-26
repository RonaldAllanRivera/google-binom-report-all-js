# Google Ads + Binom Report Automation System

**Automated campaign reporting made easy. CSV + API powered. Built with Express.js, Next.js, and React Admin.**

---

## 🚀 Project Overview

This system automates the process of merging Google Ads campaign data (CSV upload) and Binom tracking data (API), allowing for fast, reliable reporting and data analysis. It replaces time-consuming manual workflows with a modern admin dashboard, and supports future extensions like Google Sheets export and automated emails.

---

## ✨ Features

- **Admin Dashboard:** Powered by React Admin in Next.js for secure, modern management.
- **Google Ads CSV Upload:** Simple upload interface for campaign reports.
- **Binom API Integration:** Automated campaign data retrieval (date-range, summary, etc.).
- **Data Parsing & Matching:** Clean backend logic matches campaigns, calculates KPIs (ROI, Profit/Loss, etc.).
- **Merged Reporting Table:** Interactive reports — sortable, filterable, exportable.
- **Extensible:** Ready for Google Sheets and email automation.
- **Modern Dev Stack:** Built using best practices with `.env` config and clean, scalable code.
- **Easy Local Setup:** Get running in minutes for demo or production.

---

## 🛠️ Tech Stack

| Layer     | Technology                             |
|-----------|----------------------------------------|
| Frontend  | Next.js (React), React Admin, TailwindCSS |
| Backend   | Express.js (Node.js), dotenv           |
| API       | Binom API (REST, API Key)              |
| Storage   | In-memory/JSON (MVP) or PostgreSQL     |
| Auth      | Google OAuth2 (NextAuth.js) *(optional)* |
| Parsing   | csv-parse (Node.js), axios/fetch       |
| Deployment| Vercel (frontend), Render (backend)    |

---

## 📦 Project Structure

```
google-binom-report-system/
  backend/
    app.js
    routes/
    controllers/
    services/
    config/
    .env.example
  frontend/
    pages/
    components/
    .env.local.example
    tailwind.config.js
  README.md
  CHANGELOG.md
```

---

## ⚡ Quickstart

### 1. **Clone the repo**
```bash
git clone https://github.com/yourusername/google-binom-report-system.git
cd google-binom-report-system
```

### 2. **Backend Setup**
```bash
cd backend
cp .env.example .env   # Add your Binom API key and URL here
npm install
node app.js
# Backend runs at http://localhost:3001
```

### 3. **Frontend Setup**
```bash
cd ../frontend
cp .env.local.example .env.local
npm install
npm run dev
# Frontend runs at http://localhost:3000
```

---

## 🔑 Environment Variables

> **Never commit real .env files. Use the provided example files!**

**backend/.env.example**
```env
PORT=3001
BINOM_API_KEY=your-binom-api-key
BINOM_API_URL=https://your-binom-url/api.php
```

**frontend/.env.local.example**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

---

## 📋 Core Admin Features

- **Login:** (Optional) Google OAuth2 for secure access
- **Google Ads CSV Upload:** File input, preview, and storage
- **Binom Sync:** Date-range picker, fetch campaigns/leads/revenue
- **Reports:** View and filter all source and merged data
- **Export/Email:** Ready for extension (Sheets, Gmail API)

---

## 🧠 Data Matching Logic

- Google Ads Campaign ID matched to Binom Campaign (via substring regex).
- All calculations (PL, ROI, etc.) computed server-side.

---

## 💡 Planned Improvements

- Export to Google Sheets
- Email report summary (HTML table)
- Scheduler for daily/weekly/monthly automation
- Persistent DB (PostgreSQL)
- Multi-user support

---

## 🖼️ Screenshots

> *(Add your screenshots after initial MVP demo)*

---


## 📜 License

[MIT](LICENSE)

---

## 🚩 Status

**Phase 1: MVP in progress (local setup).  
Phase 2: GitHub release, demo, and automation features coming soon!**
