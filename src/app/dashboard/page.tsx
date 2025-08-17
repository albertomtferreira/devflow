// src/app/dashboard/page.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { PlusCircle, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectSettingsDialog } from "@/components/projects/project-settings-dialog";
import { useProjects } from "@/contexts/projects-context";
import { getStatusById } from "@/lib/actions/project-statuses";
import { STATUS_COLORS } from "@/lib/types";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const {
    projects,
    loading: projectsLoading,
    error,
    createProject,
  } = useProjects();
  const router = useRouter();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, authLoading, router]);

  const handleProjectCreated = async (projectData: any) => {
    try {
      const newProject = await createProject(projectData);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Dashboard: Error creating project:", error);
    }
  };

  // Helper function to get status display info
  const getStatusDisplay = (project: any) => {
    if (project.customStatuses && project.currentStatus) {
      const status = getStatusById(
        project.customStatuses,
        project.currentStatus
      );
      if (status) {
        return {
          label: status.label,
          color:
            STATUS_COLORS[status.color as keyof typeof STATUS_COLORS]?.class ||
            "bg-gray-500",
        };
      }
    }

    // Fallback for legacy projects or missing data
    return {
      label: "Unknown",
      color: "bg-gray-500",
    };
  };

  if (authLoading || projectsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Error Loading Projects</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProjectSettingsDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        mode="create"
        onProjectSaved={handleProjectCreated}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>
            A list of all the projects you are working on.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground mb-4">
                Click "New Project" to get started.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> New Project
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                  <TableHead className="w-[150px]">Role</TableHead>
                  <TableHead className="w-[100px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => {
                  const statusDisplay = getStatusDisplay(project);

                  return (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className="font-medium">{project.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {project.shortDescription}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full",
                              statusDisplay.color
                            )}
                          />
                          <span>{statusDisplay.label}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.role}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dashboard/projects/${project.id}`}>
                            <ArrowUpRight className="h-4 w-4" />
                            <span className="sr-only">View Project</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
