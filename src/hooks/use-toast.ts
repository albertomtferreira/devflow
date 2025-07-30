// src/hooks/use-toast.ts

"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Limit the number of toasts displayed at once
const TOAST_LIMIT = 1
// Delay before removing a toast (set very high here)
const TOAST_REMOVE_DELAY = 1000000

// Define the structure of a toast object, extending ToastProps
type ToasterToast = ToastProps & {
  id: string // Unique identifier for the toast
  title?: React.ReactNode // Optional title for the toast
  description?: React.ReactNode // Optional description for the toast
  action?: ToastActionElement // Optional action button for the toast
}

// Define the types of actions that can be dispatched to the reducer
const actionTypes = {
  ADD_TOAST: "ADD_TOAST", // Add a new toast
  UPDATE_TOAST: "UPDATE_TOAST", // Update an existing toast
  DISMISS_TOAST: "DISMISS_TOAST", // Dismiss a toast (visually hide it)
  REMOVE_TOAST: "REMOVE_TOAST", // Remove a toast from the state
} as const

// Counter for generating unique toast IDs
let count = 0

// Function to generate a unique ID for each toast
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Type for the action types
type ActionType = typeof actionTypes

// Union type for all possible actions
type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

// Interface for the state managed by the reducer
interface State {
  toasts: ToasterToast[] // Array of active toasts
}

// Map to store timeouts for dismissing toasts
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Function to add a toast to the remove queue (with a delay)
const addToRemoveQueue = (toastId: string) => {
  // If a timeout already exists for this toast, do nothing
  if (toastTimeouts.has(toastId)) {
    return
  }

  // Set a timeout to dispatch the REMOVE_TOAST action after the specified delay
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  // Store the timeout ID in the map
  toastTimeouts.set(toastId, timeout)
}

// Reducer function to manage the state based on dispatched actions
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // Add the new toast to the beginning of the array and slice to the limit
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      // Update the specific toast in the array
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      // Add the toast(s) to the remove queue
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        // If no toastId is provided, dismiss all toasts
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      // Update the toast(s) to set their 'open' property to false (visually hide them)
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      // Remove the toast(s) from the state based on their id
      if (action.toastId === undefined) {
        // If no toastId is provided, remove all toasts
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Array to hold listeners that will be notified when the state changes
const listeners: Array<(state: State) => void> = []

// In-memory state, initially empty
let memoryState: State = { toasts: [] }

// Function to dispatch an action and update the state, notifying listeners
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Type for creating a new toast (omits the id)
type Toast = Omit<ToasterToast, "id">

// Function to create and display a new toast
function toast({ ...props }: Toast) {
  // Generate a unique ID for the toast
  const id = genId()

  // Function to update the toast
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  // Function to dismiss the toast
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Dispatch the ADD_TOAST action to add the new toast to the state
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      // When the toast is closed visually, dismiss it
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  // Return the toast ID and the update/dismiss functions
  return {
    id: id,
    dismiss,
    update,
  }
}

// Custom hook to access the toast state and functions
function useToast() {
  // Use the state hook to subscribe to state changes
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // Add the setState function as a listener
    listeners.push(setState)
    
    // Clean up the listener when the component unmounts
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state]) // Rerun the effect if the state changes (although this dependency might be removed)

  // Return the current toast state and the toast/dismiss functions
  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

// Export the useToast hook and the toast function
export { useToast, toast }
