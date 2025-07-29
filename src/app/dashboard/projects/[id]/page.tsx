import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github } from "lucide-react";

// In a real app, you would fetch this data based on the `params.id`
const mockProject = {
  id: '1',
  title: 'Portfolio Website',
  description: 'A personal portfolio to showcase my skills and projects. Built with Next.js and Tailwind CSS.',
  techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel'],
  skills: ['Frontend Development', 'UI/UX Design', 'Responsive Design', 'SEO'],
  liveUrl: 'https://example.com',
  repoUrl: 'https://github.com/example/portfolio',
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{mockProject.title}</h1>
        <p className="text-muted-foreground mt-1">{mockProject.description}</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="code-vault">Code Vault</TabsTrigger>
          <TabsTrigger value="learning-log">Learning Log</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
          <TabsTrigger value="github" disabled>GitHub</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>This is where you would have a detailed project description, possibly editable with a markdown editor.</p>
                    <p className="text-muted-foreground">The project detail pages are designed to be the central hub for everything related to a specific project, from its core concepts to its development lifecycle.</p>
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
                      {mockProject.techStack.map(tech => <Badge key={tech}>{tech}</Badge>)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockProject.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
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
                        <a href={mockProject.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live App
                        </a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href={mockProject.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> GitHub Repo
                        </a>
                    </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="roadmap">
            <Card>
                <CardHeader>
                    <CardTitle>Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">A markdown editor or a Kanban board would be implemented here to create and track project roadmaps and changelogs.</p>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="code-vault">
            <Card>
                <CardHeader>
                    <CardTitle>Project-Specific Code Vault</CardTitle>
                </Header>
                <CardContent>
                    <p className="text-muted-foreground">Here you could see and manage code snippets that are specifically related to this project.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="learning-log">
            <Card>
                <CardHeader>
                    <CardTitle>Project-Specific Learning Log</CardTitle>
                </Header>
                <CardContent>
                    <p className="text-muted-foreground">Log your learnings, challenges, and solutions encountered while working on this project.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="bookmarks">
            <Card>
                <CardHeader>
                    <CardTitle>Project Bookmarks</CardTitle>
                </Header>
                <CardContent>
                    <p className="text-muted-foreground">Save and categorize links to documentation, articles, and other resources relevant to this project.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="files">
            <Card>
                <CardHeader>
                    <CardTitle>Project Files</CardTitle>
                </Header>
                <CardContent>
                    <p className="text-muted-foreground">A file management system would be here, likely integrated with Firebase Storage, to handle project-related assets.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="versions">
            <Card>
                <CardHeader>
                    <CardTitle>Version History</CardTitle>
                </Header>
                <CardContent>
                    <p className="text-muted-foreground">This area would display a log of project versions, deployments, and changelogs, possibly integrated with Git tags or a CI/CD pipeline.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
