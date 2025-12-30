import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-start justify-center gap-4">
      <h1 className="text-3xl font-semibold text-ink">Page not found</h1>
      <p className="text-sm text-ink/70">That page does not exist. Try one of the QR tools instead.</p>
      <Button asChild>
        <Link href="/qr-code-generator">Go to generator</Link>
      </Button>
    </div>
  );
}
