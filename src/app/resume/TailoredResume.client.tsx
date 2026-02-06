"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function TailoredResume() {
  const [jobRequirements, setJobRequirements] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerateTailored = () => {
    if (!jobRequirements.trim()) return;

    setIsGenerating(true);
    // TODO: Integrate with AI to generate tailored resume
    // Placeholder: simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      // TODO: Open generated PDF in print preview

      // window.print();
    }, 2000);
  };

  return (
    <>
      <div className="mt-4">
        <label htmlFor="job-requirements" className="sr-only">
          Job Requirements
        </label>
        <textarea
          id="job-requirements"
          name="jobRequirements"
          value={jobRequirements}
          onChange={(e) => setJobRequirements(e.target.value)}
          autoComplete="off"
          placeholder={`Paste the job description here… 

e.g., 'Looking for a Senior Frontend Engineer with 5+ years of React experience, expertise in TypeScript, and a passion for building scalable design systems…'`}
          className="w-full h-40 p-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-[color,background-color,border-color,box-shadow]"
          aria-label="Job requirements"
        />
      </div>

      <div
        className="mt-4 flex flex-wrap items-center gap-4"
        aria-live="polite"
      >
        <Button
          onClick={handleGenerateTailored}
          disabled={!jobRequirements.trim() || isGenerating}
          className="gap-2"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          {isGenerating ? "Generating…" : "Generate & Print"}
        </Button>
        {!jobRequirements.trim() && (
          <span className="text-sm text-muted-foreground">
            Paste something first, I'm not a mind reader 🔮
          </span>
        )}
        {jobRequirements.trim() && isGenerated && (
          <span className="text-sm text-destructive">
            You think I'll really burn tokens for this? 😤
          </span>
        )}
      </div>
    </>
  );
}
