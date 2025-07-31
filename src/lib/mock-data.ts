// src/lib/mock-data.ts

import { BookOpen, PieChart, Rocket } from "lucide-react";
import { Project, Snippet, NavItem } from "./types";


// Mock Data
export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description: "A personal portfolio to showcase my skills and projects.",
    status: "online",
    role: "Owner",
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    skills: ["Frontend Development", "UI/UX Design", "Responsive Design", "SEO"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/example/portfolio",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A full-stack task manager with user authentication.",
    status: "in-progress",
    role: "Contributor",
  },
  {
    id: "3",
    title: "E-commerce Store API",
    description: "A RESTful API for an online store, built with Node.js.",
    status: "offline",
    role: "Owner",
  },
  {
    id: "4",
    title: "Markdown Blog",
    description: "A static-generated blog created with Astro.",
    status: "crashed",
    role: "Owner",
  },
];

export const mockSnippet: Snippet = {
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
`,
  language: "typescript",
  tags: ["react", "hook", "state"],
};


export const projectNavItems: NavItem[] = [
    {
      id: "1",
      title: "Portfolio Website",
      icon: Rocket,
      href: "/dashboard/projects/1",
    },
    {
      id: "2",
      title: "Task Management App",
      icon: PieChart,
      href: "/dashboard/projects/2",
    },
    {
      id: "3",
      title: "E-commerce Store API",
      icon: BookOpen,
      href: "/dashboard/projects/3",
    },
  ];
