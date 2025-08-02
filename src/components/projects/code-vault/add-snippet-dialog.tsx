"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, X } from "lucide-react";
import { suggestTagsForCode } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Snippet } from "@/lib/types";
import { addSnippet } from "@/lib/actions/features-projects";

interface AddSnippetDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSnippetDialog({
  isOpen,
  onOpenChange,
}: AddSnippetDialogProps) {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth(); // Get current user

  const handleSuggestTags = async () => {
    if (code.length < 20) {
      toast({
        variant: "destructive",
        title: "Code is too short",
        description:
          "Please provide a longer code snippet for better tag suggestions.",
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const suggestedTags = await suggestTagsForCode(code);
      setTags(Array.from(new Set([...tags, ...suggestedTags])));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not suggest tags at this time.",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const projectSnippet = {
        title: title.trim(),
        description: title.trim(),
        code,
        tags,
        userId: user!.uid,
      };
      let savedSnippet: Snippet;
      const projectSnippetAdd = await addSnippet(projectSnippet);
      console.log({ title, description, code, tags });
      toast({
        title: "Snippet Added!",
        description: `"${title}" has been saved to your vault.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Fialed to save the snippet",
      });
    }

    // Reset form and close dialog
    setCode("");
    setTitle("");
    setDescription("");
    setTags([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Code Snippet</DialogTitle>
          <DialogDescription>
            Save a piece of code to your vault for easy access later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="code" className="text-right pt-2">
              Code
            </Label>
            <div className="col-span-3">
              <Textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="font-code min-h-48"
                placeholder="Paste your code snippet here..."
                required
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleSuggestTags}
                disabled={isSuggesting}
              >
                {isSuggesting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Suggest Tags with AI
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Tags</Label>
            <div className="col-span-3">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="rounded-full hover:bg-muted-foreground/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {tags.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No tags yet. Add some or use the AI suggestion!
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Snippet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
