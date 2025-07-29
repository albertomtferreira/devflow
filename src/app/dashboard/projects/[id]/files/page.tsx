import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FilesPage() {
  return (
    <Card>
      <CardHeader>
          <CardTitle>Project Files</CardTitle>
      </CardHeader>
      <CardContent>
          <p className="text-muted-foreground">A file management system would be here, likely integrated with Firebase Storage, to handle project-related assets.</p>
      </CardContent>
    </Card>
  )
}
