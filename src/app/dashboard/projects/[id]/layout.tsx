// src/app/dashboard/projects/[id]/layout.tsx

import { ProjectsDetailsNav } from "@/components/navigation/projects-details-nav";
import ProjectsHeader from "@/components/projects/global/projects-header";



export default function ProjectsDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="h-full flex flex-col">
      <ProjectsHeader />
      <ProjectsDetailsNav />
      <main className="flex-1 min-h-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
