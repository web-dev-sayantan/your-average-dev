"use client";

import { Download, FileText, Printer, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ResumePreset {
  id: string;
  title: string;
  emoji: string;
  description: string;
  pdfPath: string;
}

const resumePresets: ResumePreset[] = [
  {
    id: "frontend",
    title: "Frontend Engineer",
    emoji: "🎨",
    description: "React, Angular, and enough CSS to make designers cry",
    pdfPath: "/resumes/sayantan-dey_frontend-engineer_2026.pdf",
  },
  {
    id: "backend",
    title: "Backend Engineer",
    emoji: "⚙️",
    description: "APIs, databases, and the dark arts of server management",
    pdfPath: "/resumes/sayantan-dey_frontend-engineer_2026.pdf",
  },
  {
    id: "fullstack",
    title: "Full Stack Engineer",
    emoji: "🥞",
    description: "Jack of all trades, master of... some? Maybe?",
    pdfPath: "/resumes/sayantan-dey_frontend-engineer_2026.pdf",
  },
  {
    id: "java",
    title: "Java Developer",
    emoji: "☕",
    description:
      "public static void main... just kidding, I don't do this anymore",
    pdfPath: "/resumes/sayantan-dey_frontend-engineer_2026.pdf",
  },
  {
    id: "javascript",
    title: "JavaScript Developer",
    emoji: "🟨",
    description: "undefined is not a function, but I am",
    pdfPath: "/resumes/sayantan-dey_frontend-engineer_2026.pdf",
  },
  {
    id: "ai-engineer",
    title: "AI-Powered Engineer",
    emoji: "🤖",
    description: "I talk to Claude more than I talk to humans",
    pdfPath: "/resumes/sayantan-dey_frontend-engineer_2026.pdf",
  },
];

export default function ResumePage() {
  const [jobRequirements, setJobRequirements] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handlePrintResume = (pdfPath: string) => {
    const previewWindow = window.open(pdfPath, "_blank", "noopener,noreferrer");
    previewWindow?.focus();
  };

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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="w-full">
          <p className="text-lg flex items-baseline">
            Resumes, plural.{" "}
            <span className="dark:hidden text-red-500 text-normal px-3">
              Light mode hurts! 😵
            </span>
          </p>
          <p className="mt-3 text-muted-foreground">
            I don't know anyone who uses{" "}
            <span className="text-foreground">one resume</span> anymore. Half of
            OpenAI's revenue comes from people using ChatGPT to tailor their
            resume for every job they apply to. So here are a bunch of pre-baked
            versions of me, optimized for different roles.
          </p>
          <p className="mt-2 text-muted-foreground italic">
            Pick one, print it, pretend I'm the perfect fit. 🎭
          </p>

          <div className="mt-10 group">
            <h2 className="flex flex-wrap items-center text-foreground text-lg">
              <FileText className="size-5 mr-2" />
              Preset Resumes &nbsp;
              <span className="text-sm text-destructive opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                ( All are same now, when I learn all, I'll make them different.
                )
              </span>
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Preview/print or download the PDF. Yes, it's that simple.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {resumePresets.map((preset) => (
                <div
                  key={preset.id}
                  className="relative flex flex-col items-start p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{preset.emoji}</span>
                    <h3 className="text-foreground font-medium">
                      {preset.title}
                    </h3>
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
                      <Printer className="size-4" />
                    </Button>
                    <a
                      href={preset.pdfPath}
                      download
                      aria-label={`Download ${preset.title} resume`}
                      title="Download PDF"
                      className="inline-flex items-center justify-center size-8 rounded-[min(var(--radius-md),10px)] border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-foreground dark:hover:bg-muted/50"
                    >
                      <Download className="size-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="flex items-center text-foreground text-lg">
              <Wand2 className="size-5 mr-2" />
              Custom Tailored Resume
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Paste the job requirements below and let AI work its magic. ✨
            </p>

            <div className="mt-4">
              <label htmlFor="job-requirements" className="sr-only">
                Job Requirements
              </label>
              <textarea
                id="job-requirements"
                value={jobRequirements}
                onChange={(e) => setJobRequirements(e.target.value)}
                placeholder="Paste the job description here... 

e.g., 'Looking for a Senior Frontend Engineer with 5+ years of React experience, expertise in TypeScript, and a passion for building scalable design systems...'"
                className="w-full h-40 p-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                aria-label="Job requirements"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Button
                onClick={handleGenerateTailored}
                disabled={!jobRequirements.trim() || isGenerating}
                className="gap-2"
              >
                <Sparkles className="size-4" />
                {isGenerating ? "Generating..." : "Generate & Print"}
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
          </div>

          <div className="mt-12 p-4 rounded-lg border border-dashed border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Pro tip:</span>{" "}
              These resumes are designed to be printer-friendly. Just click,
              Ctrl/Cmd + P, and you're done. No need to download PDFs like it's
              2010.
            </p>
          </div>

          <p className="mt-8 text-muted-foreground text-sm">
            All resumes contain the same mediocre truth about me, just wrapped
            differently. 😅
          </p>
        </section>
      </main>
    </div>
  );
}
