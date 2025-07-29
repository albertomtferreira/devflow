import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RoadmapTab() {
  return (
    <Card>
      <CardHeader>
          <CardTitle>Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
          <p className="text-muted-foreground">A markdown editor or a Kanban board would be implemented here to create and track project roadmaps and changelogs.</p>
      </CardContent>
    </Card>
  )
}
