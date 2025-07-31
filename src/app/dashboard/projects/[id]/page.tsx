'use client';
import { redirect } from 'next/navigation';

export default function ProjectDetailRootPage({ params }: { params: { id: string } }) {
  // By default, redirect to the overview page for a project.
  redirect(`/dashboard/projects/${params.id}/overview`);
  
}
