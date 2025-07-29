import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type ProjectStatus = 'online' | 'offline' | 'in-progress';

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string | null;
  repoUrl?: string | null;
  status?: ProjectStatus;
};

const statusClasses: Record<ProjectStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-red-500',
  'in-progress': 'bg-yellow-500',
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{project.title}</CardTitle>
          {project.status && (
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'h-3 w-3 rounded-full',
                      statusClasses[project.status] ?? 'bg-gray-400'
                    )}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="capitalize">{project.status.replace('-', ' ')}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <CardDescription className="line-clamp-2 pt-1">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button asChild>
          <Link href={`/dashboard/projects/${project.id}`}>View Project</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
