import React, { useEffect, useMemo, useRef, useState } from "react";

const cn = (...a) => a.filter(Boolean).join(" ");

const DUMMY = [
  {
    id: "01",
    title: "Chef’s Specials",
    tag: "Today",
    desc: "Handpicked signature plates with bold flavors and premium ingredients.",
    img: "/images/horzon/img11.png",
    price: "₹299",
    meta: "Spicy • Bestseller",
  },
  {
    id: "02",
    title: "Indian",
    tag: "Hot",
    desc: "Stir-fry perfection—noodles, sauces, and crunchy veggies.",
    img: "/images/horzon/img12.png",
    price: "₹349",
    meta: "Wok • Tangy",
  },
  {
    id: "03",
    title: "Pan Cake",
    tag: "Classic",
    desc: "Comfort food in a platter: roti, curry, rice, and sides.",
    img: "/images/horzon/img13.png",
    price: "₹399",
    meta: "Thali • Filling",
  },
  {
    id: "04",
    title: "Tofu special",
    tag: "New",
    desc: "Crispy, creamy, and cheesy—perfect for sharing.",
    img: "/images/horzon/img14.png",
    price: "₹279",
    meta: "Cheesy • Snack",
  },
  {
    id: "05",
    title: "Dessert",
    tag: "Sweet",
    desc: "Rich, chilled, and addictive. End your meal right.",
    img: "/images/horzon/img15.png",
    price: "₹199",
    meta: "Cold • Smooth",
  },

//   copies 
 {
    id: "01",
    title: "Mixed Continental",
    tag: "Today",
    desc: "Handpicked signature plates with bold flavors and premium ingredients.",
    img: "/images/horzon/img1.png",
    price: "₹299",
    meta: "Spicy • Bestseller",
  },
  {
    id: "02",
    title: "Butter Chicken",
    tag: "Hot",
    desc: "Stir-fry perfection—noodles, sauces, and crunchy veggies.",
    img: "/images/horzon/img2.png",
    price: "₹349",
    meta: "Wok • Tangy",
  },
  {
    id: "03",
    title: "Pizza",
    tag: "Classic",
    desc: "Comfort food in a platter: roti, curry, rice, and sides.",
    img: "/images/horzon/img3.png",
    price: "₹399",
    meta: "Thali • Filling",
  },
  {
    id: "04",
    title: "Salad",
    tag: "New",
    desc: "Crispy, creamy, and cheesy—perfect for sharing.",
    img: "/images/horzon/img4.png",
    price: "₹279",
    meta: "Cheesy • Snack",
  },
  {
    id: "05",
    title: "Bengali Thali",
    tag: "Sweet",
    desc: "Rich, chilled, and addictive. End your meal right.",
    img: "/images/horzon/img5.png",
    price: "₹199",
    meta: "Cold • Smooth",
  },

//   copies 
  {
    id: "01",
    title: "Fish",
    tag: "Today",
    desc: "Handpicked signature plates with bold flavors and premium ingredients.",
    img: "/images/horzon/img6.png",
    price: "₹299",
    meta: "Spicy • Bestseller",
  },
  {
    id: "02",
    title: "Barbeque",
    tag: "Hot",
    desc: "Stir-fry perfection—noodles, sauces, and crunchy veggies.",
    img: "/images/horzon/img7.png",
    price: "₹349",
    meta: "Wok • Tangy",
  },
  {
    id: "03",
    title: "Noodles",
    tag: "Classic",
    desc: "Comfort food in a platter: roti, curry, rice, and sides.",
    img: "/images/horzon/img8.png",
    price: "₹399",
    meta: "Thali • Filling",
  },
  {
    id: "04",
    title: "Continental Salad",
    tag: "New",
    desc: "Crispy, creamy, and cheesy—perfect for sharing.",
    img: "/images/horzon/img9.png",
    price: "₹279",
    meta: "Cheesy • Snack",
  },
  {
    id: "05",
    title: "Chinese",
    tag: "Sweet",
    desc: "Rich, chilled, and addictive. End your meal right.",
    img: "/images/horzon/img10.png",
    price: "₹199",
    meta: "Cold • Smooth",
  },
];

