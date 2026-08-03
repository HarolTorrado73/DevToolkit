import type { Metadata } from "next";

import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about DevToolkit’s mission: free, fast, privacy-first developer tools maintained as a professional open-source project.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <div className="text-muted-foreground mt-4 space-y-4 leading-relaxed">
        <p>
          {siteConfig.name} is an open-source collection of developer utilities
          designed to feel like a product maintained by a serious engineering
          team: modular architecture, automated quality gates, and clear
          contribution paths.
        </p>
        <p>
          Every tool runs in the browser. We optimize for speed, accessibility,
          and a consistent experience so adding the next utility never means
          reinventing the shell.
        </p>
        <p>
          The project is licensed under MIT. Contributions are welcome through
          issues, discussions, and pull requests on{" "}
          <a
            href={siteConfig.githubUrl}
            className="text-foreground underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  );
}
