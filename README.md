# Assignment & Review Dashboard (Joineazy Frontend Task)
A responsive, role‑based dashboard for managing student assignments. Students can view assigned work and confirm submissions via a two‑step dialog, while admins create assignments with Drive links and track per‑student progress in real time.​

## Features
Role‑based UI: Admin vs Student, each sees only permitted data and screens.​

Admin tools: Create assignments (title, description, due date, Drive link) and view progress bars with submitted counts.​

Student flow: Two‑step confirmation (“Yes, I have submitted” → “Confirm”) to mark submission; status badges and progress.​

State and persistence: Seed data and session stored in localStorage; hydration on app start.​

SPA‑safe navigation: No full page reloads after actions; state updates without 404s on static hosts.​

Responsive UI: Tailwind utilities for mobile and desktop layouts.​

Security hardening: PrivateRoute + role guards, removal of role switcher in production, and session validation against known users.​

## Tech stack
React + Vite, React Router.​

Tailwind CSS, date‑fns, clsx.​

LocalStorage seeding via seed.js and storage.js utilities.​

## Project structure
`
📦 myleakwatch
├── 📁 src
│   ├── 📁 components
│   │   ├── Navbar.jsx
│   │   ├── AssignmentForm.jsx
│   │   ├── AssignmentCard.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── StudentDashboard.jsx
│   │
│   ├── 📁 pages
│   │   ├── Login.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── 📁 context
│   │   └── AuthContext.jsx
│   │
│   ├── 📁 data
│   │   └── seed.js
│   │
│   ├── 📁 lib
│   │   └── storage.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── routes.jsx
│   └── index.css
│
├── 📄 package.json
├── 📄 README.md
└── 📄 .gitignore
`

## Getting started

### Installation

`npm install
npm run dev`
Open http://localhost:5173.​

Demo login emails

Admin: admin@uni.edu​

Students: s1@uni.edu, s2@uni.edu
