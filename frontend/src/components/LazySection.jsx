import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";

const cn = (...a) => a.filter(Boolean).join(" ");

function useInView({ rootMargin = "300px 0px", threshold = 0.01 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;

    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [inView, rootMargin, threshold]);

  return { ref, inView };
}

/** Minimal, CLS-safe skeleton */
export function SectionSkeleton({ height = 520 }) {
  return (
    <div
      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
      style={{ minHeight: height }}
      aria-hidden="true"
    >
      <div className="p-6 space-y-4">
        <div className="h-8 w-56 rounded-lg bg-white/10 animate-pulse" />
        <div className="h-4 w-3/4 rounded-lg bg-white/10 animate-pulse" />
        <div className="h-4 w-2/3 rounded-lg bg-white/10 animate-pulse" />
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="h-32 rounded-xl bg-white/10 animate-pulse" />
          <div className="h-32 rounded-xl bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/**
 * LazySection
 * - Renders placeholder until near viewport (IntersectionObserver)
 * - Mounts children + Suspense fallback (chunk loading)
 * - Fade-in animation when visible
 */
export default function LazySection({
  children,
  fallback = <SectionSkeleton />,
  rootMargin = "300px 0px",
  threshold = 0.01,
  className = "",
  id,
  minHeight = 520, // helps CLS (layout shift)
}) {
  const { ref, inView } = useInView({ rootMargin, threshold });
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (inView) {
      // allow next paint for smoother transition
      requestAnimationFrame(() => setShown(true));
    }
  }, [inView]);

  const style = useMemo(
    () => ({
      minHeight,
      // smooth fade-in
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0px)" : "translateY(12px)",
      transition:
        "opacity 650ms cubic-bezier(0.2,0.8,0.2,1), transform 650ms cubic-bezier(0.2,0.8,0.2,1)",
      willChange: "opacity, transform",
    }),
    [shown, minHeight]
  );

  return (
    <section
      id={id}
      ref={ref}
      className={cn("w-full", className)}
      style={style}
    >
      {inView ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </section>
  );
}
