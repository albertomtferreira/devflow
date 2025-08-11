"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Snippet } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteSnippet } from "@/lib/actions/features-projects";

import { useState } from "react";
import { SnippetDialog } from "./add-snippet-dialog";

interface CodeSnippetCardProps {
  projectId: string;
  snippet: Snippet & { id: string };
  onUpdate: (updatedSnippets: (Snippet & { id: string })[]) => void;
  allSnippets: (Snippet & { id: string })[];
}

export function CodeSnippetCard({
  projectId,
  snippet,
  onUpdate,
  allSnippets,
}: CodeSnippetCardProps) {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    toast({
      title: "Copied!",
      description: "The code snippet has been copied to your clipboard.",
    });
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleSnippetSaved = (updatedSnippet: Snippet & { id: string }) => {
    // Update the snippet in the list
    const updatedSnippets = allSnippets.map((s) =>
      s.id === updatedSnippet.id ? updatedSnippet : s
    );
    onUpdate(updatedSnippets);
  };

  const handleDelete = async () => {
    try {
      await deleteSnippet(projectId, snippet.id);

      // Remove from local state
      const updatedSnippets = allSnippets.filter((s) => s.id !== snippet.id);
      onUpdate(updatedSnippets);

      toast({
        title: "Deleted!",
        description: "Code snippet has been deleted.",
      });
    } catch (error) {
      console.error("Failed to delete snippet:", error);
      toast({
        title: "Error",
        description: "Failed to delete snippet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{snippet.title}</CardTitle>
              <CardDescription className="mt-1">
                {snippet.description}
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy code</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Snippet</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="tooltip-destructive">
                  <p>Delete Snippet</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-80 w-full rounded-md border bg-muted">
            <pre className="p-4 font-code text-sm">
              <code>{snippet.code}</code>
            </pre>
          </ScrollArea>
          <div className="flex flex-wrap gap-2 mt-4">
            {snippet.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <SnippetDialog
        projectId={projectId}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        snippet={snippet}
        onSnippetSaved={handleSnippetSaved}
      />
    </>
  );
}
