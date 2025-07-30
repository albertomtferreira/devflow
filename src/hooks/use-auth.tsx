// src/hooks/use-auth.tsx

'use client';

// Import necessary React hooks and types
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {User, onAuthStateChanged, signOut} from 'firebase/auth';
// Import Firebase authentication instance
import {auth} from '@/lib/firebase';
import {useRouter, usePathname} from 'next/navigation';
import { useToast } from './use-toast';

// Define the type for the authentication context
interface AuthContextType {
  user: User | null; // The authenticated user object or null
  loading: boolean; // Indicates if the authentication state is still loading
  logout: () => Promise<void>; // Add logout function to context
}

// Create the authentication context with initial values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {}, // Default empty function
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update the user state when authentication state changes
      setUser(user);
      // Set loading to false once the initial authentication state is determined
      setLoading(false);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // If still loading, do nothing
    if (loading) return;

    // Check if the current path is an authentication-related page
    const isAuthPage = pathname === '/sign-in' || pathname === '/';
    
    // If there is no authenticated user and the current page is not an auth page,
    // redirect to the sign-in page.
    if (!user && !isAuthPage) {
      router.push('/sign-in');
    }
  }, [user, loading, pathname, router]);

  // Define logout function inside the provider where hooks can be used
  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/sign-in');
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error signing out',
        description: 'There was a problem signing out. Please try again.',
      });
    }
  };

  return (
    // Provide the authentication context value to the children components
    <AuthContext.Provider value={{user, loading, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Throw an error if the hook is used outside of an AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};