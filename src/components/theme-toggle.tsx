// src/components/theme-toggle.tsx

"use client"

import { Moon, Sun } from "lucide-react" // Importing icons for sun and moon

import { Button } from "@/components/ui/button" // Importing a custom Button component
import { useTheme } from "@/components/theme-provider" // Importing the custom theme hook
import {
  DropdownMenu, // Importing the DropdownMenu component
  DropdownMenuContent, // Importing the content container for the dropdown menu
  DropdownMenuItem, // Importing individual items within the dropdown menu
  DropdownMenuTrigger, // Importing the element that triggers the dropdown menu
} from "./ui/dropdown-menu" // Importing UI components for the dropdown menu

// ThemeToggle component for switching between light and dark themes
export function ThemeToggle() {
  // Using the useTheme hook to access the setTheme function from the theme context
  const { setTheme } = useTheme()

  return (
    // DropdownMenu component to wrap the theme toggle functionality
    <DropdownMenu>
      {/* DropdownMenuTrigger as a button to open the dropdown */}
      <DropdownMenuTrigger asChild>
        {/* Button with ghost variant and icon size */}
        <Button variant="ghost" size="icon">
          {/* Sun icon, visible in light mode and hidden in dark mode with transitions */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          {/* Moon icon, hidden in light mode and visible in dark mode with transitions */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {/* Screen reader only text for accessibility */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {/* Content of the dropdown menu, aligned to the end */}
      <DropdownMenuContent align="end">
        {/* Dropdown menu item for selecting light theme */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        {/* Dropdown menu item for selecting dark theme */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
