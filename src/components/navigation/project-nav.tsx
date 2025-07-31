// src/components/navigation/project-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Overview", href: "/overview" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Code Vault", href: "/code-vault" },
  { name: "Learning Log", href: "/learning-log" },
  { name: "Bookmarks", href: "/bookmarks" },
  { name: "Files", href: "/files" },
  { name: "Versions", href: "/versions" },
  { name: "GitHub", href: "/github", disabled: true },
];

export function ProjectNav({ projectId }: { projectId: string }) {
  const pathname = usePathname();

  return (
    <nav
      className="-mb-px flex justify-between space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide"
      aria-label="Tabs"
    >
      {navLinks.map((link) => {
        const fullHref = `/dashboard/projects/${projectId}${link.href}`;
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
  );
}
