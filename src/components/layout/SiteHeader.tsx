import Link from "next/link";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/tools", label: "Tools" },
  { href: "/qr-code-generator", label: "Generator" },
  { href: "/qr-code-for-restaurant-menu", label: "Use Cases" },
];

export const SiteHeader = () => (
  <header className="sticky top-0 z-40 border-b border-ink/10 bg-shell/80 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link href="/" className="flex flex-col text-ink">
        <span className="text-lg font-semibold tracking-tight">QR Tools</span>
        <span className="text-xs uppercase tracking-[0.2em] text-ink/50">Static generator</span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-ink/70 md:flex">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-ink">
            {item.label}
          </Link>
        ))}
      </nav>
      <Button asChild size="sm">
        <Link href="/qr-code-generator">Create QR</Link>
      </Button>
    </div>
  </header>
);
