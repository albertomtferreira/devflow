import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Curate Your Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center py-12">
            <Bookmark className="h-16 w-16 text-muted-foreground mb-4"/>
            <h2 className="text-2xl font-semibold">Coming Soon</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              The Bookmark Manager will allow you to save, tag, and organize useful development resources, articles, and documentation from around the web.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
