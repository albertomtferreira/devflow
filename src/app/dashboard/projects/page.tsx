// src/app/dashboard/projects/page.tsx

"use client";
import { redirect } from "next/navigation";

export default function ProjectsRootPage() {
  // By default, redirect to the overview page for a project.
  redirect(`/dashboard/`);
}
