import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
];

const clamp01 = (n) => Math.max(0, Math.min(1, n));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function HeroStack() {
  const sectionRef = useRef(null);
  const [vh, setVh] = useState(() => window.innerHeight);
  const [p, setP] = useState(0); // 0 → 1 progress INSIDE hero

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;

      const y = window.pageYOffset || document.documentElement.scrollTop || 0;

      // hero start + end in document space
      const start = el.offsetTop;
      const end = start + el.offsetHeight - vh;

      const prog = clamp01((y - start) / Math.max(1, end - start));
      setP(prog);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [vh]);

  const count = IMAGES.length;

  return (
    <section ref={sectionRef} className="relative">
      {/* Total scroll space = 5 screens */}
      <div className="relative" style={{ height: `${count * 100}vh` }}>
        {/* ✅ Sticky viewport FIRST so img1 shows immediately */}
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          <div className="relative h-full w-full">
            {IMAGES.map((src, i) => {
              const seg = 1 / count;
              const start = i * seg;
              const end = (i + 1) * seg;

              const rawT = clamp01((p - start) / (end - start));
              const t = easeOutCubic(rawT);

              // each image slides up by 1 viewport height
              const y = -t * vh;

              return (
                <div
                  key={i}
                  className="absolute inset-0 will-change-transform"
                  style={{
                    transform: `translate3d(0, ${y}px, 0)`,
                    zIndex: count - i,
                  }}
                >
                  {/* background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${src})` }}
                  />
                  {/* optional overlay */}
                  <div className="absolute inset-0 bg-black/25" />

                  {/* optional content only on first slide */}
                  {i === 0 && (
                    <div className="relative z-10 h-full w-full flex items-center justify-center px-6">
                      <div className="max-w-3xl text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                          Hero Title
                        </h1>
                        <p className="mt-4 text-white/80">
                          Scroll down to reveal the next background images.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ✅ Invisible spacers to create scroll length (no black block) */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="h-screen w-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
