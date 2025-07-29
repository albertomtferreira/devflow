'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

type Snippet = {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
};

export function CodeSnippetCard({ snippet }: { snippet: Snippet }) {
  const { toast } = useToast();
  // A simple copy-to-clipboard function. In a real app, you'd add user feedback.
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    toast({
      title: 'Copied!',
      description: 'The code snippet has been copied to your clipboard.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{snippet.title}</CardTitle>
                <CardDescription className="mt-1">{snippet.description}</CardDescription>
            </div>
             <Button variant="ghost" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy code</span>
            </Button>
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
  );
}
