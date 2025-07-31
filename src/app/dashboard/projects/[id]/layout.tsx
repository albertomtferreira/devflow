// src/app/dashboard/projects/[id]/layout.tsx
"use client";

import { ProjectNav } from "@/components/navigation/project-nav";
import { mockProjects } from "@/lib/mock-data";
import { useParams } from "next/navigation";


export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const id = params.id as string;

  const project = mockProjects.find(p => p.id === id) || {
    title: "Project Not Found",
    description: "Please select a project from the dashboard."
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">
          {project.title}
        </h1>
        <p className="text-muted-foreground mt-1">{project.description}</p>
      </div>

      <div className="flex-shrink-0 mb-6 border-b">
        <ProjectNav projectId={id} />
      </div>

      <main className="flex-1 min-h-0 overflow-y-auto">{children}</main>
    </div>
  );
}
