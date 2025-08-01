// src/app/dashboard/projects/[id]/roadmap/page.tsx
import ProjectsDetailsHeader from "@/components/projects/global/projects-details-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import fs from "fs/promises";
import path from "path";

export default async function RoadmapPage() {
  const roadmapPath = path.join(process.cwd(), "ROADMAP.md");
  const roadmapContent = await fs.readFile(roadmapPath, "utf-8");

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <ProjectsDetailsHeader title={"Roadmap"} buttonText={"Save Roadmap"} />
        <CardDescription>
          Track your project's progress with a markdown-style task list and
          changelog.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <Textarea
          readOnly
          defaultValue={roadmapContent}
          className="flex-1 w-full font-code text-sm bg-muted/40 min-h-[400px]"
        />
      </CardContent>
    </Card>
  );
}
