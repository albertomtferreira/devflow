# DevFlow Firestore Data Model

This document outlines the proposed data structure for the DevFlow application using Firestore.

## Top-Level Collections

### 1. `users`

This collection stores public-facing information about each registered user. The document ID for each user will be their `uid` from Firebase Authentication.

- **Path**: `users/{userId}`
- **Fields**:
    - `email`: string (e.g., "user@example.com")
    - `displayName`: string (e.g., "Jane Doe")
    - `photoURL`: string (URL to their avatar image)
    - `createdAt`: timestamp

### 2. `projects`

This is the core collection that holds all the projects created by users.

- **Path**: `projects/{projectId}`
- **Fields**:
    - `userId`: string (The `uid` of the user who owns the project. Used for security rules.)
    - `title`: string
    - `description`: string
    - `status`: string (e.g., "online", "in-progress", "offline")
    - `role`: string (e.g., "Owner", "Contributor")
    - `techStack`: array of strings
    - `skills`: array of strings
    - `liveUrl`: string
    - `repoUrl`: string
    - `createdAt`: timestamp

---

## Subcollections

To keep project-specific data organized and performant, we will use subcollections within each `project` document.

### 1. `codeSnippets` (for Code Vault)

- **Path**: `projects/{projectId}/codeSnippets/{snippetId}`
- **Fields**:
    - `title`: string
    - `description`: string
    - `code`: string
    - `language`: string
    - `tags`: array of strings
    - `createdAt`: timestamp

### 2. `learningLog` (for Learning Log)

- **Path**: `projects/{projectId}/learningLog/{logId}`
- **Fields**:
    - `title`: string
    - `content`: string (Markdown content)
    - `tags`: array of strings
    - `createdAt`: timestamp

### 3. `bookmarks` (for Bookmark Manager)

- **Path**: `projects/{projectId}/bookmarks/{bookmarkId}`
- **Fields**:
    - `title`: string
    - `url`: string
    - `description`: string
    - `tags`: array of strings
    - `createdAt`: timestamp

### 4. `files` (for Files)

- **Path**: `projects/{projectId}/files/{fileId}`
- **Fields**:
    - `fileName`: string
    - `storagePath`: string (Path to the file in Firebase Storage)
    - `fileType`: string (e.g., "image/png", "application/pdf")
    - `fileSize`: number (in bytes)
    - `uploadedAt`: timestamp
