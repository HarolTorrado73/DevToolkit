export const siteConfig = {
  name: "DevToolkit",
  description:
    "A free, fast, and modern collection of developer tools that run entirely in your browser. Format JSON, decode JWTs, generate UUIDs, and more — with privacy by default.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devtoolkit.dev",
  githubUrl: "https://github.com/HarolTorrado73/DevToolkit",
  keywords: [
    "developer tools",
    "json formatter",
    "jwt decoder",
    "uuid generator",
    "base64 encoder",
    "regex tester",
    "online tools",
    "open source",
  ],
} as const;
