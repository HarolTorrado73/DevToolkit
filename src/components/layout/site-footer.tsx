import Link from "next/link";

import { siteConfig } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 mt-auto border-t">
      <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {year} {siteConfig.name}. Open source under the{" "}
          <a
            href={`${siteConfig.githubUrl}/blob/main/LICENSE`}
            className="text-foreground underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MIT License
          </a>
          .
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-4">
          <Link
            href="/tools"
            className="hover:text-foreground underline-offset-4 hover:underline"
          >
            Tools
          </Link>
          <Link
            href="/docs"
            className="hover:text-foreground underline-offset-4 hover:underline"
          >
            Docs
          </Link>
          <Link
            href="/about"
            className="hover:text-foreground underline-offset-4 hover:underline"
          >
            About
          </Link>
          <a
            href={siteConfig.githubUrl}
            className="hover:text-foreground underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
