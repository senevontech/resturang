

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import img1 from "../assets/images/horzon/img1.png";
import img2 from "../assets/images/horzon/img2.png";
import img3 from "../assets/images/horzon/img3.png";
import img4 from "../assets/images/horzon/img4.png";
import img5 from "../assets/images/horzon/img5.png";
import img6 from "../assets/images/horzon/img6.png";
import img7 from "../assets/images/horzon/img7.png";

import img11 from "../assets/images/horzon/img11.png";
import img12 from "../assets/images/horzon/img12.png";
import img13 from "../assets/images/horzon/img13.png";
import img14 from "../assets/images/horzon/img14.png";
import img15 from "../assets/images/horzon/img15.png";

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Merges className strings, filtering out falsy values
 * @param {...(string|boolean|null|undefined)} classes - Class names to merge
 * @returns {string} Merged class string
 */
const cn = (...classes) => classes.filter(Boolean).join(" ");

/**
 * Clamps a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Debounces a function call
 * @param {Function} fn - Function to debounce
 * @param {number} ms - Milliseconds to wait
 * @returns {Function} Debounced function
 */
const debounce = (fn, ms) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
};

// ============================================================================
// CONSTANTS
// ============================================================================

const ANIMATION_CONFIG = {
  UPDATE_THRESHOLD: 0.02, // Update state when progress changes by 2%
  RESIZE_DEBOUNCE: 150, // Debounce resize events by 150ms
  VIEWPORT_BUFFER: 0.65, // Additional scroll space as % of viewport height
};

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// Default menu items with proper typing
const DEFAULT_ITEMS = [
  {
    id: "01",
    title: "Chef's Specials",
    tag: "Today",
    desc: "Handpicked signature plates with bold flavors and premium ingredients.",
    // img: "/images/horzon/img11.png",
    img: img11,
    price: "₹299",
    meta: "Spicy • Bestseller",
  },
  {
    id: "02",
    title: "Indian Fusion",
    tag: "Hot",
    desc: "Stir-fry perfection—noodles, sauces, and crunchy veggies.",
    // img: "/images/horzon/img12.png",
    img: img12,
    price: "₹349",
    meta: "Wok • Tangy",
  },
  {
    id: "03",
    title: "Pan Cake",
    tag: "Classic",
    desc: "Comfort food in a platter: roti, curry, rice, and sides.",
    // img: "/images/horzon/img13.png",
    img: img13,
    price: "₹399",
    meta: "Thali • Filling",
  },
  {
    id: "04",
    title: "Tofu Special",
    tag: "New",
    desc: "Crispy, creamy, and cheesy—perfect for sharing.",
    // img: "/images/horzon/img14.png",
    img: img14,
    price: "₹279",
    meta: "Cheesy • Snack",
  },
  {
    id: "05",
    title: "Dessert",
    tag: "Sweet",
    desc: "Rich, chilled, and addictive. End your meal right.",
    // img: "/images/horzon/img15.png",
    img: img15,
    price: "₹199",
    meta: "Cold • Smooth",
  },
  {
    id: "06",
    title: "Mixed Continental",
    tag: "Today",
    desc: "Handpicked signature plates with bold flavors and premium ingredients.",
    // img: "/images/horzon/img1.png",
    img: img1,
    price: "₹299",
    meta: "Spicy • Bestseller",
  },
  {
    id: "07",
    title: "Butter Chicken",
    tag: "Hot",
    desc: "Stir-fry perfection—noodles, sauces, and crunchy veggies.",
    // img: "/images/horzon/img2.png",
    img: img2,
    price: "₹349",
    meta: "Wok • Tangy",
  },
  {
    id: "08",
    title: "Pizza",
    tag: "Classic",
    desc: "Comfort food in a platter: roti, curry, rice, and sides.",
    // img: "/images/horzon/img3.png",
    img: img3,
    price: "₹399",
    meta: "Thali • Filling",
  },
  {
    id: "09",
    title: "Salad",
    tag: "New",
    desc: "Crispy, creamy, and cheesy—perfect for sharing.",
    // img: "/images/horzon/img4.png",
    img: img4,
    price: "₹279",
    meta: "Cheesy • Snack",
  },
  {
    id: "10",
    title: "Bengali Thali",
    tag: "Sweet",
    desc: "Rich, chilled, and addictive. End your meal right.",
    // img: "/images/horzon/img5.png",
    img: img5,
    price: "₹199",
    meta: "Cold • Smooth",
  },
  {
    id: "11",
    title: "Fish",
    tag: "Today",
    desc: "Handpicked signature plates with bold flavors and premium ingredients.",
    // img: "/images/horzon/img6.png",
    img: img6,
    price: "₹299",
    meta: "Spicy • Bestseller",
  },
  {
    id: "12",
    title: "Barbeque",
    tag: "Hot",
    desc: "Stir-fry perfection—noodles, sauces, and crunchy veggies.",
    // img: "/images/horzon/img7.png",
    img: img7,
    price: "₹349",
    meta: "Wok • Tangy",
  },
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Progress indicator component
 */
const ProgressIndicator = React.memo(({ progress }) => {
  const barRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const percentage = Math.round(progress * 100);
    if (barRef.current) {
      barRef.current.style.width = `${percentage}%`;
    }
    if (textRef.current) {
      textRef.current.textContent = `${percentage}%`;
    }
  }, [progress]);

  return (
    <div className="mt-6 sm:mt-8 flex items-center gap-3" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin="0" aria-valuemax="100">
      <div className="h-2 w-32 sm:w-40 rounded-full bg-black/10 overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-[#5a4a2f]/50 transition-all duration-200 ease-out"
          style={{ width: "0%" }}
        />
      </div>
      <span ref={textRef} className="text-xs sm:text-sm text-[#6b5940] font-medium tabular-nums">
        0%
      </span>
    </div>
  );
});

