// src/components/navigation/breadcrumbs.tsx

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// Consider something an "ID-like token" if:
// - All alphanumeric (optionally with dashes/underscores)
// - AND length is >= 15 (to catch long random IDs)
// - AND not purely alphabetic words
const isIdLike = (seg: string) => {
  if (!/[a-zA-Z]/.test(seg)) return true; // only digits → numeric ID
  if (/^[a-f0-9-]{8,}$/i.test(seg)) return true; // UUID/hex
  if (/^[A-Za-z0-9_-]{15,}$/.test(seg)) return true; // Firestore-style random IDs
  return false;
};

const toTitle = (seg: string) =>
  seg.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export const generateBreadcrumbs = (path: string) => {
  const segments = path.split("/").filter(Boolean);
  const breadcrumbs: { name: string; path: string; isLast: boolean }[] = [];

  let currentPath = "";

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    currentPath += `/${seg}`;

    // Skip leading 'dashboard' for cleaner breadcrumbs
    if (i === 0 && seg === "dashboard") continue;

    // If not a "word" (e.g., numeric or uuid-ish project ID), don't render it
    if (isIdLike(segments[i])) continue;

    const isLast = i === segments.length - 1;

    breadcrumbs.push({
      name: toTitle(seg),
      path: currentPath,
      isLast,
    });
  }

  return breadcrumbs;
};

interface BreadcrumbItem {
  name: string;
  path: string;
  isLast: boolean;
}

export function Breadcrumb({
  items,
  className,
}: {
  items: BreadcrumbItem[] | string;
  className?: string;
}) {
  if (typeof items === "string") {
    return (
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <span className="font-medium text-foreground">{items}</span>
      </nav>
    );
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex items-center gap-1.5">
        {/* Always show Dashboard as the first item */}
        <li className="flex items-center gap-1.5">
          <Link
            href="/dashboard"
            className="font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          {items.length > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {item.isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.path}
                className="font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )}
            {!item.isLast && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
