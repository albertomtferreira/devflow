//src/app/dashboard/page.tsx

"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/hooks/use-auth';
import { mockProjects } from '@/lib/mock-data';
import { projectStatusConfig } from '@/lib/types';
import { cn } from '@/lib/utils';
import { PlusCircle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();


  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    router.push('/sign-in');
    return null;
  }
  return (
    <div>
  <div className="flex items-center justify-between mb-6">
    <h1>Projects</h1>
    <Button>New Project</Button>
  </div>
       <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>
            A list of all the projects you are working on.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="w-[150px]">Status</TableHead>
                <TableHead className="w-[150px]">Role</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {project.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                         <span className={cn("h-2 w-2 rounded-full", projectStatusConfig[project.status].className)} />
                         <span>{projectStatusConfig[project.status].text}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.role}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/projects/${project.id}`}>
                            <ArrowUpRight className="h-4 w-4" />
                            <span className="sr-only">View Project</span>
                        </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
