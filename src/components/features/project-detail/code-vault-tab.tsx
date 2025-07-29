import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CodeVaultTab() {
  return (
    <Card>
      <CardHeader>
          <CardTitle>Project-Specific Code Vault</CardTitle>
      </CardHeader>
      <CardContent>
          <p className="text-muted-foreground">Here you could see and manage code snippets that are specifically related to this project.</p>
      </CardContent>
    </Card>
  )
}
