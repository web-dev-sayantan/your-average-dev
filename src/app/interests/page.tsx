interface Interest {
  name: string;
  description: string;
}

const currentInterests: Interest[] = [
  {
    name: "Tech",
    description: "Obviously. I know you didn't see that coming. 😅",
  },
  {
    name: "Standup Comedy",
    description:
      "laughing at other people's problems while ignoring bugs I create",
  },
  {
    name: "Guitar",
    description: "playing Hotel California (only chords) for the 1000th time",
  },
  {
    name: "Chess",
    description: "losing to 1200 rated players and blaming it on mouse slips",
  },
  {
    name: "Pickleball",
    description: "could have been Tennis but I'm too old",
  },
  {
    name: "Lying on the bed",
    description: "my most consistent hobby 😴",
  },
];

const deadInterests: Interest[] = [
  {
    name: "Football",
    description: "Body feints and fake shots. My knee said, not anymore.",
  },
  {
    name: "Filmmaking",
    description: "Had a YouTube channel. Key word: had",
  },
  {
    name: "Writing Java Code",
    description: 'public static void main… System.out.println("Please NO! 😤")',
  },
  {
    name: "Strategizing Clash of Clans wars",
    description:
      "Those were the days. I also upgraded all my walls. Dedication!",
  },
];

export default function Interests() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main
        id="main-content"
        className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"
      >
        <section>
          <p className="text-muted-foreground">
            Lorem ipsum,{" "}
            <span className="dark:hidden text-black">
              Still in light mode? 🤦
            </span>
          </p>
          <br />
          <div className="flex items-baseline text-muted-foreground">
            <span>Things I do when</span>
            <h1 className="text-2xl text-foreground">
              &nbsp;I'm not coding.&nbsp;
            </h1>
          </div>
          <p className="text-muted-foreground mt-3">
            Or pretending to code while actually watching YouTube tutorials at
            2x speed.
          </p>
          <br />
          <h2 className="flex items-baseline text-foreground">
            {" "}
            ✨ Current Interests:{" "}
          </h2>
          <ul className="list-disc list-inside">
            {currentInterests.map((interest, index) => (
              <li
                key={interest.name}
                className={`text-muted-foreground ${index === 0 ? "mt-3" : ""} ${index === currentInterests.length - 1 ? "mb-3" : ""}`}
              >
                <span className="text-foreground/90">{interest.name}</span> -{" "}
                {interest.description}
              </li>
            ))}
          </ul>
          <br />
          <h2 className="flex items-baseline text-foreground">
            {" "}
            💀 Dead Interests:{" "}
          </h2>
          <p className="text-muted-foreground mt-3 italic">
            (RIP to these phases of my life)
          </p>
          <ul className="list-disc list-inside">
            {deadInterests.map((interest, index) => (
              <li
                key={interest.name}
                className={`text-muted-foreground ${index === 0 ? "mt-3" : ""} ${index === deadInterests.length - 1 ? "mb-3" : ""}`}
              >
                <span className="text-foreground/90 line-through">
                  {interest.name}
                </span>{" "}
                - {interest.description}
              </li>
            ))}
          </ul>
          <br />
          <p className="text-muted-foreground">
            If you share any of these interests (dead or alive), we should
            probably be friends.
          </p>
          <br />
          <p className="text-muted-foreground">Lorem ipsum, </p>
          <p className="text-muted-foreground">dolor sit amet cons</p>
        </section>
      </main>
    </div>
  );
}
