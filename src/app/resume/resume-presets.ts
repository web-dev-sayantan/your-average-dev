export interface ResumePreset {
  id: string;
  title: string;
  emoji: string;
  description: string;
  pdfPath: string;
}

export const resumePresets: ResumePreset[] = [
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
    description: "Jack of all trades, master of… some? Maybe?",
    pdfPath: "/resumes/sayantan-dey_frontend-engineer_2026.pdf",
  },
  {
    id: "java",
    title: "Java Developer",
    emoji: "☕",
    description:
      "public static void main… just kidding, I don't do this anymore",
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
