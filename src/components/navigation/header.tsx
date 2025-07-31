// src/components/navigation/header.tsx
"use client";
import { usePathname } from "next/navigation";
import { Breadcrumb, generateBreadcrumbs } from "./breadcrumbs";
import { SidebarTrigger } from "../ui/sidebar";

export function Header() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />
      <Breadcrumb items={breadcrumbs} />
    </header>
  );
}
