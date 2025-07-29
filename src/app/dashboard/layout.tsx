'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  // Simplified layout for debugging
  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Placeholder for sidebar */}
      <div className="w-64 bg-background border-r">
        <div className="p-4 font-bold">Sidebar Area</div>
      </div>
      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-4 border-b bg-background px-4">
          {/* Placeholder for header content */}
          <div>User Menu</div>
        </header>
        <div className="flex-1 p-6">
            {children}
        </div>
      </main>
    </div>
  );
}
