import Link from "next/link";
import { WrenchIcon } from "lucide-react";

import { GitHubIcon } from "@/components/icons/github-icon";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/tools", label: "Tools" },
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-foreground flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="bg-primary text-primary-foreground inline-flex size-7 items-center justify-center rounded-md">
              <WrenchIcon className="size-3.5" aria-hidden="true" />
            </span>
            <span>{siteConfig.name}</span>
          </Link>
          <nav
            aria-label="Primary"
            className="flex items-center gap-0.5 overflow-x-auto sm:gap-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            aria-label="DevToolkit on GitHub"
          >
            <GitHubIcon className="size-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
