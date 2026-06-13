"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * LoadingLink — wraps Next.js <Link> with a loading spinner.
 * Use for links that trigger heavy async navigation (blog posts, etc.)
 */
export function LoadingLink({
  href,
  children,
  className,
  style,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Link
      href={href}
      className={cn("relative", className)}
      style={style}
      onClick={() => {
        setLoading(true);
        onClick?.();
        // Reset after navigation completes (safety valve)
        setTimeout(() => setLoading(false), 4000);
      }}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center rounded-[inherit] bg-black/10 dark:bg-black/20 backdrop-blur-sm z-10">
          <span className="btn-spinner btn-spinner-gold" />
        </span>
      )}
      {children}
    </Link>
  );
}

/**
 * LoadingButton — button variant for async actions like lang switch
 */
export function LoadingButton({
  onClick,
  children,
  className,
  "aria-label": ariaLabel,
}: {
  onClick: () => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isLoading = loading || isPending;

  const handleClick = async () => {
    setLoading(true);
    startTransition(() => {
      onClick();
    });
    // Safety fallback
    setTimeout(() => setLoading(false), 4000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={cn("relative", className)}
      aria-label={ariaLabel}
    >
      {isLoading ? (
        <span className="flex items-center gap-1.5">
          <span className="btn-spinner btn-spinner-gold" />
          <span className="opacity-70">{typeof children === "string" ? children : null}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
