import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/60 bg-background/50 backdrop-blur py-6">
      <div className="mx-auto flex w-full flex-col items-center justify-center px-16 md:max-w-6xl md:flex-row md:justify-between">
        <p className="hidden text-sm text-muted-foreground md:block">
          Made with ❤️ by{" "}
          <a
            href="https://anaverage.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Sayantan
          </a>
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/web-dev-sayantan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </a>
          <a
            href="https://linkedin.com/in/webdevsayantan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </a>
          <a
            href="https://x.com/no0bdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
