export interface NavLinks{
    name: string;
    href: string;
    disabled?: boolean;
}


export const projectsNavLinks: NavLinks[] = [
    { name: "Overview", href: "/overview" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "Code Vault", href: "/code-vault" },
    { name: "Learning Log", href: "/learning-log" },
    { name: "Bookmarks", href: "/bookmarks" },
    { name: "Files", href: "/files" },
    { name: "Versions", href: "/versions" },
    { name: "GitHub", href: "/github", disabled: true },
  ];