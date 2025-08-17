// src/components/projects/status-template-selector.tsx
"use client";

import { useState } from "react";
import { StatusTemplate, STATUS_TEMPLATES, STATUS_COLORS } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusTemplateSelectorProps {
  selectedTemplate?: string;
  onTemplateSelect: (templateId: string) => void;
}

export function StatusTemplateSelector({
  selectedTemplate,
  onTemplateSelect,
}: StatusTemplateSelectorProps) {
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const toggleExpanded = (templateId: string) => {
    setExpandedTemplate(expandedTemplate === templateId ? null : templateId);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Choose a Status Template</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select a template that matches your project workflow. You can
          customize these statuses later.
        </p>
      </div>

      <div className="grid gap-3">
        {STATUS_TEMPLATES.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedTemplate === template.id
                ? "ring-2 ring-primary border-primary/50 bg-primary/5"
                : "hover:border-primary/30"
            )}
            onClick={() => onTemplateSelect(template.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {template.name}
                    {selectedTemplate === template.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {template.description}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpanded(template.id);
                  }}
                  className="text-xs"
                >
                  {expandedTemplate === template.id ? "Hide" : "Preview"}
                </Button>
              </div>
            </CardHeader>

            {/* Status Preview */}
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {template.statuses
                  .slice(0, expandedTemplate === template.id ? undefined : 4)
                  .map((status, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs flex items-center gap-1.5"
                    >
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          STATUS_COLORS[
                            status.color as keyof typeof STATUS_COLORS
                          ]?.class || "bg-gray-500"
                        )}
                      />
                      {status.label}
                      {status.isDefault && (
                        <span className="text-[10px] text-muted-foreground">
                          (default)
                        </span>
                      )}
                    </Badge>
                  ))}
                {expandedTemplate !== template.id &&
                  template.statuses.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.statuses.length - 4} more
                    </Badge>
                  )}
              </div>

              {/* Expanded status details */}
              {expandedTemplate === template.id && (
                <div className="mt-3 space-y-2 border-t pt-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status Descriptions:
                  </h4>
                  <div className="space-y-1">
                    {template.statuses.map((status, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-xs"
                      >
                        <span
                          className={cn(
                            "h-3 w-3 rounded-full mt-0.5 flex-shrink-0",
                            STATUS_COLORS[
                              status.color as keyof typeof STATUS_COLORS
                            ]?.class || "bg-gray-500"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-medium">{status.label}</span>
                          {status.isDefault && (
                            <span className="text-muted-foreground ml-1">
                              (default)
                            </span>
                          )}
                          {status.description && (
                            <div className="text-muted-foreground mt-0.5">
                              {status.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
