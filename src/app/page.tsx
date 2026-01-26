import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section>
          <p className="text-muted-foreground">
            Lorem ipsum,{" "}
            <span className="dark:hidden text-black">
              Light mode, seriously? 😒
            </span>
          </p>
          <br />
          <p className="flex items-baseline text-muted-foreground">
            I'm{" "}
            <h1 className="text-2xl text-foreground">&nbsp;Sayantan.&nbsp;</h1>{" "}
            An average software&nbsp;
            <span className="line-through">developer</span>&nbsp;engineer.
          </p>
          <p className="text-muted-foreground mt-3">
            I've worked for{" "}
            <span className="text-destructive/90">enterprises</span> since{" "}
            <span className="text-foreground/80">September, 2014</span> and
            developed tons of{" "}
            <span className="text-foreground/90">web apps</span> crammed with
            tables, autocompletes, calendars, multiselects and what not.
          </p>
          <br />
          <p className="text-muted-foreground">
            Why should you hire me?{" "}
            <span className="text-foreground">
              I understand Closures in JS. 😎
            </span>
          </p>
          <p className="text-muted-foreground">
            Though less significant with Claude around, but I also know a bit of
          </p>
          <p className="flex items-center">
            <Image
              src="/angular_gradient.png"
              alt="Angular Logo"
              width={20}
              height={20}
            />
            &nbsp;Angular, &nbsp;
            <Image src="/React.svg" alt="React Logo" width={18} height={18} />
            &nbsp;React,&nbsp;
            <Image
              src="/Node.js.svg"
              alt="Node.js Logo"
              width={18}
              height={18}
            />
            &nbsp;Node.js (&nbsp;
            <Image src="/Bun.svg" alt="Bun Logo" width={18} height={18} />
            &nbsp;Bun because it's cool)
          </p>
          <br />
          <h2 className="flex items-baseline"> 👑&nbsp; Achievements: </h2>
          <ul className="list-disc list-inside">
            <li className="text-muted-foreground mt-3">
              A table that competes with Excel? ✅
            </li>
            <li className="text-muted-foreground">
              A single page form that will take a full day to fill up? ✅
            </li>
            <li className="text-muted-foreground mb-3">
              Read 10,000 lines to find why the save button is not getting
              enabled? ✅
            </li>
          </ul>
          <br />
          <p className="text-muted-foreground mb-6">
            If you think you can get your work done by this average engineer,
            I'm all ears @ &nbsp;
            <a
              href="mailto:web.dev.sayantan@gmail.com"
              className="text-foreground underline underline-offset-4"
            >
              web.dev.sayantan@gmail.com
            </a>
          </p>
          <p className="text-muted-foreground">Lorem ipsum, </p>
          <p className="text-muted-foreground">dolor sit amet cons</p>
        </section>
      </main>
    </div>
  );
}
