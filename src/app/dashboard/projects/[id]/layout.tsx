// In a real app, you would fetch this data based on the `params.id`
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
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{mockProject.title}</h1>
        <p className="text-muted-foreground mt-1">{mockProject.description}</p>
      </div>

      <ProjectNav projectId={id} />
      
      <main className="mt-6">
        {children}
      </main>

    </div>
  );
}
