"use client";

import { FileText, Sparkles, Wand2 } from "lucide-react";
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
    pdfPath: "/resumes/frontend-engineer.pdf",
  },
  {
    id: "backend",
    title: "Backend Engineer",
    emoji: "⚙️",
    description: "APIs, databases, and the dark arts of server management",
    pdfPath: "/resumes/backend-engineer.pdf",
  },
  {
    id: "fullstack",
    title: "Full Stack Engineer",
    emoji: "🥞",
    description: "Jack of all trades, master of... some? Maybe?",
    pdfPath: "/resumes/fullstack-engineer.pdf",
  },
  {
    id: "java",
    title: "Java Developer",
    emoji: "☕",
    description:
      "public static void main... just kidding, I don't do this anymore",
    pdfPath: "/resumes/java-developer.pdf",
  },
  {
    id: "javascript",
    title: "JavaScript Developer",
    emoji: "🟨",
    description: "undefined is not a function, but I am",
    pdfPath: "/resumes/javascript-developer.pdf",
  },
  {
    id: "ai-engineer",
    title: "AI-Powered Engineer",
    emoji: "🤖",
    description: "I talk to Claude more than I talk to humans",
    pdfPath: "/resumes/ai-engineer.pdf",
  },
];

export default function ResumePage() {
  const [jobRequirements, setJobRequirements] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handlePrintResume = (pdfPath: string) => {
    // TODO: Open the PDF in a new window and trigger print
    // For now, this is a placeholder that will open print preview
    window.print();
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
            Because let's be real, nobody uses{" "}
            <span className="text-foreground">one resume</span> anymore. We all
            ask ChatGPT to tailor our resume for every job we apply to. So here
            are a bunch of pre-baked versions of me, optimized for different
            roles.
          </p>
          <p className="mt-2 text-muted-foreground italic">
            Pick one, print it, pretend I'm the perfect fit. 🎭
          </p>

          <div className="mt-10">
            <h2 className="flex items-center text-foreground text-lg">
              <FileText className="size-5 mr-2" />
              Preset Resumes &nbsp;
              <span className="text-sm text-muted-foreground">
                ( None works right now, but will someday )
              </span>
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Click to open print preview. Yes, it's that simple.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {resumePresets.map((preset) => (
                <button
                  type="button"
                  key={preset.id}
                  onClick={() => handlePrintResume(preset.pdfPath)}
                  className="group relative flex flex-col items-start p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{preset.emoji}</span>
                    <h3 className="text-foreground font-medium group-hover:underline underline-offset-4">
                      {preset.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {preset.description}
                  </p>
                  <span className="absolute top-3 right-3 text-muted-foreground/50 group-hover:text-foreground transition-colors">
                    <FileText className="size-4" />
                  </span>
                </button>
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
              <textarea
                value={jobRequirements}
                onChange={(e) => setJobRequirements(e.target.value)}
                placeholder="Paste the job description here... 

e.g., 'Looking for a Senior Frontend Engineer with 5+ years of React experience, expertise in TypeScript, and a passion for building scalable design systems...'"
                className="w-full h-40 p-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              />
            </div>

            <div className="mt-4 flex items-center gap-4">
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
