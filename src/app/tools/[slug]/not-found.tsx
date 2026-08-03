import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ToolNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-start px-4 py-16 sm:px-6">
      <p className="text-muted-foreground font-mono text-sm">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Tool not found
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
        That tool is not registered in the catalog. It may have been renamed or
        has not shipped yet.
      </p>
      <Link href="/tools" className={cn(buttonVariants(), "mt-8")}>
        Browse tools
      </Link>
    </main>
  );
}
