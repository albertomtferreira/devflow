// src/components/projects/global/projects-header.tsx
"use client";
import { Button } from "@/components/ui/button";
import { getProject } from "@/lib/actions/projects";
import { Project } from "@/lib/types";
import { Settings, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectsHeader() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getProject(id)
        .then(setProject)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-between">
        <div className="mb-6 flex-shrink-0">
          <div className="h-9 w-48 bg-muted rounded animate-pulse mb-2" />
          <div className="h-6 w-72 bg-muted rounded animate-pulse" />
        </div>
        <div>
          <Button disabled>
            <Settings />
          </Button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-between">
        <div className="mb-6 flex-shrink-0">
          <h1 className="text-3xl font-bold tracking-tight">Project Not Found</h1>
          <p className="text-muted-foreground mt-1">Please select a project from the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-muted-foreground mt-1">{project.description}</p>
      </div>
      <div>
        <Button>
          <Settings />
        </Button>
      </div>
    </div>
  );
}
