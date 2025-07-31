// src/app/dashboard/layout.tsx
"use client";
import * as React from "react";
import { Header } from "@/components/navigation/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/sidebar-nav";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider>
        {/* Sidebar with fixed height and own scroll */}
        <div className="relative">
          <AppSidebar />
        </div>

        {/* Main content area with own scroll */}
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="animate-in fade-in-50 duration-500">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
