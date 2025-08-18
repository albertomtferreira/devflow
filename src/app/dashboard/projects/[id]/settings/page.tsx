// src/app/dashboard/projects/[id]/settings/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { getProject } from "@/lib/actions/projects";
import { Project } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Loader2, Settings, Palette, Info, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectSettingsDialog } from "@/components/projects/project-settings-dialog";
import { StatusManagement } from "@/components/projects/status-managements";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteProjectsButton } from "@/components/projects/delete-projects-button";

export default function ProjectSettingsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      if (!user || !projectId) return;

      try {
        setLoading(true);
        const projectData = await getProject(projectId, user.uid);
        setProject(projectData);
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId, user]);

  const handleProjectSaved = (updatedProject: any) => {
    // Refresh the project data
    if (user && projectId) {
      getProject(projectId, user.uid).then(setProject);
    }
    setIsEditDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Project Not Found</h3>
          <p className="text-muted-foreground">
            Please check the project ID and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Project Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your project configuration and workflow settings.
          </p>
        </div>

        <div className="flex gap-1">
          <DeleteProjectsButton />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setIsEditDialogOpen(true)}>
                <Settings />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit Project</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="statuses" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Statuses
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>
                Basic information about your project including title,
                description, and links.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Title</h4>
                  <p className="text-sm text-muted-foreground">
                    {project.title}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Role</h4>
                  <Badge variant="outline">{project.role}</Badge>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-medium mb-2">Short Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {project.shortDescription}
                  </p>
                </div>
                {project.longDescription && (
                  <div className="md:col-span-2">
                    <h4 className="font-medium mb-2">Long Description</h4>
                    <p className="text-sm text-muted-foreground">
                      {project.longDescription}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                {project.liveUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Repository
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {project.techStack?.length || project.skills?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack & Skills</CardTitle>
                <CardDescription>
                  Technologies, skills, and tags associated with this project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack && project.techStack?.length > 0 ? (
                      project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        No tech stack added
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills && project.skills?.length > 0 ? (
                      project.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        No skills added
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack & Skills</CardTitle>
                <CardDescription>
                  Add technologies, skills, and tags to showcase your project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-muted-foreground">
                      No tech stack added
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-muted-foreground">
                      No skills added
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="statuses" className="space-y-6">
          <StatusManagement
            projectId={projectId}
            userId={user!.uid}
            currentStatus={project.currentStatus}
            onStatusesUpdated={(statuses) => {
              setProject((prev) =>
                prev ? { ...prev, customStatuses: statuses } : null
              );
            }}
          />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Advanced project configuration options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Project ID</h4>
                  <p className="text-sm text-muted-foreground font-mono">
                    {project.id}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Created</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Total Statuses</h4>
                  <p className="text-sm text-muted-foreground">
                    {project.customStatuses?.length || 0} custom statuses
                    defined
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ProjectSettingsDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        projectId={projectId}
        onProjectSaved={handleProjectSaved}
      />
    </div>
  );
}
