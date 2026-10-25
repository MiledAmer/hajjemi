import { cn } from "@/lib/utils";

// Brand logo (public/logo.svg). Size it with `className` (e.g. "size-10").
export function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt="Hajjemi"
      className={cn("size-10 shrink-0 rounded-[22%]", className)}
    />
  );
}

const LOCKUP = {
  lg: { logo: "size-14", text: "text-3xl" },
  md: { logo: "size-12", text: "text-2xl" },
  sm: { logo: "size-10", text: "text-xl" },
} as const;

// Logo + "HAJJEMI" wordmark. The logo is deliberately the larger of the two
// so the lockup doesn't read as small text next to a tiny icon.
export function LogoWithName({
  size = "md",
  className,
}: {
  size?: keyof typeof LOCKUP;
  className?: string;
}) {
  const s = LOCKUP[size];
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Logo className={s.logo} />
      <span
        className={cn(
          "text-primary font-bold tracking-tighter uppercase",
          s.text,
        )}
      >
        HAJJEMI
      </span>
    </span>
  );
}
