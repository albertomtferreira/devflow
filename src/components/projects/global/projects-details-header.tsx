"use client";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { AddSnippetDialog } from "../code-vault/add-snippet-dialog";
import { useState } from "react";
import {
  PlusCircle,
  FileText,
  GitBranch,
  Upload,
  Bookmark,
  LucideIcon,
  Save,
} from "lucide-react";
import { ProjectsDetailsHeaderProps } from "@/lib/types";

export default function ProjectsDetailsHeader({
  title,
  buttonText,
  onAction,
}: ProjectsDetailsHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const configButtonText = buttonText || "Action";

  // Configuration object with all title settings
  const titleConfigs: Record<
    string,
    {
      buttonText: string;
      action: () => void;
      hasDialog: boolean;
      icon: LucideIcon;
    }
  > = {
    "Code Vault": {
      buttonText: configButtonText,
      action: () => setIsDialogOpen(true),
      hasDialog: true,
      icon: PlusCircle,
    },
    "Learning Log": {
      buttonText: configButtonText,
      action: () => {
        console.log("Opening Learning Log form");
        onAction?.();
      },
      hasDialog: false,
      icon: FileText,
    },
    "Version History": {
      buttonText: configButtonText,
      action: () => {
        console.log("Opening Version History form");
        onAction?.();
      },
      hasDialog: false,
      icon: GitBranch,
    },
    Roadmap: {
      buttonText: configButtonText,
      action: () => {
        console.log("Saving Roadmap");
        onAction?.();
      },
      hasDialog: false,
      icon: Save,
    },
    "Files and Assets": {
      buttonText: configButtonText,
      action: () => {
        console.log("Uploading File");
        onAction?.();
      },
      hasDialog: false,
      icon: Upload,
    },
    Bookmarks: {
      buttonText: configButtonText,
      action: () => {
        console.log("Adding Bookmark");
        onAction?.();
      },
      hasDialog: false,
      icon: Bookmark,
    },
  };

  const config = titleConfigs[title];

  const handleClick = () => {
    if (config?.action) {
      config.action();
    } else {
      // Default fallback
      console.log(`Default action for ${title}`);
      onAction?.();
    }
  };

  const getButtonText = () => {
    return buttonText || config?.buttonText || "Action";
  };

  const ButtonIcon = config?.icon;

  return (
    <>
      <div className="flex items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button onClick={handleClick}>
          {ButtonIcon && <ButtonIcon className="mr-2 h-4 w-4" />}
          {getButtonText()}
        </Button>
      </div>

      {/* Render dialog only for Code Vault */}
      {config?.hasDialog && (
        <AddSnippetDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </>
  );
}
