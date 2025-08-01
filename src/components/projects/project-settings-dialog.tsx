"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { X, Plus, ExternalLink, Github, Loader2 } from "lucide-react";
import { addProject, getProject, updateProject } from "@/lib/actions/projects";
import { Project } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth"; // Assuming you have an auth hook

interface ProjectSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string; // For editing existing projects
  onProjectSaved?: (project: Project) => void; // Callback when project is saved
  mode?: "create" | "edit"; // Specify the mode
}

export function ProjectSettingsDialog({
  isOpen,
  onOpenChange,
  projectId,
  onProjectSaved,
  mode = "create",
}: ProjectSettingsDialogProps) {
  const { toast } = useToast();
  const { user } = useAuth(); // Get current user
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProject, setIsLoadingProject] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTech, setNewTech] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newTag, setNewTag] = useState("");

  // Load existing project data when editing
  useEffect(() => {
    const loadProject = async () => {
      if (mode === "edit" && projectId && user?.uid && isOpen) {
        setIsLoadingProject(true);
        try {
          const project = await getProject(projectId, user.uid);
          if (project) {
            setTitle(project.title || "");
            setDescription(project.description || "");
            setLiveLink(project.liveUrl || "");
            setGithubLink(project.repoUrl || "");
            setTechStack(project.techStack || []);
            setSkills(project.skills || []);
            setTags(project.tags || []);
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load project data.",
            variant: "destructive",
          });
        } finally {
          setIsLoadingProject(false);
        }
      }
    };

    loadProject();
  }, [mode, projectId, user?.uid, isOpen, toast]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen && mode === "create") {
      setTitle("");
      setDescription("");
      setLiveLink("");
      setGithubLink("");
      setTechStack([]);
      setSkills([]);
      setTags([]);
      setNewTech("");
      setNewSkill("");
      setNewTag("");
    }
  }, [isOpen, mode]);

  // Validation
  const isFormValid = title.trim() && description.trim() && user?.uid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);

    try {
      const projectData = {
        title: title.trim(),
        description: description.trim(),
        liveUrl: liveLink.trim(),
        repoUrl: githubLink.trim(),
        techStack,
        skills,
        userId: user!.uid,
      };

      let savedProject: Project;

      if (mode === "create") {
        // Create new project
        const projectId = await addProject(projectData);
        // Get the created project to return full data
        savedProject = (await getProject(projectId, user!.uid)) as Project;

        toast({
          title: "Project created!",
          description: `"${title}" has been created successfully.`,
        });
      } else {
        // Update existing project
        if (!projectId) throw new Error("Project ID is required for updates");

        await updateProject(projectId, user!.uid, projectData);
        savedProject = (await getProject(projectId, user!.uid)) as Project;

        toast({
          title: "Project updated!",
          description: `"${title}" has been updated successfully.`,
        });
      }

      // Call the callback with the saved project
      onProjectSaved?.(savedProject);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: `Failed to ${
          mode === "create" ? "create" : "update"
        } project. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTech = () => {
    const tech = newTech.trim();
    if (tech && !techStack.includes(tech)) {
      setTechStack([...techStack, tech]);
      setNewTech("");
    }
  };

  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setNewSkill("");
    }
  };

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "create" ? "Create new project" : "Update your project"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the details to create a new project."
              : "Make changes to your project settings here."}{" "}
            Required fields are marked with *.
          </DialogDescription>
        </DialogHeader>

        {isLoadingProject ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Loading project data...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" id="project-form">
            {/* Project Information */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter project title"
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your project"
                    className="w-full min-h-[80px] resize-none"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  Project Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="liveLink"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Label>
                  <Input
                    id="liveLink"
                    type="url"
                    value={liveLink}
                    onChange={(e) => setLiveLink(e.target.value)}
                    placeholder="https://your-project.com"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="githubLink"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    GitHub Repository
                  </Label>
                  <Input
                    id="githubLink"
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack and Skills */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Tech Stack & Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tech Stack */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Tech Stack</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="Add technology (e.g., React, Node.js)"
                      className="flex-1"
                      onKeyPress={(e) => handleKeyPress(e, addTech)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addTech}
                      disabled={!newTech.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTech(tech)}
                            className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add skill (e.g., Frontend Development, UI/UX Design)"
                      className="flex-1"
                      onKeyPress={(e) => handleKeyPress(e, addSkill)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSkill}
                      disabled={!newSkill.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        )}

        <DialogFooter className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading || isLoadingProject}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading || isLoadingProject}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {mode === "create" ? "Creating..." : "Updating..."}
              </>
            ) : mode === "create" ? (
              "Create Project"
            ) : (
              "Update Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