export default function HorizontalShowcase({
  title = "Discover Our Menu",
  subtitle = "A horizontal journey through our most loved categories — scroll to explore.",
  items = DUMMY,
}) {
  const outerRef = useRef(null); // pinned container
  const trackRef = useRef(null); // horizontal track
  const [progress, setProgress] = useState(0);

  const metrics = useMemo(() => ({ scrollLen: 0, maxX: 0 }), []);
  const rafRef = useRef(0);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const calc = () => {
      // total horizontal distance we need to travel
      const maxX = Math.max(0, track.scrollWidth - window.innerWidth);
      // make this section take (maxX + viewportHeight) vertical pixels to scroll through
      const scrollLen = maxX + window.innerHeight * 0.65;
      metrics.maxX = maxX;
      metrics.scrollLen = scrollLen;
      outer.style.height = `${scrollLen}px`;
    };

    const onScroll = () => {
      if (reduce) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = outer.getBoundingClientRect();
        const start = 0; // rect.top at start
        const end = -metrics.scrollLen + window.innerHeight; // rect.top at end
        const t = (start - rect.top) / (start - end);
        const clamped = Math.min(1, Math.max(0, t));
        setProgress(clamped);
      });
    };

    calc();
    onScroll();

    window.addEventListener("resize", calc, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [metrics]);

  const translateX = -(metrics.maxX * progress);

  return (
    <section ref={outerRef} className="relative w-full">
      {/* Sticky/pinned viewport */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4c5a0] via-[#c9b896] to-[#b8a882]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_40%_20%,rgba(255,255,255,0.15),transparent_70%)] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="relative z-10 h-full flex items-stretch"
          style={{
            transform: `translate3d(${translateX}px,0,0)`,
            willChange: "transform",
            transition: "transform 30ms linear",
          }}
        >
          {/* Panel 1: Intro */}
          <div className="h-full w-[100vw] flex items-center px-4 sm:px-10">
            <div className="max-w-6xl mx-auto w-full">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-[#5a4a2f] backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#5a4a2f]/70" />
                  Scroll to explore
                </div>

                <h2
                  className="mt-6 font-black tracking-tight"
                  style={{
                    fontFamily: "surg",
                    fontSize: "clamp(3rem, 7vw, 7rem)",
                    color: "#5a4a2f",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  {title}
                </h2>

                <p
                  className="mt-4 text-base sm:text-xl leading-relaxed max-w-2xl"
                  style={{ fontFamily: "surg", color: "#6b5940" }}
                >
                  {subtitle}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <div className="h-2 w-40 rounded-full bg-black/10 overflow-hidden">
                    <div
                      className="h-full bg-[#5a4a2f]/50"
                      style={{ width: `${Math.round(progress * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-[#6b5940]">
                    {Math.round(progress * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Cards strip */}
          <div className="h-full w-[160vw] flex items-center px-4 sm:px-10">
            <div className="mx-auto w-full max-w-7xl">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h3
                    className="font-black tracking-tight"
                    style={{
                      fontFamily: "surg",
                      fontSize: "clamp(1.8rem, 3.2vw, 3.5rem)",
                      color: "#5a4a2f",
                    }}
                  >
                    Featured Categories
                  </h3>
                  <p className="mt-2 text-[#6b5940]" style={{ fontFamily: "surg" }}>
                    Big visuals, crisp info — everything moves horizontally.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-[#5a4a2f] backdrop-blur-md">
                  <span className="opacity-70">Tip:</span> use mouse wheel / touchpad
                </div>
              </div>

              <div className="mt-8 flex gap-5 sm:gap-7">
                {items.map((it) => (
                  <article
                    key={it.id}
                    className={cn(
                      "relative w-[78vw] sm:w-[420px] shrink-0 overflow-hidden rounded-3xl",
                      "border border-white/20 bg-white/10 backdrop-blur-xl",
                      "shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
                    )}
                  >
                    <div className="absolute inset-0 opacity-70 bg-[radial-gradient(500px_300px_at_30%_20%,rgba(255,255,255,0.22),transparent_70%)]" />
                    <div className="relative p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-xs tracking-widest uppercase text-[#6b5940]/80">
                            {it.tag}
                          </div>
                          <h4
                            className="mt-1 text-xl sm:text-2xl font-black"
                            style={{ fontFamily: "surg", color: "#5a4a2f" }}
                          >
                            {it.title}
                          </h4>
                        </div>
                        <div className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-[#5a4a2f]">
                          {it.price}
                        </div>
                      </div>

                      <p
                        className="mt-3 text-sm sm:text-base leading-relaxed"
                        style={{ fontFamily: "surg", color: "#6b5940" }}
                      >
                        {it.desc}
                      </p>

                      <div className="mt-5 relative overflow-hidden rounded-2xl border border-white/20 bg-white/10">
                        <img
                          src={it.img}
                          alt={it.title}
                          className="h-[210px] sm:h-[240px] w-full object-cover"
                          draggable={false}
                        />
                        <div className="absolute bottom-3 left-3 rounded-full bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-md">
                          {it.meta}
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-xs text-[#6b5940]/80">#{it.id}</span>
                        <button
                          type="button"
                          className="rounded-full border border-white/25 bg-[#5a4a2f]/15 px-4 py-2 text-sm text-[#5a4a2f] hover:bg-[#5a4a2f]/20 transition"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 3: Outro */}
          <div className="h-full w-[100vw] flex items-center px-4 sm:px-10">
            <div className="max-w-6xl mx-auto w-full text-center">
              <h3
                className="font-black tracking-tight"
                style={{
                  fontFamily: "surg",
                  fontSize: "clamp(2.2rem, 5vw, 5.5rem)",
                  color: "#5a4a2f",
                }}
              >
                Ready to order?
              </h3>
              <p
                className="mt-3 text-base sm:text-xl max-w-2xl mx-auto"
                style={{ fontFamily: "surg", color: "#6b5940" }}
              >
                When this section ends, scrolling becomes normal vertical again.
              </p>

              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-[#5a4a2f] backdrop-blur-md hover:bg-white/15 transition"
                >
                  Browse Menu
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/25 bg-[#5a4a2f]/20 px-6 py-3 text-[#5a4a2f] hover:bg-[#5a4a2f]/25 transition"
                >
                  Book a Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
