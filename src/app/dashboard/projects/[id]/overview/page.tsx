// src/app/dashboard/projects/[id]/overview/page.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Loader2, X } from "lucide-react";
import { useProjects } from "@/contexts/projects-context";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function OverviewPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { projects, currentProject, setCurrentProject } = useProjects();

  // Ensure current project is set
  useEffect(() => {
    if (projectId && projects.length > 0) {
      const project = projects.find((p) => p.id === projectId);
      if (project && (!currentProject || currentProject.id !== projectId)) {
        setCurrentProject(project);
      }
    }
  }, [projectId, projects, currentProject, setCurrentProject]);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-full pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 ">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentProject.longDescription && (
              <p className="text-muted-foreground">
                {currentProject.longDescription}
              </p>
            )}
            {!currentProject.longDescription && (
              <>
                <p className="text-muted-foreground">
                  The project does not have a long description.
                </p>
                <p className="text-muted-foreground">
                  Head to settings and update your project.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {currentProject.liveUrl ? (
              <Button variant="outline" asChild>
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live App
                </a>
              </Button>
            ) : (
              <Button variant="outline" disabled>
                <X className="mr-2 h-4 w-4" />
                No Link for live project
              </Button>
            )}

            {currentProject.repoUrl ? (
              <Button variant="outline" asChild>
                <a
                  href={currentProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub Repo
                </a>
              </Button>
            ) : (
              <Button variant="outline" disabled>
                <X className="mr-2 h-4 w-4" />
                No Link for repo
              </Button>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tech Stack & Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {currentProject.techStack &&
              currentProject.techStack.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.techStack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              )}
            {currentProject.skills && currentProject.skills.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProject.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {currentProject.tags && currentProject.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {(!currentProject.techStack ||
              currentProject.techStack.length === 0) &&
              (!currentProject.skills || currentProject.skills.length === 0) &&
              (!currentProject.tags || currentProject.tags.length === 0) && (
                <p className="text-sm text-muted-foreground">
                  No tech stack, skills, or tags have been added yet.
                </p>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
