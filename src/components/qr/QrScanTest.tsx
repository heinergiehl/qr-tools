import { AlertCircle, CheckCircle2 } from "lucide-react";

export type QrScanTestProps = {
  tips: string[];
};

const checklist = [
  "Test on at least two phones (iOS + Android).",
  "Check scans in bright light and low light.",
  "Print at 2 cm width or larger for signage.",
  "Avoid glossy surfaces or reflections.",
];

export const QrScanTest = ({ tips }: QrScanTestProps) => (
  <div className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-sm">
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-ink">Common issues & fixes</h3>
        <p className="text-sm text-ink/70">
          Troubleshoot scan problems with these quick fixes.
        </p>
        <ul className="mt-4 grid gap-3 text-sm text-ink/80">
          {tips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 text-ink/50" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3 rounded-xl border border-ink/10 bg-sand/60 p-4">
        <h3 className="text-base font-semibold text-ink">Scan test checklist</h3>
        <p className="text-sm text-ink/70">Run this quick checklist before you print at scale.</p>
        <ul className="mt-4 grid gap-3 text-sm text-ink/80">
          {checklist.map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-ink/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
