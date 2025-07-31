// src/components/navigation/project-details-nav.tsx
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { projectsDetailsNavLinks } from "@/lib/nav-links-projects";

export function ProjectsDetailsNav() {
  
  const pathname = usePathname();
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="flex-shrink-0 mb-6 border-b">
          <nav
      className="-mb-px flex justify-between space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide"
      aria-label="Tabs"
    >
      {projectsDetailsNavLinks.map((link) => {
        const fullHref = `/dashboard/projects/${id}${link.href}`;
        const isActive = pathname === fullHref;
        return (
          <Link
            key={link.name}
            href={link.disabled ? "#" : fullHref}
            className={cn(
              "whitespace-nowrap py-3 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
              link.disabled && "pointer-events-none opacity-50"
            )}
            aria-current={isActive ? "page" : undefined}
            aria-disabled={link.disabled}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
    </div>

  );
}
