import { CodeSnippetCard } from '@/components/code-snippet-card';
import { AddSnippetDialog } from '@/components/add-snippet-dialog';

const mockSnippets = [
  {
    id: '1',
    title: 'React Custom Hook: useDebounce',
    description: 'A custom hook to debounce a value. Useful for performance optimization on inputs.',
    code: `import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
    language: 'typescript',
    tags: ['react', 'hook', 'debounce', 'performance'],
  },
  {
    id: '2',
    title: 'Python Flask Route',
    description: 'A basic hello world route in a Python Flask application.',
    code: `from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)`,
    language: 'python',
    tags: ['python', 'flask', 'api', 'backend'],
  },
];

export default function CodeVaultPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Code Vault</h1>
        <AddSnippetDialog />
      </div>
      <div className="grid gap-6">
        {mockSnippets.map((snippet) => (
          <CodeSnippetCard key={snippet.id} snippet={snippet} />
        ))}
        {mockSnippets.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-semibold">Your vault is empty</h3>
            <p className="text-muted-foreground mt-2">Add your first code snippet to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
