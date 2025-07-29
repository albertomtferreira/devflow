'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Loader2, PlusCircle, Sparkles, X } from 'lucide-react';
import { suggestTagsForCode } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

export function AddSnippetDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();

  const handleSuggestTags = async () => {
    if (code.length < 20) {
      toast({
        variant: 'destructive',
        title: 'Code is too short',
        description: 'Please provide a longer code snippet for better tag suggestions.',
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const suggestedTags = await suggestTagsForCode(code);
      // Avoid duplicates and merge with existing tags
      setTags(Array.from(new Set([...tags, ...suggestedTags])));
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not suggest tags at this time.',
      });
    } finally {
      setIsSuggesting(false);
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the snippet to your database here.
    console.log({ title, description, code, tags });
    toast({
        title: "Snippet Added!",
        description: `"${title}" has been saved to your vault.`,
    })
    // Reset form and close dialog
    setCode('');
    setTitle('');
    setDescription('');
    setTags([]);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Snippet
        </Button>
      </DialogTrigger>
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
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
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
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={handleSuggestTags} disabled={isSuggesting}>
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
             <Label className="text-right pt-2">
              Tags
            </Label>
            <div className="col-span-3">
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <button type="button" onClick={() => handleRemoveTag(tag)} className="rounded-full hover:bg-muted-foreground/20">
                                <X className="h-3 w-3"/>
                            </button>
                        </Badge>
                    ))}
                     {tags.length === 0 && <p className="text-sm text-muted-foreground">No tags yet. Add some or use the AI suggestion!</p>}
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
