import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Browse free developer tools that run entirely in your browser. More tools are being added every release.",
};

export default function ToolsIndexPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Tools</h1>
      <p className="mt-3 max-w-2xl text-foreground/75">
        The tool catalog is being prepared. Individual modules will appear here
        as they ship.
      </p>
    </main>
  );
}
