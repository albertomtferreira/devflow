import { CodeSnippetCard } from "@/components/features/code-vault/code-snippet-card";
import FeaturesHeader from "@/components/features/dashboard/features-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mockSnippet = {
  id: "1",
  title: "useLocalStorage.ts",
  description:
    "A custom hook for managing component state with local storage persistence.",
  code: `'use client';
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
  function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
  
`,
  language: "typescript",
  tags: ["react", "hook", "state"],
};

export default async function CodeVaultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isEmpty = false;

  return (
    <>
      <Card>
        <CardHeader>
          <FeaturesHeader title={"Code Vault"} buttonText={"Add Snippet"} />
          <CardDescription>
            A searchable and taggable repository for your most-used code
            snippets, custom hooks, and helpful functions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEmpty ? (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-muted-foreground">
                  Your learning log for this project is empty.
                </p>
                <Button>Add New Note</Button>
              </div>
            </div>
          ) : (
            <div>
              <CodeSnippetCard snippet={mockSnippet} />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
