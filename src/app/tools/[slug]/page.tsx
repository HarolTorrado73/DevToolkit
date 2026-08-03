import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolShell } from "@/components/tools/tool-shell";
import { siteConfig } from "@/lib/constants";
import { getToolBySlug, getToolSlugs } from "@/tools/registry";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool not found",
    };
  }

  const url = `${siteConfig.url}/tools/${tool.slug}`;

  return {
    title: tool.name,
    description: tool.description,
    keywords: [...tool.keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${tool.name} · ${siteConfig.name}`,
      description: tool.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${tool.name} · ${siteConfig.name}`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const { default: ToolComponent } = await tool.load();
  const { load: _load, ...summary } = tool;

  return (
    <ToolShell tool={summary}>
      <ToolComponent />
    </ToolShell>
  );
}
