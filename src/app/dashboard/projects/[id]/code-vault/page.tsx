import { CodeSnippetCard } from "@/components/projects/code-vault/code-snippet-card";
import ProjectsDetailsHeader from "@/components/projects/global/projects-details-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockSnippet } from "@/lib/mock-data";


export default async function CodeVaultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isEmpty = false;

  return (
    <>
      <Card>
        <CardHeader>
          <ProjectsDetailsHeader title={"Code Vault"} buttonText={"Add Snippet"} />
          <CardDescription>
            A searchable and taggable repository for your most-used code
            snippets, custom hooks, and helpful functions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEmpty ? (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-muted-foreground">
                  Your learning log for this project is empty.
                </p>
                <Button>Add New Note</Button>
              </div>
            </div>
          ) : (
            <div>
              <CodeSnippetCard snippet={mockSnippet} />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
