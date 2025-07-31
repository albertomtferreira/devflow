# Project Roadmap & Changelog

## ✅ v0.1.0: Foundation & Core Features (Complete)
- [x] **Authentication:** Full-featured system with email, password, and Google sign-in.
- [x] **Dashboard:** Central project dashboard with a clean table view.
- [x] **Project Hub:** Dedicated, multi-page layout for individual projects.
- [x] **Navigation:** Implemented robust navigation with a collapsible sidebar and breadcrumbs.
- [x] **UI System:** Established a consistent UI with ShadCN, Tailwind CSS, and a theme toggle.

## 🚀 v0.2.0: Next Steps & Enhancements
- [ ] **Implement Full CRUD for Projects:** Add functionality to create, update, and delete projects.
- [ ] **Flesh out Project Features:** Build the UI and logic for the Learning Log, Bookmarks, and File Uploads.
    -[ ] **Overview:** Build UI and logic for the Overview page
        -[ ] **Editable Fields:** Make the fields editable by eith
- [ ] **Connect to a Real Database:** Replace all mock data with a Firestore database to persist user data.
- [ ] **Enhance Code Vault:** Add search and filtering capabilities to the Code Vault.
- [ ] **Improve AI:** Refine AI prompts and introduce more generative AI features across the app.

## File structure reorganising
- [x] **navLinks:** Have all navLinks moved to one folder inside /lib/
src/components/navigation/project-nav.tsx
- [x] **Interfaces/Types:** Centralize all Interface and Type statements into one document
- [x] **Rename and Reorganise file structure:** Make sense of the /components/projects and reorganise and rename as necessary

## 🐛 Bugs & Fixes
- [ ] **Traffic lights System:** The status of the projects on the Dashboards is not showing the color of the status
- [ ] **Plus Circle New Project:** The + circle on the dashboard "New Project" button is not showing