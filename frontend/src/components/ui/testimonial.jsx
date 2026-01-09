"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * CircularTestimonials (JSX)
 * - Mobile-first Tailwind layout
 * - No style-jsx (works in Vite + Next)
 * - Uses lucide-react icons (shadcn standard)
 */

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;

  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}) {
  // Colors
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";

  // Font sizes
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const testimonialsLength = useMemo(() => testimonials?.length || 0, [testimonials]);
  const activeTestimonial = useMemo(
    () => (testimonialsLength ? testimonials[activeIndex] : null),
    [activeIndex, testimonials, testimonialsLength]
  );

  // Resize observer (simple window resize)
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clearAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  const handleNext = useCallback(() => {
    if (!testimonialsLength) return;
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    clearAutoplay();
  }, [testimonialsLength, clearAutoplay]);

  const handlePrev = useCallback(() => {
    if (!testimonialsLength) return;
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    clearAutoplay();
  }, [testimonialsLength, clearAutoplay]);

  // Autoplay
  useEffect(() => {
    clearAutoplay();
    if (!autoplay || !testimonialsLength) return;

    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, 5000);

    return () => clearAutoplay();
  }, [autoplay, testimonialsLength, clearAutoplay]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext]);

  // Compute transforms for each image (show only left/center/right)
  const getImageStyle = useCallback(
    (index) => {
      const gap = calculateGap(containerWidth);
      const maxStickUp = gap * 0.8;

      const isActive = index === activeIndex;
      const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
      const isRight = (activeIndex + 1) % testimonialsLength === index;

      if (isActive) {
        return {
          zIndex: 3,
          opacity: 1,
          pointerEvents: "auto",
          transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
          transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        };
      }

      if (isLeft) {
        return {
          zIndex: 2,
          opacity: 1,
          pointerEvents: "auto",
          transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
          transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        };
      }

      if (isRight) {
        return {
          zIndex: 2,
          opacity: 1,
          pointerEvents: "auto",
          transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
          transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        };
      }

      return {
        zIndex: 1,
        opacity: 0,
        pointerEvents: "none",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    },
    [activeIndex, containerWidth, testimonialsLength]
  );

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (!testimonialsLength) {
    return (
      <div className="w-full max-w-3xl rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/60">
        No testimonials provided.
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl p-4 sm:p-6 md:p-8">
      <div className="grid gap-10 md:grid-cols-2 md:gap-20">
        {/* Images */}
        <div
          ref={imageContainerRef}
        //   className="relative h-72 w-full sm:h-80 md:h-96"
        className="relative h-60 w-full sm:h-80 md:h-96"

          style={{ perspective: 1000 }}
        >
          {testimonials.map((t, index) => (
            <img
              key={`${t.src}-${index}`}
              src={t.src}
              alt={t.name}
              className="absolute inset-0 h-full w-full rounded-3xl object-cover shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              style={getImageStyle(index)}
              loading="lazy"
              draggable={false}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="font-bold"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>

              <p
                className="mt-1"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>

              <motion.p
                className="mt-6 leading-relaxed"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {String(activeTestimonial.quote)
                  .split(" ")
                  .map((word, i) => (
                    <motion.span
                      key={`${word}-${i}`}
                      initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.22,
                        ease: "easeInOut",
                        delay: 0.025 * i,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-4 md:mt-0">
            <button
              type="button"
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition"
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
            >
              <ChevronLeft className="h-6 w-6" style={{ color: colorArrowFg }} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition"
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
            >
              <ChevronRight className="h-6 w-6" style={{ color: colorArrowFg }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircularTestimonials;
