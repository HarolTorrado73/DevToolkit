import Link from "next/link";

import { siteConfig } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-16">
      <p className="text-foreground/60 font-mono text-sm tracking-wide">
        Open source · MIT · Runs locally
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="text-foreground/75 mt-4 max-w-2xl text-lg leading-relaxed">
        {siteConfig.description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/tools"
          className="bg-foreground text-background focus-visible:ring-foreground focus-visible:ring-offset-background inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Browse tools
        </Link>
        <a
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-foreground/15 hover:bg-foreground/5 focus-visible:ring-foreground focus-visible:ring-offset-background inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          View on GitHub
        </a>
      </div>
    </main>
  );
}