ProgressIndicator.displayName = "ProgressIndicator";

ProgressIndicator.propTypes = {
  progress: PropTypes.number.isRequired,
};

/**
 * Menu card component
 */
const MenuCard = React.memo(({ item, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  return (
    <article
      className={cn(
        "relative w-[85vw] sm:w-[380px] md:w-[420px] shrink-0 overflow-hidden",
        "rounded-2xl sm:rounded-3xl",
        "border border-white/20 bg-white/10 backdrop-blur-xl",
        "shadow-lg sm:shadow-[0_30px_80px_rgba(0,0,0,0.15)]",
        "transition-transform duration-300 hover:scale-[1.02] focus-within:scale-[1.02]"
      )}
      aria-labelledby={`menu-item-${item.id}`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(500px_300px_at_30%_20%,rgba(255,255,255,0.22),transparent_70%)] pointer-events-none" />
      
      <div className="relative p-4 sm:p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-xs tracking-widest uppercase text-[#6b5940]/80 font-medium">
              {item.tag}
            </div>
            <h4
              id={`menu-item-${item.id}`}
              className="mt-1 text-lg sm:text-xl md:text-2xl font-black leading-tight"
              style={{ fontFamily: "surg, system-ui, sans-serif", color: "#5a4a2f" }}
            >
              {item.title}
            </h4>
          </div>
          <div className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-[#5a4a2f]">
            {item.price}
          </div>
        </div>

        {/* Description */}
        <p
          className="mt-3 text-sm sm:text-base leading-relaxed text-[#6b5940]"
          style={{ fontFamily: "surg, system-ui, sans-serif" }}
        >
          {item.desc}
        </p>

        {/* Image container */}
        <div className="mt-4 sm:mt-5 relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 bg-white/10">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4c5a0]/20 to-[#b8a882]/20 animate-pulse" />
          )}
          
          {!imageError ? (
            <img
              src={item.img}
              alt={`${item.title} - ${item.desc}`}
              className={cn(
                "h-[200px] sm:h-[220px] md:h-[240px] w-full object-cover",
                "transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              draggable={false}
              loading="lazy"
              decoding="async"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="h-[200px] sm:h-[220px] md:h-[240px] w-full flex items-center justify-center bg-gradient-to-br from-[#d4c5a0]/20 to-[#b8a882]/20">
              <span className="text-[#6b5940]/60 text-sm">Image unavailable</span>
            </div>
          )}
          
          {/* Meta badge */}
          <div className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {item.meta}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 sm:mt-5 flex items-center justify-between gap-3">
          <span className="text-xs text-[#6b5940]/80 font-mono">#{item.id}</span>
          <button
            type="button"
            className={cn(
              "rounded-full border border-white/25 bg-[#5a4a2f]/15",
              "px-4 py-2 text-sm font-medium text-[#5a4a2f]",
              "hover:bg-[#5a4a2f]/20 active:bg-[#5a4a2f]/25",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-[#5a4a2f]/50 focus:ring-offset-2"
            )}
            aria-label={`View details for ${item.title}`}
          >
            View Details →
          </button>
        </div>
      </div>
    </article>
  );
});

MenuCard.displayName = "MenuCard";

MenuCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    meta: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * HorizontalShowcase - A scroll-driven horizontal menu showcase
 * 
 * @component
 * @example
 * ```jsx
 * <HorizontalShowcase
 *   title="Discover Our Menu"
 *   subtitle="A horizontal journey through our most loved categories"
 *   items={menuItems}
 * />
 * ```
 */
const HorizontalShowcase = ({
  title = "Discover Our Menu",
  subtitle = "A horizontal journey through our most loved categories — scroll to explore.",
  items = DEFAULT_ITEMS,
}) => {
  // ============================================================================
  // REFS
  // ============================================================================
  
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const metricsRef = useRef({ scrollLength: 0, maxTranslateX: 0 });
  const rafRef = useRef(0);
  const lastProgressRef = useRef(-1);
  const resizeObserverRef = useRef(null);

  // ============================================================================
  // STATE
  // ============================================================================
  
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // ============================================================================
  // MEMOIZED VALUES
  // ============================================================================
  
  const validatedItems = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) {
      console.warn("HorizontalShowcase: Invalid or empty items array, using defaults");
      return DEFAULT_ITEMS;
    }
    return items;
  }, [items]);

  // ============================================================================
  // SCROLL ANIMATION LOGIC
  // ============================================================================
  
  const updateScrollPosition = useCallback(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    
    if (!outer || !track) return;

    const { scrollLength, maxTranslateX } = metricsRef.current;
    const rect = outer.getBoundingClientRect();

    // Calculate scroll progress (0 to 1)
    const scrollStart = 0;
    const scrollEnd = -scrollLength + window.innerHeight;
    const rawProgress = (scrollStart - rect.top) / (scrollStart - scrollEnd);
    const normalizedProgress = clamp(rawProgress, 0, 1);

    // Apply GPU-accelerated transform (avoid reflow/repaint)
    if (!prefersReducedMotion) {
      track.style.transform = `translate3d(${-(maxTranslateX * normalizedProgress)}px, 0, 0)`;
    }

    // Update React state only when progress changes significantly
    if (Math.abs(normalizedProgress - lastProgressRef.current) > ANIMATION_CONFIG.UPDATE_THRESHOLD) {
      lastProgressRef.current = normalizedProgress;
      setProgress(normalizedProgress);
    }
  }, [prefersReducedMotion]);

  const calculateMetrics = useCallback(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    
    if (!outer || !track) return;

    // Calculate maximum horizontal translation
    const maxTranslateX = Math.max(0, track.scrollWidth - window.innerWidth);
    
    // Calculate total scroll length (includes viewport buffer)
    const scrollLength = maxTranslateX + window.innerHeight * ANIMATION_CONFIG.VIEWPORT_BUFFER;

    // Update metrics
    metricsRef.current = { scrollLength, maxTranslateX };

    // Set outer container height to enable scrolling
    outer.style.height = `${scrollLength}px`;

    // Update initial position
    updateScrollPosition();
  }, [updateScrollPosition]);

  // Debounced resize handler
  const debouncedCalculateMetrics = useMemo(
    () => debounce(calculateMetrics, ANIMATION_CONFIG.RESIZE_DEBOUNCE),
    [calculateMetrics]
  );

  const handleScroll = useCallback(() => {
    if (prefersReducedMotion) return;
    
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateScrollPosition);
  }, [updateScrollPosition, prefersReducedMotion]);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery?.matches ?? false);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery?.addEventListener?.("change", handleChange);

    return () => mediaQuery?.removeEventListener?.("change", handleChange);
  }, []);

  // Main scroll effect
  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    
    if (!outer || !track) return;

    // Initial calculation
    calculateMetrics();

    // Set up event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", debouncedCalculateMetrics, { passive: true });

    // Set up ResizeObserver for more reliable dimension tracking
    if (typeof ResizeObserver !== "undefined") {
      resizeObserverRef.current = new ResizeObserver(debouncedCalculateMetrics);
      resizeObserverRef.current.observe(track);
    }

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", debouncedCalculateMetrics);
      cancelAnimationFrame(rafRef.current);
      
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [calculateMetrics, debouncedCalculateMetrics, handleScroll]);

  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <section 
      ref={outerRef} 
      className="relative w-full"
      aria-label="Menu showcase"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4c5a0] via-[#c9b896] to-[#b8a882]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_40%_20%,rgba(255,255,255,0.15),transparent_70%)] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />

        {/* Scrolling content track */}
        <div
          ref={trackRef}
          className="relative z-10 h-full flex items-stretch"
          style={{
            transform: "translate3d(0, 0, 0)",
            willChange: prefersReducedMotion ? "auto" : "transform",
          }}
        >
          {/* ================================================================ */}
          {/* PANEL 1: Introduction */}
          {/* ================================================================ */}
          <div className="h-full w-screen flex items-center px-4 sm:px-6 md:px-10">
            <div className="max-w-6xl mx-auto w-full">
              <div className="max-w-3xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm text-[#5a4a2f] backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#5a4a2f]/70 animate-pulse" />
                  <span className="font-medium">Scroll to explore</span>
                </div>

                {/* Main heading */}
                <h1
                  className="mt-4 sm:mt-6 font-black tracking-tight leading-[0.9]"
                  style={{
                    fontFamily: "surg, system-ui, sans-serif",
                    fontSize: "clamp(2.5rem, 8vw, 7rem)",
                    color: "#5a4a2f",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  {title}
                </h1>

                {/* Subtitle */}
                <p
                  className="mt-3 sm:mt-4 text-sm sm:text-base md:text-xl leading-relaxed max-w-2xl"
                  style={{ fontFamily: "surg, system-ui, sans-serif", color: "#6b5940" }}
                >
                  {subtitle}
                </p>

                {/* Progress indicator */}
                <ProgressIndicator progress={progress} />
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* PANEL 2: Menu Cards */}
          {/* ================================================================ */}
          <div className="h-full w-[160vw] flex items-center px-4 sm:px-6 md:px-10">
            <div className="mx-auto w-full max-w-7xl">
              {/* Section header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
                <div>
                  <h2
                    className="font-black tracking-tight leading-tight"
                    style={{
                      fontFamily: "surg, system-ui, sans-serif",
                      fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)",
                      color: "#5a4a2f",
                    }}
                  >
                    Featured Categories
                  </h2>
                  <p 
                    className="mt-2 text-sm sm:text-base text-[#6b5940]" 
                    style={{ fontFamily: "surg, system-ui, sans-serif" }}
                  >
                    Big visuals, crisp info — everything moves horizontally.
                  </p>
                </div>

                {/* Tip badge (hidden on mobile) */}
                <div className="hidden md:flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-[#5a4a2f] backdrop-blur-md">
                  <span className="opacity-70 font-medium">Tip:</span>
                  <span>use mouse wheel / touchpad</span>
                </div>
              </div>

              {/* Cards grid */}
              <div 
                className="mt-6 sm:mt-8 flex gap-4 sm:gap-5 md:gap-7"
                role="list"
              >
                {validatedItems.map((item, index) => (
                  <MenuCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* PANEL 3: Call to Action */}
          {/* ================================================================ */}
          {/* <div className="h-full w-screen flex items-center px-4 sm:px-6 md:px-10">
            <div className="max-w-6xl mx-auto w-full text-center">
              
              <h2
                className="font-black tracking-tight leading-tight"
                style={{
                  fontFamily: "surg, system-ui, sans-serif",
                  fontSize: "clamp(2rem, 6vw, 5.5rem)",
                  color: "#5a4a2f",
                }}
              >
                Ready to order?
              </h2>
              
              
              <p
                className="mt-3 sm:mt-4 text-sm sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "surg, system-ui, sans-serif", color: "#6b5940" }}
              >
                When this section ends, scrolling becomes normal vertical again.
              </p>

              
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <button
                  type="button"
                  className={cn(
                    "w-full sm:w-auto rounded-full border border-white/25 bg-white/10",
                    "px-6 py-3 text-sm sm:text-base font-medium text-[#5a4a2f]",
                    "backdrop-blur-md hover:bg-white/15 active:bg-white/20",
                    "transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-[#5a4a2f]/50 focus:ring-offset-2"
                  )}
                >
                  Browse Menu
                </button>
                <button
                  type="button"
                  className={cn(
                    "w-full sm:w-auto rounded-full border border-white/25 bg-[#5a4a2f]/20",
                    "px-6 py-3 text-sm sm:text-base font-medium text-[#5a4a2f]",
                    "hover:bg-[#5a4a2f]/25 active:bg-[#5a4a2f]/30",
                    "transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-[#5a4a2f]/50 focus:ring-offset-2"
                  )}
                >
                  Book a Table
                </button>
              </div>
            </div>
          </div> */}
          
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// PROP TYPES
// ============================================================================

HorizontalShowcase.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      meta: PropTypes.string.isRequired,
    })
  ),
};

HorizontalShowcase.displayName = "HorizontalShowcase";

export default HorizontalShowcase;