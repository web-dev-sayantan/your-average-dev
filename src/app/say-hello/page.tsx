import { Calendar, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function SayHello() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main
        id="main-content"
        className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"
      >
        <section className="w-full">
          <h1 className="text-2xl text-foreground mb-6">Say Hello</h1>
          <p className="text-muted-foreground mb-8">
            A form. On the internet. In 2026. Revolutionary.
          </p>

          {/* Email Section */}
          <div className="mb-10">
            <h2 className="text-lg text-foreground mb-3 flex items-center">
              <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
              Email
            </h2>
            <p className="text-muted-foreground mb-2">
              The old-fashioned way. Write me at:
            </p>
            <a
              href="mailto:web.dev.sayantan@gmail.com"
              className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
            >
              web.dev.sayantan@gmail.com
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              (I promise to read it. Eventually.)
            </p>
          </div>

          {/* Social Links */}
          <div className="mb-10">
            <h2 className="text-lg text-foreground mb-3">Social</h2>
            <p className="text-muted-foreground mb-4">
              Where I pretend to be active:
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/web-dev-sayantan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/webdevsayantan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://x.com/no0bdev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm">Twitter</span>
              </a>
            </div>
          </div>

          {/* Meeting Link */}
          <div className="mb-10">
            <h2 className="text-lg text-foreground mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
              Book a Meeting
            </h2>
            <p className="text-muted-foreground mb-4">
              For when email feels too async (but really, is it?):
            </p>
            <a
              href="https://cal.com/web-dev-sayantan"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "hover:bg-foreground/5",
              )}
            >
              Schedule a Call
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Default duration: 30 minutes. Actual useful time: 12 minutes.
            </p>
          </div>

          {/* Footer Note */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Response time: Somewhere between instant and never.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              (Usually within 24-48 hours if you're lucky.)
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
