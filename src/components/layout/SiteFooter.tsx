import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/imprint", label: "Imprint" },
  { href: "/contact", label: "Contact" },
];

export const SiteFooter = () => (
  <footer className="border-t border-ink/10 bg-shell">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-ink/70 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-base font-semibold text-ink">QR Tools</p>
        <p className="text-sm text-ink/60">
          Static QR codes never expire. Dynamic QR codes (edit/track) are not offered in v1.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href} className="transition hover:text-ink">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);
