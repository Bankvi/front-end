"use client";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "up" | "scale" | "left";
}

export function ScrollReveal({ children, className = "", delay = 0, mode = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cls = mode === "scale" ? "reveal-scale" : "reveal";
    el.classList.add(cls);
    el.style.transitionDelay = `${delay}ms`;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, mode]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
