import { useMemo } from "react";

export function Particles({ count = 30 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 4;
        const colors = ["0,240,255", "112,0,255", "79,109,255"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return {
          id: i,
          left: Math.random() * 100,
          size,
          duration: 12 + Math.random() * 18,
          delay: Math.random() * 20,
          color,
        };
      }),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: `radial-gradient(circle, rgba(${p.color},0.9) 0%, rgba(${p.color},0) 70%)`,
          }}
        />
      ))}
    </div>
  );
}
