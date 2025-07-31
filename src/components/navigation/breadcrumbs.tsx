// src/components/navigation/breadcrumbs.tsx

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// Function to generate breadcrumbs from pathname
export const generateBreadcrumbs = (path: string) => {
  const segments = path.split("/").filter(Boolean);
  const breadcrumbs = [];

  // Handle root dashboard
  if (
    segments.length === 0 ||
    (segments.length === 1 && segments[0] === "dashboard")
  ) {
    return [{ name: "Dashboard", path: "/dashboard", isLast: true }];
  }

  // Build breadcrumbs
  let currentPath = "";
  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;

    // Skip the first 'dashboard' segment for cleaner breadcrumbs
    if (segments[i] === "dashboard" && i === 0) {
      continue;
    }

    let displayName = segments[i];

    // Custom display names for specific routes
    switch (segments[i]) {
      case "projects":
        displayName = "Projects";
        break;
      case "settings":
        displayName = "Settings";
        break;
      case "1":
        displayName = "My Awesome App";
        break;
      case "2":
        displayName = "Data Visualizer";
        break;
      case "3":
        displayName = "Learning Go";
        break;
      default:
        // Capitalize first letter and replace hyphens/underscores with spaces
        displayName = segments[i]
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
    }

    breadcrumbs.push({
      name: displayName,
      path: currentPath,
      isLast: i === segments.length - 1,
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
  // Handle the case where items is a string (like "Dashboard")
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
