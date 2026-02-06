import { FileText, Wand2 } from "lucide-react";
import type { Metadata } from "next";
import { ResumePresets } from "./ResumePresets.client";
import { resumePresets } from "./resume-presets";
import { TailoredResume } from "./TailoredResume.client";
export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download tailored resumes for Frontend, Backend, Full Stack, Java, and JavaScript developer roles.",
  authors: [{ name: "Sayantan Dey" }],
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: "Resume | an_average_dev",
    description:
      "Download tailored resumes for Frontend, Backend, Full Stack, Java, and JavaScript developer roles.",
    url: "/resume",
    type: "profile",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "an_average_dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | an_average_dev",
    description:
      "Download tailored resumes for Frontend, Backend, Full Stack, Java, and JavaScript developer roles.",
    creator: "@no0bdev",
    images: ["/android-chrome-512x512.png"],
  },
};
export default function ResumePage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <section
        id="main-content"
        className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"
      >
        <section className="w-full">
          <h1 className="sr-only">Resumes</h1>
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
              <FileText className="size-5 mr-2" aria-hidden="true" />
              Preset Resumes &nbsp;
              <span className="text-sm text-destructive opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                ( All are same now, when I learn all, I'll make them different.
                )
              </span>
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Preview/print or download the PDF. Yes, it's that simple.
            </p>

            <ResumePresets presets={resumePresets} />
          </div>

          <div className="mt-12">
            <h2 className="flex items-center text-foreground text-lg">
              <Wand2 className="size-5 mr-2" aria-hidden="true" />
              Custom Tailored Resume
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Paste the job requirements below and let AI work its magic. ✨
            </p>
            <TailoredResume />
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
      </section>
    </div>
  );
}
