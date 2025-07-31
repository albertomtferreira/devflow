// src/app/dashboard/projects/[id]/overview/page.tsx

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

const mockProject = {
  id: "1",
  title: "Portfolio Website",
  description:
    "A personal portfolio to showcase my skills and projects. Built with Next.js and Tailwind CSS.",
  techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
  skills: ["Frontend Development", "UI/UX Design", "Responsive Design", "SEO"],
  liveUrl: "https://example.com",
  repoUrl: "https://github.com/example/portfolio",
};

export default function OverviewPage() {
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
              possibly editable with a markdown editor.
            </p>
            <p className="text-muted-foreground">
              The project detail pages are designed to be the central hub for
              everything related to a specific project, from its core concepts
              to its development lifecycle.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Tech Stack & Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {mockProject.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {mockProject.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button variant="outline" asChild>
              <a
                href={mockProject.liveUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Live App
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={mockProject.repoUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" /> GitHub Repo
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
