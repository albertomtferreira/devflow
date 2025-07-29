import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/features/dashboard/project-card';
import { PlusCircle } from 'lucide-react';

const mockProjects = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'A personal portfolio to showcase my skills and projects. Built with Next.js and Tailwind CSS.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    liveUrl: '#',
    repoUrl: '#',
    status: 'online',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A full-stack task manager with user authentication and real-time updates using Firebase.',
    tags: ['React', 'Firebase', 'Node.js', 'Express'],
    liveUrl: '#',
    repoUrl: '#',
    status: 'in-progress',
  },
  {
    id: '3',
    title: 'E-commerce Store API',
    description: 'A RESTful API for an online store, featuring product management, orders, and payments.',
    tags: ['Node.js', 'Express', 'MongoDB', 'API'],
    liveUrl: null,
    repoUrl: '#',
    status: 'offline',
  },
  {
    id: '4',
    title: 'Markdown Blog',
    description: 'A simple, static-generated blog created with Astro and Markdown files.',
    tags: ['Astro', 'Markdown', 'Static Site'],
    liveUrl: '#',
    repoUrl: '#',
    status: 'online',
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Project Dashboard</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
