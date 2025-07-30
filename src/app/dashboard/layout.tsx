// src/app/dashboard/layout.tsx

'use client';

import { SidebarLayout } from '@/components/navigation/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarLayout>
      {children}
     </SidebarLayout>
    </>

  );
}