import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="container mx-auto">
       <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of your workspace.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <Label htmlFor="theme">Theme</Label>
                    <ThemeToggle />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                    Select a light or dark theme for the application. More customization options will be available soon.
                </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
