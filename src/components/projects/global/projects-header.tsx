"use client"
import { mockProjects } from "@/lib/mock-data";
import { useParams } from "next/navigation";

export default function ProjectsHeader(){
    const params = useParams();
    const id = params.id as string;
    const project = mockProjects.find(p => p.id === id) || {
        title: "Project Not Found",
        description: "Please select a project from the dashboard."
      };
    return (
        <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">
          {project.title}
        </h1>
        <p className="text-muted-foreground mt-1">{project.description}</p>
        </div>
    )

}