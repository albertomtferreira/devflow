import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github } from "lucide-react";
import { OverviewTab } from "@/components/features/project-detail/overview-tab";
import { RoadmapTab } from "@/components/features/project-detail/roadmap-tab";
import { CodeVaultTab } from "@/components/features/project-detail/code-vault-tab";
import { LearningLogTab } from "@/components/features/project-detail/learning-log-tab";
import { BookmarksTab } from "@/components/features/project-detail/bookmarks-tab";
import { FilesTab } from "@/components/features/project-detail/files-tab";
import { VersionsTab } from "@/components/features/project-detail/versions-tab";

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
          <OverviewTab project={mockProject} />
        </TabsContent>
        <TabsContent value="roadmap">
          <RoadmapTab />
        </TabsContent>
         <TabsContent value="code-vault">
            <CodeVaultTab />
        </TabsContent>
        <TabsContent value="learning-log">
            <LearningLogTab />
        </TabsContent>
        <TabsContent value="bookmarks">
            <BookmarksTab />
        </TabsContent>
        <TabsContent value="files">
            <FilesTab />
        </TabsContent>
        <TabsContent value="versions">
            <VersionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
