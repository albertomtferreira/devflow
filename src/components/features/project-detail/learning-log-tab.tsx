import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LearningLogTab() {
  return (
    <Card>
      <CardHeader>
          <CardTitle>Project-Specific Learning Log</CardTitle>
      </CardHeader>
      <CardContent>
          <p className="text-muted-foreground">Log your learnings, challenges, and solutions encountered while working on this project.</p>
      </CardContent>
    </Card>
  )
}
