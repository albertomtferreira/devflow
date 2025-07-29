import { AddSnippetDialog } from "@/components/features/code-vault/add-snippet-dialog";
import { CodeSnippetCard } from "@/components/features/code-vault/code-snippet-card";

const mockSnippet = {
  id: '1',
  title: 'useLocalStorage.ts',
  description: 'A custom hook for managing component state with local storage persistence.',
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
`,
  language: 'typescript',
  tags: ['react', 'hook', 'state'],
};


export default function CodeVaultPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Code Vault</h2>
        <AddSnippetDialog />
      </div>
      <div>
        <CodeSnippetCard snippet={mockSnippet} />
      </div>
    </div>
  )
}
