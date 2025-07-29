import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BookmarksTab() {
  return (
    <Card>
      <CardHeader>
          <CardTitle>Project Bookmarks</CardTitle>
      </CardHeader>
      <CardContent>
          <p className="text-muted-foreground">Save and categorize links to documentation, articles, and other resources relevant to this project.</p>
      </CardContent>
    </Card>
  )
}
