import Link from "next/link";
import { ArrowRightIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

const highlights = [
  {
    title: "Runs in your browser",
    description:
      "Sensitive data never leaves your device. Every tool is designed for local processing.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Fast by default",
    description:
      "Lightweight modules, lazy-loaded routes, and a focused UI keep interactions snappy.",
    icon: ZapIcon,
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            Open source · MIT · Privacy first
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Browse tools
              <ArrowRightIcon aria-hidden="true" />
            </Link>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Star on GitHub
            </a>
          </div>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {highlights.map((item) => (
            <li
              key={item.title}
              className="border-border/70 bg-card/40 rounded-xl border p-5"
            >
              <item.icon
                className="text-foreground mb-3 size-5"
                aria-hidden="true"
              />
              <h2 className="font-medium tracking-tight">{item.title}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
