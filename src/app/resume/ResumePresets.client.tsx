"use client";

import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResumePreset } from "./resume-presets";

interface ResumePresetsProps {
  presets: ResumePreset[];
}

export function ResumePresets({ presets }: ResumePresetsProps) {
  const handlePrintResume = (pdfPath: string) => {
    const previewWindow = window.open(pdfPath, "_blank", "noopener,noreferrer");
    previewWindow?.focus();
  };

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {presets.map((preset) => (
        <div
          key={preset.id}
          className="relative flex flex-col items-start p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{preset.emoji}</span>
            <h3 className="text-foreground font-medium">{preset.title}</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {preset.description}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => handlePrintResume(preset.pdfPath)}
              aria-label={`Preview and print ${preset.title} resume`}
              title="Preview & Print"
            >
              <Printer className="size-4" aria-hidden="true" />
            </Button>
            <a
              href={preset.pdfPath}
              download
              aria-label={`Download ${preset.title} resume`}
              title="Download PDF"
              className="inline-flex items-center justify-center size-8 rounded-[min(var(--radius-md),10px)] border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-foreground dark:hover:bg-muted/50"
            >
              <Download className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
