// src/components/theme-provider.tsx

"use client"
import React, { createContext, useContext, useEffect, useState } from "react"

// Define the possible theme types
type Theme = "dark" | "light"

// Define the props for the ThemeProvider component
type ThemeProviderProps = {
  children: React.ReactNode // The components that will have access to the theme context
  defaultTheme?: Theme // The initial theme to use if no theme is found in local storage
  storageKey?: string // The key used to store the theme in local storage
}

// Define the shape of the state managed by the ThemeProvider
type ThemeProviderState = {
  theme: Theme // The current active theme
  setTheme: (theme: Theme) => void // Function to update the theme
}

// Define the initial state for the theme context
const initialState: ThemeProviderState = {
  theme: "light", // Default theme is light
  setTheme: () => null, // Placeholder function for setTheme
}

// Create the React context for the theme
const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// ThemeProvider component that wraps the application and provides the theme context
export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "devflow-ui-theme",
}: ThemeProviderProps) {
  // Use useState to manage the current theme state
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if running in a browser environment
    if (typeof window === "undefined") {
      return defaultTheme // Return default theme if not in browser
    }
    // Get the theme from local storage, or use the default theme if not found
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme
  })

  // Use useEffect to update the document's root class based on the theme
  useEffect(() => {
    const root = window.document.documentElement

    // Remove existing theme classes
    root.classList.remove("light", "dark")
    // Add the current theme class
    root.classList.add(theme)
  }, [theme]) // Rerun this effect whenever the theme state changes

  // Define the value provided by the theme context
  const value = {
    theme,
    setTheme: (theme: Theme) => {
      // Save the selected theme to local storage
      localStorage.setItem(storageKey, theme)
      // Update the theme state
      setTheme(theme)
    },
  }

  // Provide the theme context value to the children components
  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// Custom hook to easily access the theme context
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  // Throw an error if the hook is used outside of a ThemeProvider
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

