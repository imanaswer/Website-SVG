import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-indigo text-parchment hover:bg-ink hover:shadow-lg hover:shadow-indigo/25",
  secondary: "border border-indigo/20 bg-card text-indigo hover:border-gold/60 hover:bg-parchment",
  ghost: "text-indigo hover:bg-card",
  gold: "bg-gold text-ink hover:bg-gold-soft hover:shadow-lg hover:shadow-gold/30",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

function classes(variant: Variant, size: Size, className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

/** Link styled as a button. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

/** Native button (for forms). */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
} & ComponentProps<"button">) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
