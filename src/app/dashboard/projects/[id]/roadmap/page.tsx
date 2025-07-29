'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const initialRoadmap = `# v1.0.0 (Current)
## Features
- [x] Project Dashboard UI
- [x] Code Vault with AI Tagging
- [ ] Roadmap Editor

## Fixes
- No bug fixes in this version.

# v0.1.0 (Initial Release)
- Basic project setup
- Firestore integration
`;

export default function RoadmapPage() {
    const [roadmap, setRoadmap] = useState(initialRoadmap);
    const { toast } = useToast();

    const handleSave = () => {
        // In a real app, you would save this to your database.
        console.log("Saving roadmap:", roadmap);
        toast({
            title: "Roadmap Saved!",
            description: "Your project roadmap has been updated.",
        });
    }

  return (
    <Card>
      <CardHeader>
          <CardTitle>Roadmap</CardTitle>
          <CardDescription>Track your project's progress with a markdown-style task list and changelog.</CardDescription>
      </CardHeader>
      <CardContent>
          <Textarea 
            value={roadmap}
            onChange={(e) => setRoadmap(e.target.value)}
            className="font-code min-h-[400px]"
            placeholder="Enter your roadmap in Markdown format..."
          />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave}>Save Roadmap</Button>
      </CardFooter>
    </Card>
  )
}
