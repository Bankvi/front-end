export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--bg)]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-2xl animate-pulse-glow"
          style={{
            background: "linear-gradient(135deg, rgba(213,156,124,0.2), rgba(213,156,124,0.06))",
            border: "1px solid rgba(213,156,124,0.3)",
          }}
        />
        <div className="flex gap-1">
          {[0,1,2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--gold)",
                animation: `fade-up 0.8s ${i * 0.15}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
