// src/app/dashboard/projects/[id]/roadmap/page.tsx

import FeaturesHeader from "@/components/features/dashboard/features-header";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const roadmapContent = `
# Project Roadmap & Changelog

## ✅ v0.1.0: Foundation & Core Features (Complete)
- [x] **Authentication:** Full-featured system with email, password, and Google sign-in.
- [x] **Dashboard:** Central project dashboard with a clean table view.
- [x] **Project Hub:** Dedicated, multi-page layout for individual projects.
- [x] **Navigation:** Implemented robust navigation with a collapsible sidebar and breadcrumbs.
- [x] **Code Vault:** Built a snippet manager with AI-powered tag suggestions.
- [x] **UI System:** Established a consistent UI with ShadCN, Tailwind CSS, and a theme toggle.

## 🚀 v0.2.0: Next Steps & Enhancements
- [ ] **Implement Full CRUD for Projects:** Add functionality to create, update, and delete projects.
- [ ] **Flesh out Project Features:** Build the UI and logic for the Learning Log, Bookmarks, and File Uploads.
- [ ] **Connect to a Real Database:** Replace all mock data with a Firestore database to persist user data.
- [ ] **Enhance Code Vault:** Add search and filtering capabilities to the Code Vault.
- [ ] **Improve AI:** Refine AI prompts and introduce more generative AI features across the app.
`;

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isEmpty = false; // We now have content
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <FeaturesHeader title={"Roadmap"} buttonText={"Save Roadmap"} />
        <CardDescription>Track your project's progress with a markdown-style task list and changelog.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <Textarea 
          readOnly 
          defaultValue={roadmapContent}
          className="flex-1 w-full font-code text-sm bg-muted/40"
        />
      </CardContent>
    </Card>
  );
}
