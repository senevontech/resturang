import React, { useEffect, useMemo, useRef, useState } from "react";

export default function InteractiveDotsBg({
  className = "",
  dotColor = "rgba(245, 198, 51, 0.95)", // yellow
  baseBg = "#d8c9a4", // beige
  count = 90,
  radius = 120, // mouse influence radius
}) {
  const wrapRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const mouseRef = useRef({ x: -9999, y: -9999 });

  // Create dots once per size
  const dots = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        // seeded-ish random
        x: Math.random(),
        y: Math.random(),
        s: 2 + Math.random() * 3, // 2..5px
        o: 0.45 + Math.random() * 0.55,
      });
    }
    return arr;
  }, [count]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: baseBg }}
      aria-hidden="true"
    >
      {/* subtle vignette + soft light */}
      <div className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(1000px 500px at 50% 30%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      {/* dots */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {dots.map((d) => {
          const x = d.x * size.w;
          const y = d.y * size.h;

          // repel effect near mouse
          const mx = mouseRef.current.x;
          const my = mouseRef.current.y;
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          const influence = Math.max(0, 1 - dist / radius);
          const push = 14 * influence; // how far it moves
          const px = x + (dx / dist) * push;
          const py = y + (dy / dist) * push;

          return (
            <circle
              key={d.id}
              cx={px}
              cy={py}
              r={d.s}
              fill={dotColor}
              opacity={d.o}
            />
          );
        })}
      </svg>
    </div>
  );
}
