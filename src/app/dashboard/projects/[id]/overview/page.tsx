// src/app/dashboard/projects/[id]/overview/page.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Loader2, X } from "lucide-react";
import { getProject } from "@/lib/actions/projects";
import { Project } from "@/lib/types";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export default function OverviewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user, loading: authLoading } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch if auth is complete and we have a user and an id.
    if (!authLoading && user && id) {
      setLoading(true);
      getProject(id, user.uid)
        .then(setProject)
        .finally(() => setLoading(false));
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [id, user, authLoading]);

  // Listen for project updates from other components
  useEffect(() => {
    const handleProjectUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<Project>;
      setProject(customEvent.detail);
    };

    window.addEventListener("projectUpdated", handleProjectUpdate);
    return () =>
      window.removeEventListener("projectUpdated", handleProjectUpdate);
  }, []);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-full pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center pt-16">
        Project not found or you do not have permission to view it.
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
            {project.longDescription && (
              <p className="text-muted-foreground">{project.longDescription}</p>
            )}
            {!project.longDescription && (
              <>
                <p className="text-muted-foreground">
                  The project does not have a long description.
                </p>{" "}
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
            <Button variant="outline" asChild>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live App
                </a>
              )}
            </Button>
            <Button variant="outline" asChild>
              {!project.liveUrl && (
                <p>
                  <X />
                  No Link for live project{" "}
                  <ExternalLink className="mr-2 h-4 w-4" />
                </p>
              )}
            </Button>
            <Button variant="outline" asChild>
              {project.repoUrl && (
                <a
                  href={project.repoUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub Repo
                </a>
              )}
            </Button>
            <Button variant="outline" asChild>
              {!project.repoUrl && (
                <p>
                  <X /> No Link for repo <Github className="mr-2 h-4 w-4" />
                </p>
              )}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tech Stack & Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {project.techStack && project.techStack.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            )}
            {project.skills && project.skills.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {(!project.techStack || project.techStack.length === 0) &&
              (!project.skills || project.skills.length === 0) &&
              (!project.tags || project.tags.length === 0) && (
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
