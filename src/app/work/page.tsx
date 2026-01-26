import { MapPin } from "lucide-react";

const employmentTimeline = [
  {
    company: "Nagarro Inc",
    period: "September 2024 - Present",
    location: "Florida, USA",
    title: "Developer",
    summary: [
      "Leading the great escape from a legacy UI into Angular for inter-modal gate operations at one of the biggest transport suppliers in the U.S.A.",
      "Quietly plotting the leap from a classic SPA to MicroFrontends without breaking the gates.",
    ],
    tech: "Angular 14, PrimeNg",
  },
  {
    company: "Nagarro Enterprise Services Pvt Ltd",
    period: "September 2021 - September 2024",
    location: "Chandigarh, India",
    title: "Associate Staff Engineer",
    summary: [
      "Leading the great escape from a legacy UI into Angular for inter-modal gate operations at one of the biggest transport suppliers in the U.S.A.",
      "Quietly plotting the leap from a classic SPA to MicroFrontends without breaking the gates.",
    ],
    tech: "Angular 14, PrimeNg",
  },
  {
    company: "Erevmax Technologies Pvt Ltd",
    period: "November 2020 - August 2021",
    location: "Kolkata, India",
    title: "Software Engineer",
    summary: [
      "Built an internal web hub that keeps all the Erevmax utility apps in one sane place.",
      "Ran R&D and shipped a POC on Next.js-NestJS-Mongo-GraphQL for a fast, SEO-friendly PWA.",
    ],
    tech: "Angular 11, Nx, Angular Material, NgRx, Next.js, NestJS",
  },
  {
    company: "PRM Fincon",
    period: "April 2020 - October 2020",
    location: "Kolkata, India",
    title: "Web Developer",
    summary: [
      "Was the Angular person in a team building a web-based finance product that automates the full corporate loan approval marathon.",
    ],
    tech: "Angular 8, Nx, Scss",
  },
  {
    company: "Erevmax Technologies Pvt Ltd",
    period: "October 2018 - April 2020",
    location: "Kolkata, India",
    title: "Software Engineer",
    summary: [
      "Built the frontend for AgentX, an itinerary builder that lets agents book hotels, flights, cabs, and sightseeing without the spreadsheet circus.",
    ],
    tech: "Angular 8, Bootstrap, Scss, Svelte",
  },
  {
    company: "Tata Consultancy Services",
    period: "September 2014 - October 2018",
    location: "Kolkata, India",
    title: "Systems Engineer",
    summary: [
      "Got my hands dirty with Mainframe, Perl, VBScript, Java, Spring, and ELK before falling for modern web dev.",
      "Built a search repository for a client using Angular 5, Bootstrap, and Elasticsearch.",
    ],
    tech: "Java, Angular 5, VB Script, Elasticsearch",
  },
];

const internships = [
  {
    company: "Ixia Technologies",
    period: "July 2013 - July 2014",
    title: "Intern",
    summary: [
      "Learned Python and Django, then built a performance management tracker for the internal team.",
      "Learned HTML, CSS, and JavaScript to ship the performance management UI.",
    ],
    tech: "Python, Django, HTML, CSS, JavaScript",
  },
];

export default function WorkPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="w-full">
          <p className="text-lg flex items-baseline">
            Work, boring.{" "}
            <span className="dark:hidden text-red-500 text-normal px-3">
              Too bright!! 😒
            </span>
          </p>
          <p className="mt-3 text-muted-foreground">
            I’ve been around long enough to collect legacy apps, rescue a few,
            and still keep shipping. Here’s the timeline without the buzzwords.
          </p>

          <div className="mt-10 space-y-8">
            {employmentTimeline.map((role) => (
              <div
                key={`${role.company}-${role.period}`}
                className="border-l border-muted/60 pl-5"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-foreground text-lg font-medium">
                    {role.company}
                  </p>
                  <p className="text-muted-foreground">
                    {role.period} · {role.title}
                  </p>
                  <p className="flex items-center text-muted-foreground">
                    <MapPin className="size-5" />
                    &nbsp; {role.location}
                  </p>
                </div>
                <ul className="mt-3 list-disc list-inside space-y-2 text-muted-foreground">
                  {role.summary.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-foreground/80">
                  Technologies Used: {role.tech}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-lg text-foreground">Internships</h2>
          <div className="mt-6 space-y-8">
            {internships.map((role) => (
              <div
                key={`${role.company}-${role.period}`}
                className="border-l border-muted/60 pl-5"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-foreground text-lg font-medium">
                    {role.company}
                  </p>
                  <p className="text-muted-foreground">
                    {role.period} · {role.title}
                  </p>
                </div>
                <ul className="mt-3 list-disc list-inside space-y-2 text-muted-foreground">
                  {role.summary.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-foreground/80">
                  Technologies Learned: {role.tech}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
