import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VersionsPage() {
  const isEmpty = true;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Version History</CardTitle>
        <CardDescription>
          Track project versions, milestones, and release history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-muted-foreground">
                No versions have been tracked for this project yet.
              </p>
              <Button>Log New Version</Button>
            </div>
          </div>
        ) : (
          <div>
            {/* This is where the list of versions would be rendered */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
