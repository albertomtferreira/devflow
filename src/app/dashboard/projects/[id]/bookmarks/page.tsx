import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BookmarksPage() {
  const isEmpty = true;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookmarks</CardTitle>
        <CardDescription>
          A collection of useful links, articles, and development resources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-muted-foreground">
                You haven't saved any bookmarks for this project yet.
              </p>
              <Button>Add Bookmark</Button>
            </div>
          </div>
        ) : (
          <div>
            {/* This is where the list of bookmarks would be rendered */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
