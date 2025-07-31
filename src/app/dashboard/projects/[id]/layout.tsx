// src/app/dashboard/projects/[id]/layout.tsx
"use client";

import { ProjectNav } from "@/components/navigation/project-nav";
import { useParams } from "next/navigation";

// This would typically come from your data layer
const mockProject = {
  id: "1",
  title: "Portfolio Website",
  description:
    "A personal portfolio to showcase my skills and projects. Built with Next.js and Tailwind CSS.",
};

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">
          {mockProject.title}
        </h1>
        <p className="text-muted-foreground mt-1">{mockProject.description}</p>
      </div>

      <div className="flex-shrink-0 mb-6 border-b">
        <ProjectNav projectId={id} />
      </div>

      <main className="flex-1 min-h-0 overflow-y-auto">{children}</main>
    </div>
  );
}
