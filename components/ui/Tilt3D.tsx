"use client";
import { useRef, ReactNode, MouseEvent } from "react";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Tilt3D({ children, className = "", intensity = 12 }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(800px) rotateY(${dx * intensity}deg) rotateX(${-dy * intensity}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.transition = "transform 0.08s ease-out";
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
