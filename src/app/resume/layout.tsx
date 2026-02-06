import type { Metadata } from "next";

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

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
