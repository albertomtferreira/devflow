// src/hooks/use-mobile.tsx
import * as React from "react"

// Define the mobile breakpoint width
const MOBILE_BREAKPOINT = 768

// Custom hook to determine if the current screen width is considered mobile
export function useIsMobile() {
  // State variable to store the mobile status. Initially undefined.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Create a media query list to listen for screen width changes below the mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Define the event handler function that updates the state based on the current window width
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add the event listener to the media query list
    mql.addEventListener("change", onChange)
    
    // Set the initial state based on the current window width
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Clean up the event listener when the component unmounts
    return () => mql.removeEventListener("change", onChange)
  }, []) // The empty dependency array ensures this effect runs only once on mount

  // Return the boolean representation of the isMobile state. The !! converts undefined to false.
  return !!isMobile
}
