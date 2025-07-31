// src/app/dashboard/projects/[id]/overview/page.tsx

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProjects } from "@/lib/mock-data";
import { ExternalLink, Github } from "lucide-react";

export default function OverviewPage({ params }: { params: { id: string } }) {
  const project = mockProjects.find(p => p.id === params.id);

  if (!project) {
    return <div>Project not found</div>;
  }
  
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This is where you would have a detailed project description,
              possibly editable with a markdown editor. For now, it's showing the project's main description:
            </p>
            <p className="text-muted-foreground">
             {project.description}
            </p>
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
              <a
                href={project.liveUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Live App
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={project.repoUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" /> GitHub Repo
              </a>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
