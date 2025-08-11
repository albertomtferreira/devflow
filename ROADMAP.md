# Project Roadmap & Changelog

## ✅ v0.1.0: Foundation & Core Features (Complete)

- [x] **Authentication:** Full-featured system with email, password, and Google sign-in.
- [x] **Dashboard:** Central project dashboard with a clean table view.
- [x] **Project Hub:** Dedicated, multi-page layout for individual projects.
- [x] **Navigation:** Implemented robust navigation with a collapsible sidebar and breadcrumbs.
- [x] **UI System:** Established a consistent UI with ShadCN, Tailwind CSS, and a theme toggle.

## 🚀 v0.2.0: Next Steps & Enhancements

- [ ] **Implement Full CRUD for Projects:** Add functionality to create, update, and delete projects.
- [ ] **Status:** Add project status on Project Header Overview and add dropdown box to change status.
- [ ] **Flesh out Project Features:** Build the UI and logic for the Learning Log, Bookmarks, and File Uploads.
  - [x] **Overview:** Build UI and logic for the Overview page
    - [x] **Editable Fields:** Make the fields editable by either a dialog box or transforming the field editable or a mix
    - [x] **Add Options Gear Icon:** Add and implement Options gear icon on the top right side of the Project Details Header
  - [ ] **Roadmap:** Build UI and logic for the Roadmap page
  - [ ] **Code Vault:** Build UI and logic for the Code Vault page
    - [x] **Add snippet:** Add snippet to DB
    - [x] **Load Snippets:** Remove mockup data and load snippets from DB
    - [x] **Edit snippet:** Implement UI and db function
    - [x] **Delete snippet:** Implement UI and db function
  - [ ] **Learning Log:** Build UI and logic for the Learning Log page
  - [ ] **Bookmarks:** Build UI and logic for the Bookmarks page
  - [ ] **Files:** Build UI and logic for the Files page
  - [ ] **Versions:** Build UI and logic for the Versions page
- [ ] **Connect to a Real Database:** Replace all mock data with a Firestore database to persist user data.
- [ ] **Enhance Code Vault:** Add search and filtering capabilities to the Code Vault.
- [ ] **Improve AI:** Refine AI prompts and introduce more generative AI features across the app.

## File structure reorganising

- [x] **navLinks:** Have all navLinks moved to one folder inside /lib/
      src/components/navigation/project-nav.tsx
- [x] **Interfaces/Types:** Centralize all Interface and Type statements into one document
- [x] **Rename and Reorganise file structure:** Make sense of the /components/projects and reorganise and rename as necessary

## 🐛 Bugs & Fixes

- [x] **Traffic lights System:** The status of the projects on the Dashboards is not showing the color of the status
- [x] **Plus Circle New Project:** The + circle on the dashboard "New Project" button is not showing
- [ ] **Breadcrumbs:**
  - [ ] **It's showing the project ID:** Remove project ID from breadcrumbs and replace by the project name
  - [ ] **Dashboard:** When on Dashboard it's showing Dashboard twice
