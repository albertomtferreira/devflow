// src/app/dashboard/projects/[id]/layout.tsx

import { ProjectNav } from "@/components/navigation/project-nav";

const mockProject = {
  id: '1',
  title: 'Portfolio Website',
  description: 'A personal portfolio to showcase my skills and projects. Built with Next.js and Tailwind CSS.',
};

export default async function ProjectDetailLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { id: string };
  }) {
    const { id } = await params;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">{mockProject.title}</h1>
        <p className="text-muted-foreground mt-1">{mockProject.description}</p>
      </div>

      <div className="flex-shrink-0 mb-6">
        <ProjectNav projectId={id} />
      </div>
      
      <main className="flex-1 min-h-0">
        {children}
      </main>
    </div>
  );
}