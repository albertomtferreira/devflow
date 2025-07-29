import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VersionsTab() {
  return (
    <Card>
      <CardHeader>
          <CardTitle>Version History</CardTitle>
      </CardHeader>
      <CardContent>
          <p className="text-muted-foreground">This area would display a log of project versions, deployments, and changelogs, possibly integrated with Git tags or a CI/CD pipeline.</p>
      </CardContent>
    </Card>
  )
}
