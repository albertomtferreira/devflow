"use client";

import { CodeSnippetCard } from "@/components/projects/code-vault/code-snippet-card";

import ProjectsDetailsHeader from "@/components/projects/global/projects-details-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { Snippet } from "@/lib/types";
import { getProjectSnippets } from "@/lib/actions/features-projects";

export default function CodeVaultPage({ params }: { params: { id: string } }) {
  const [snippets, setSnippets] = useState<(Snippet & { id: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = params;
  const projectId = params.id;

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const allSnippets = await getProjectSnippets(projectId);
        setSnippets(allSnippets || []);
      } catch (error) {
        console.error("Failed to fetch snippets:", error);
        setSnippets([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSnippets();
  }, []);

  const handleSnippetUpdate = (
    updatedSnippets: (Snippet & { id: string })[]
  ) => {
    setSnippets(updatedSnippets);
  };

  const handleSnippetAdded = (newSnippet: Snippet & { id: string }) => {
    // Add the new snippet to the beginning of the list
    setSnippets([newSnippet, ...snippets]);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div>Loading snippets...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <ProjectsDetailsHeader
            projectId={projectId}
            title={"Code Vault"}
            buttonText={"Add Snippet"}
            onSnippetAdded={handleSnippetAdded}
          />
          <CardDescription>
            A searchable and taggable repository for your most-used code
            snippets, custom hooks, and helpful functions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {snippets.length === 0 ? (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-muted-foreground">
                  Your code vault is empty.
                </p>
                <Button
                  onClick={() => {
                    /* This can trigger the header button or open dialog directly */
                  }}
                >
                  Add New Snippet
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {snippets.map((snippet) => (
                <CodeSnippetCard
                  projectId={projectId}
                  key={snippet.id}
                  snippet={snippet}
                  onUpdate={handleSnippetUpdate}
                  allSnippets={snippets}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
