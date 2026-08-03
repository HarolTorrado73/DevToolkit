import Link from "next/link";

import { siteConfig } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-16">
      <p className="font-mono text-sm tracking-wide text-foreground/60">
        Open source · MIT · Runs locally
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/75">
        {siteConfig.description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/tools"
          className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Browse tools
        </Link>
        <a
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-md border border-foreground/15 px-5 text-sm font-medium transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View on GitHub
        </a>
      </div>
    </main>
  );
}
