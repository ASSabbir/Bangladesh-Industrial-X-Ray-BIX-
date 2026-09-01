# Bangladesh Industrial X-Ray (BIX) — Corporate Website

A full-stack MERN (MongoDB, Express, React, Node.js) corporate website built to the project SRS:
a hybrid static/dynamic site with a secured single-admin panel for managing Services, Equipment,
Gallery, Previous Projects and Training — cross-linked via MongoDB references, with real image
upload support (not just URL text fields).

```
bix-website/
├── backend/     Express + MongoDB API, JWT auth, image upload, seed data
└── frontend/    React (Vite) + Tailwind CSS v4 site + admin panel
```

## 1. Prerequisites

- **Node.js** v18+ (v20/22 recommended) — https://nodejs.org
- **MongoDB** — either:
  - a local install (https://www.mongodb.com/try/download/community), or
  - a free MongoDB Atlas cluster (https://www.mongodb.com/cloud/atlas) — grab the connection string

## 2. Backend setup

```bash
cd backend
npm install
```

A working `.env` is already included with local development defaults — you don't have to create
one to get started:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bix_website
JWT_SECRET=bix_dev_secret_change_this_before_going_live_...
ADMIN_EMAIL=admin@bixndt.com
ADMIN_PASSWORD=ChangeMe123!
CLIENT_URL=http://localhost:5173
```

**Change `JWT_SECRET` and `ADMIN_PASSWORD` before deploying anywhere public.**

Make sure MongoDB is running locally (or swap `MONGO_URI` for your Atlas connection string), then
seed the database with real BIX content (services, equipment, projects, gallery, training, and
the admin account):

```bash
npm run seed
```

Start the API:

```bash
npm run dev      # with nodemon (auto-restart)
```

The API runs at `https://bix-omega.vercel.app/api`. Uploaded images are served from
`https://bix-omega.vercel.app/uploads/...`.

## 3. Frontend setup

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`. A working `.env` (`VITE_API_URL=https://bix-omega.vercel.app/api`) is
already included.

## 4. Log in to the admin panel

Go to `http://localhost:5173/admin/login` and sign in with:

```
Email:    admin@bixndt.com
Password: ChangeMe123!
```

(these are the `ADMIN_EMAIL` / `ADMIN_PASSWORD` values from `backend/.env` — change both there
before deploying publicly, then re-run `npm run seed`).

From the dashboard you can create, edit, publish/unpublish and delete:
- Services
- Equipment
- Gallery items
- Previous Projects
- Training programs

## 5. Uploading images

Every image field in the admin panel is a real upload button — click it, your OS file picker
opens, pick an image, it uploads automatically and shows a preview. No URLs to type. Supported:
JPG, PNG, WEBP, GIF, SVG, up to 5MB per file. Files are stored in `backend/uploads/` and served
back at `/uploads/<filename>` — this folder is git-ignored by default (only its structure is
kept) so re-cloning the repo won't wipe real uploads, but a fresh clone starts with an empty
`uploads/` folder.

## 6. Production build

```bash
cd frontend
npm run build      # outputs static files to frontend/dist
```

Set `NODE_ENV=production` in `backend/.env` and the backend will automatically serve the built
frontend from `frontend/dist` on the same domain — no separate frontend host needed. See the
deployment notes below for VPS/cPanel specifics.

## 7. Deploying to a VPS or cPanel

Both work fine — Multer's disk-based image storage persists normally on either (unlike
ephemeral-container hosts). Two things to set up either way:

- **VPS**: Nginx reverse-proxying to the Node process (PM2-managed), with
  `client_max_body_size 10M;` in the Nginx config so uploads aren't rejected.
- **cPanel**: Use "Setup Node.js App" pointing at `backend/server.js` as the entry file, add a
  `LimitRequestBody 10485760` line to `backend/.htaccess` to raise Apache's upload cap, and build
  the frontend (`npm run build` in `frontend/`) so `backend/server.js` can serve it in production
  mode.

In both cases, set `NODE_ENV=production`, a real `MONGO_URI` (Atlas is easiest), a strong
`JWT_SECRET`, and `CLIENT_URL`/`VITE_API_URL` matching your real domain before going live.

## 8. What's implemented

- **Public site**: Home, About, Services (list + detail), Equipment (list + detail),
  Certifications, Gallery (with lightbox), Previous Projects, Training, Partners, Testimonials,
  Contact (working form → backend endpoint), plus custom 404 / 403 / 500 / Maintenance pages.
- **Admin panel**: JWT-secured login at `/admin/login`, dashboard with live counts, full
  Create/Read/Update/Delete for all 5 dynamic collections, with a real click-to-upload image
  system (single image and multi-image variants) — not text-URL fields.
- **Backend**: REST API with Mongoose models mirroring the SRS's relational design (Services ↔
  Equipment ↔ Gallery ↔ Projects via ObjectId references), JWT auth middleware, Multer-based
  image upload with type/size validation, rate limiting, Helmet security headers, centralized
  error handling.
- **Seed data**: real content pulled from the BIX company brochure (services, equipment specs,
  project history, certifications, contact details).

## 9. Full file structure

```
bix-website/
├── backend/
│   ├── .env                    ← working local config, already filled in
│   ├── server.js
│   ├── config/db.js
│   ├── middleware/
│   │   ├── auth.js             JWT verification
│   │   ├── errorHandler.js
│   │   └── upload.js           Multer config (image validation, 5MB limit)
│   ├── models/                 Admin, Service, Equipment, Gallery, Project, Training
│   ├── routes/
│   │   ├── auth.js  services.js  equipment.js  gallery.js  projects.js  training.js
│   │   ├── contact.js
│   │   └── upload.js           POST /api/upload, /api/upload/multiple
│   ├── seed/                   seed.js + seedData.js (real BIX brochure content)
│   └── uploads/                uploaded image files land here
│
└── frontend/
    ├── .env                    ← working local config, already filled in
    ├── vite.config.js          Tailwind v4 plugin, /api and /uploads dev proxies
    └── src/
        ├── api/                 axios.js, uploadImage.js
        ├── context/             AuthContext.jsx
        ├── components/          shared public-site components incl. PageImage.jsx
        ├── pages/                all 17 public pages
        └── admin/
            ├── AdminLogin.jsx  AdminLayout.jsx  AdminDashboard.jsx
            ├── Manage{Services,Equipment,Gallery,Projects,Training}.jsx
            └── components/
                ├── ResourceManager.jsx      generic CRUD table + modal form
                ├── FormField.jsx            field-type dispatcher (kind-based)
                ├── ImageUploadField.jsx     single image upload button
                └── ImageListUploadField.jsx multi image upload button
```

## 10. Notes

- This project was generated without network access, so `node_modules` are **not** included —
  run `npm install` in both `backend/` and `frontend/` before first run.
- If you ever see an image upload field render as a plain empty box instead of an "Upload Image"
  button, it means a file got placed in the wrong folder — check section 9 above against your
  actual folders. Every admin-only helper (`FormField.jsx`, `ImageUploadField.jsx`,
  `ImageListUploadField.jsx`, `ResourceManager.jsx`) belongs in
  `frontend/src/admin/components/`, and `PageImage.jsx` belongs in `frontend/src/components/`
  (not inside `admin/`).
