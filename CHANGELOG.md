## Day 6
- Enhanced backend security: CORS now allows all origins only in development.
- Production CORS now restricts to origin set in `.env` (`FRONTEND_ORIGIN`).
- Implementation is environment-aware for safer deployment.

## Day 5
- Improved React Admin UI: added Material UI AppBar (top menu) and sidebar navigation.
- Sidebar menu now shows icons for "Posts" and "Google Ads Upload" using Material UI icons.
- Cleaned up unused imports for a more maintainable codebase.
- Verified responsive layout and navigation are working.
- Improved Google Ads CSV upload UI:
  - Added live preview of uploaded/parsed data with styled code block.
  - Reset file input after upload.
  - Displayed a Material UI spinner while uploading.
- Enhanced UX for admins during CSV upload process.

## Day 4
- Installed Multer for file upload handling in backend.
- Implemented `/api/google-ads-csv` POST endpoint to accept file uploads.
- Successfully tested upload with Postman; received and stored file with response.
- Enhanced Google Ads CSV upload endpoint to parse and filter uploaded files.
- Now skips first 2 rows, removes "Customer ID" and "Currency code" columns, and ignores rows where cost is zero.
- Returns row count and sample preview in API response.
- Stores parsed CSV data in-memory and as a .json file after each upload.
- Backend logs the row count and a sample record for every new Google Ads upload.
- Validated functionality with live uploads and file inspection.

## Day 3
- Refactored React Admin panel to a dedicated component (`components/AdminPanel.js`).
- Updated `/admin` page to use dynamic import for `AdminPanel` with SSR disabled.
- Improved code modularity and future scalability.

## Day 2
- Backend Express server running on port 3001.
- Implemented `/api/health` endpoint (returns JSON status).
- Verified backend and frontend both start/run successfully.
- TailwindCSS confirmed working on frontend; not needed for backend.

## Day 1
- Project scaffolded with Express backend and Next.js frontend.
- .env and .gitignore files created for both apps.
- Backend/Frontend folder structures organized.
