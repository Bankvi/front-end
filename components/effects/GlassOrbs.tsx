"use client";
import { useEffect, useRef } from "react";

export function GlassOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {/* Primary gold orb — top right */}
      <div
        className="animate-orb-1 absolute rounded-full"
        style={{
          width: 800, height: 800,
          background: "radial-gradient(ellipse at 40% 40%, rgba(213,156,124,0.35) 0%, rgba(184,128,95,0.18) 45%, transparent 70%)",
          top: "-20%", right: "-15%",
          filter: "blur(80px)",
        }}
      />
      {/* Deep copper — bottom left */}
      <div
        className="animate-orb-2 absolute rounded-full"
        style={{
          width: 650, height: 650,
          background: "radial-gradient(ellipse at 60% 60%, rgba(193,123,82,0.28) 0%, rgba(213,156,124,0.12) 50%, transparent 70%)",
          bottom: "-10%", left: "-10%",
          filter: "blur(100px)",
        }}
      />
      {/* Warm rose accent — center */}
      <div
        className="animate-orb-3 absolute rounded-full"
        style={{
          width: 500, height: 500,
          background: "radial-gradient(ellipse at 50% 50%, rgba(232,185,154,0.20) 0%, transparent 65%)",
          top: "35%", left: "30%",
          filter: "blur(70px)",
        }}
      />
      {/* Dark accent blue (contrast) */}
      <div
        className="animate-orb-2 absolute rounded-full"
        style={{
          width: 400, height: 400,
          background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 65%)",
          top: "55%", right: "15%",
          filter: "blur(90px)",
          animationDelay: "8s",
        }}
      />
      {/* Particle field — subtle floating dots */}
      <ParticleField />
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i * 37 + 5) % 95,
    y: (i * 53 + 10) % 90,
    size: (i % 3) + 1.5,
    delay: (i * 0.7) % 8,
    duration: 6 + (i % 5),
  }));

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-30 dark:opacity-15"
      style={{ pointerEvents: "none" }}
    >
      {particles.map((p) => (
        <circle
          key={p.id}
          cx={`${p.x}%`}
          cy={`${p.y}%`}
          r={p.size}
          fill="var(--gold)"
          style={{
            animation: `particle-rise ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </svg>
  );
}
