
// import React, { useEffect, useMemo, useRef, useState } from "react";

// export default function RestaurantHero() {
//   const heroRef = useRef(null);
//   const [scrollY, setScrollY] = useState(0);
//   const [vw, setVw] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1200
//   );

//   // ✅ load animation trigger
//   const [intro, setIntro] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrollY(window.scrollY);
//     const onResize = () =>
//       setVw(typeof window !== "undefined" ? window.innerWidth : 1200);

//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onResize, { passive: true });

//     // ✅ trigger enter animation after first paint
//     const raf1 = requestAnimationFrame(() => {
//       const raf2 = requestAnimationFrame(() => setIntro(true));
//       return () => cancelAnimationFrame(raf2);
//     });

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onResize);
//       cancelAnimationFrame(raf1);
//     };
//   }, []);

//   const isMobile = vw < 768;

//   const heroHeight = isMobile ? 650 : 900;
//   const scrollProgress = Math.min(scrollY / heroHeight, 1);

//   const bgParallax = scrollY * (isMobile ? 0.18 : 0.5);
//   const textParallax = scrollY * (isMobile ? 0.12 : 0.3);
//   const tableParallax = scrollY * (isMobile ? 0.16 : 0.4);

//   const chickenFly = scrollY * (isMobile ? -0.22 : -0.8);
//   const broccoliFly = scrollY * (isMobile ? -0.2 : -0.7);
//   const dishFly = scrollY * (isMobile ? -0.12 : -0.5);

//   const itemOpacity = Math.max(
//     1 - scrollProgress * (isMobile ? 1.15 : 1.5),
//     0
//   );
//   const rotationAmount = scrollProgress * (isMobile ? 45 : 180);

//   const dishBottom = useMemo(() => (isMobile ? "26%" : "26%"), [isMobile]);

//   // ✅ intro dish sizing (reference-style)
//   const sideDishSize = isMobile
//     ? "w-[44vw] max-w-[220px]"
//     : "w-[22rem] md:w-[26rem] lg:w-[28rem]";

//   return (
//     <div className="relative">
//       <section
//         ref={heroRef}
//         className="relative min-h-[100svh] overflow-hidden"
//         style={{
//           background:
//             "linear-gradient(135deg, #d4c5a0 0%, #c9b896 50%, #b8a882 100%)",
//         }}
//       >
//         {/* ✅ Antigravity background layer */}
//         <div className="absolute inset-0 z-[0] pointer-events-none">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
//           <div className="absolute inset-0 opacity-70 bg-[radial-gradient(900px_500px_at_50%_30%,rgba(255,255,255,0.12),transparent_70%)]" />
//         </div>

//         {/* ✅ NEW: Side dishes (glide + rotate on page load) */}
//         <div
//           className="pointer-events-none absolute inset-0 z-[9]"
//           style={{ opacity: itemOpacity }}
//         >
//           {/* LEFT dish */}
//           <div
//             className={`absolute ${isMobile ? "left-[-22vw] top-[34%]" : "left-[-8rem] top-[35%]"} -translate-y-1/2`}
//             style={{
//               transform: `
//                 translateY(-50%)
//                 translateY(${tableParallax * 0.08}px)
//                 translateX(${intro ? "0px" : isMobile ? "-120px" : "-220px"})
//                 rotate(${intro ? "0deg" : "-24deg"})
//               `,
//               transition:
//                 "transform 900ms cubic-bezier(.2,.9,.2,1), opacity 900ms cubic-bezier(.2,.9,.2,1)",
//               opacity: intro ? 1 : 0,
//               filter: "drop-shadow(0 24px 30px rgba(0,0,0,0.18))",
//               willChange: "transform, opacity",
//             }}
//           >
//             <img
//               src="/images/dish1.png"
//               alt="Signature Dish Left"
//               loading="eager"
//               decoding="async"
//               width={700}
//               height={700}
//               className={`object-contain ${sideDishSize}`}
//               draggable={false}
//             />
//           </div>

//           {/* RIGHT dish */}
//           <div
//             className={`absolute ${isMobile ? "right-[-22vw] top-[34%]" : "right-[-8rem] top-[35%]"} -translate-y-1/2`}
//             style={{
//               transform: `
//                 translateY(-50%)
//                 translateY(${tableParallax * 0.08}px)
//                 translateX(${intro ? "0px" : isMobile ? "120px" : "220px"})
//                 rotate(${intro ? "0deg" : "24deg"})
//               `,
//               transition:
//                 "transform 900ms cubic-bezier(.2,.9,.2,1), opacity 900ms cubic-bezier(.2,.9,.2,1)",
//               opacity: intro ? 1 : 0,
//               filter: "drop-shadow(0 24px 30px rgba(0,0,0,0.18))",
//               willChange: "transform, opacity",
//             }}
//           >
//             <img
//               src="/images/dish2.png"
//               alt="Signature Dish Right"
//               loading="eager"
//               decoding="async"
//               width={700}
//               height={700}
//               className={`object-contain ${sideDishSize}`}
//               draggable={false}
//             />
//           </div>
//         </div>

//         {/* Big watermark */}
//         <div
//           className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-[1]"
//           style={{
//             transform: `translateY(${bgParallax}px)`,
//             opacity: itemOpacity,
//           }}
//         >
//           <h1
//             className="font-black tracking-tighter opacity-10 select-none whitespace-nowrap"
//             style={{
//               fontFamily: "surg",
//               fontSize: "clamp(10rem, 28vw, 28rem)",
//               color: "#8b7d5c",
//               textTransform: "lowercase",
//             }}
//           >
//             restorang
//           </h1>
//         </div>

//         <div className="relative z-10 w-full">
//           {/* TEXT */}
//           <div
//             className="w-full px-4 sm:px-8 pt-16 sm:pt-24"
//             style={{
//               transform: `translateY(${textParallax}px)`,
//               opacity: itemOpacity,
//             }}
//           >
//             <div className="max-w-5xl mx-auto text-center">
//               <h1
//                 className="font-black tracking-tight"
//                 style={{
//                   fontFamily: "surg",
//                   fontSize: "clamp(3.2rem, 10vw, 14rem)",
//                   color: "#5a4a2f",
//                   textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
//                   animation: "fadeInDown 1s ease-out",
//                 }}
//               >
//                 Restorang
//               </h1>

//               <p
//                 className="mt-3 sm:mt-4 text-base sm:text-2xl"
//                 style={{
//                   fontFamily: "surg",
//                   color: "#6b5940",
//                   animation: "fadeIn 1.5s ease-out",
//                 }}
//               >
//                 Classic India, Chinese, Continental Dine In
//               </p>

//               <p
//                 className="mt-3 sm:mt-4 text-sm sm:text-lg max-w-md sm:max-w-2xl mx-auto"
//                 style={{
//                   fontFamily: "surg",
//                   color: "#7a6a4f",
//                   animation: "fadeIn 2s ease-out",
//                 }}
//               >
//                 Experience a culinary journey where traditional flavors meet
//                 contemporary dining. Our chefs craft each dish with passion,
//                 bringing you authentic tastes from around the world.
//               </p>
//             </div>
//           </div>

//           {/* SCENE */}
//           <div
//             className="relative w-full"
//             style={{
//               transform: `translateY(${tableParallax}px)`,
//               opacity: itemOpacity,
//             }}
//           >
//             <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8">
//               <div className="relative h-[62svh] min-h-[520px]">
//                 {/* CHICKEN */}
//                 <div
//                   className={`
//                     pointer-events-none absolute z-20
//                     ${isMobile ? "left-0 top-[18%]" : "-left-32 md:-left-56 top-3/3"}
//                     -translate-y-1/2
//                   `}
//                   style={{
//                     transform: isMobile
//                       ? `translateY(${chickenFly}px) translateX(${chickenFly * 0.15}px) rotate(${rotationAmount}deg)`
//                       : `translateY(${chickenFly}px) translateX(${chickenFly * 0.5}px) rotate(${rotationAmount}deg)`,
//                   }}
//                 >
//                   <img
//                     src="/images/chicken-fry.png"
//                     alt="Fried Chicken"
//                     loading="eager"
//                     decoding="async"
//                     fetchPriority="high"
//                     width={600}
//                     height={600}
//                     className={`
//                       object-contain drop-shadow-2xl
//                       ${isMobile ? "w-[48vw] max-w-[260px]" : "w-44 h-44 md:w-[30rem] md:h-[30rem]"}
//                     `}
//                     draggable={false}
//                   />
//                 </div>

//                 {/* BROCCOLI */}
//                 <div
//                   className={`
//                     pointer-events-none absolute z-20
//                     ${isMobile ? "right-0 top-[18%]" : "-right-32 md:-right-56 top-3/3"}
//                     -translate-y-1/2
//                   `}
//                   style={{
//                     transform: isMobile
//                       ? `translateY(${broccoliFly}px) translateX(${-broccoliFly * 0.15}px) rotate(${-rotationAmount}deg)`
//                       : `translateY(${broccoliFly}px) translateX(${-broccoliFly * 0.5}px) rotate(${-rotationAmount}deg)`,
//                   }}
//                 >
//                   <img
//                     src="/images/brocoli.png"
//                     alt="Broccoli"
//                     loading="eager"
//                     decoding="async"
//                     fetchPriority="high"
//                     width={600}
//                     height={600}
//                     className={`
//                       object-contain drop-shadow-2xl
//                       ${isMobile ? "w-[48vw] max-w-[260px]" : "w-44 h-44 md:w-[30rem] md:h-[30rem]"}
//                     `}
//                     draggable={false}
//                   />
//                 </div>

//                 {/* TABLE */}
//                 <div
//                   className={`
//                     absolute left-1/2 -translate-x-1/2 w-full
//                     ${isMobile ? "max-w-[620px]" : "max-w-4xl"}
//                     bottom-8 sm:bottom-10 md:bottom-32
//                   `}
//                   style={{
//                     transform: `translateY(${dishFly * 0.3}px) translateX(-50%)`,
//                   }}
//                 >
//                   <img
//                     src="/images/table.png"
//                     alt="Wooden Table"
//                     loading="eager"
//                     decoding="async"
//                     fetchPriority="high"
//                     width={1200}
//                     height={600}
//                     className="w-full object-contain drop-shadow-2xl pointer-events-none"
//                     draggable={false}
//                   />

//                   {/* DISHES */}
//                   <div
//                     className={`
//                       absolute left-1/2 -translate-x-1/2 flex items-end justify-center gap-6 md:gap-8 pointer-events-none
//                       ${isMobile ? "gap-6" : "gap-8 md:gap-6"}
//                     `}
//                     style={{
//                       bottom: dishBottom,
//                       width: "100%",
//                       maxWidth: isMobile ? "560px" : "900px",
//                     }}
//                   >
//                     <img
//                       src="/images/pizza.png"
//                       alt="Pizza"
//                       loading="eager"
//                       decoding="async"
//                       width={300}
//                       height={300}
//                       className={`
//                         object-contain drop-shadow-xl
//                         ${isMobile ? "w-[22vw] max-w-[110px]" : "w-32 md:w-40"}
//                       `}
//                       draggable={false}
//                     />

//                     <img
//                       src="/images/potato.png"
//                       alt="Potato"
//                       loading="eager"
//                       decoding="async"
//                       width={320}
//                       height={320}
//                       className={`
//                         object-contain drop-shadow-xl
//                         ${isMobile ? "w-[26vw] max-w-[130px]" : "w-36 md:w-44"}
//                       `}
//                       draggable={false}
//                       style={{ marginBottom: isMobile ? 2 : 4 }}
//                     />

//                     <img
//                       src="/images/chicken.png"
//                       alt="Chicken"
//                       loading="eager"
//                       decoding="async"
//                       width={300}
//                       height={300}
//                       className={`
//                         object-contain drop-shadow-xl
//                         ${isMobile ? "w-[22vw] max-w-[110px]" : "w-32 md:w-40"}
//                       `}
//                       draggable={false}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Scroll Indicator */}
//             <div
//               className="absolute left-1/2 -translate-x-1/2 bottom-6 sm:bottom-12 animate-bounce"
//               style={{ opacity: itemOpacity }}
//             >
//               <div className="flex flex-col items-center gap-2 pointer-events-none">
//                 <svg
//                   width="22"
//                   height="22"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#7a6a4f"
//                   strokeWidth="2"
//                 >
//                   <path d="M12 5v14M19 12l-7 7-7-7" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         <style>{`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           @keyframes fadeInDown {
//             from { opacity: 0; transform: translateY(-30px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           body { margin: 0; overflow-x: hidden; }
//         `}</style>
//       </section>
//     </div>
//   );
// }





















































import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

import dish1 from "../assets/images/dish1.png";
import dish2 from "../assets/images/dish2.png";
import chickenFry from "../assets/images/chicken-fry.png";
import brocoli from "../assets/images/brocoli.png";
import tableImg from "../assets/images/table.png";
import pizzaImg from "../assets/images/pizza.png";
import potatoImg from "../assets/images/potato.png";
import chickenImg from "../assets/images/chicken.png";

/**
 * RestaurantHero Component
 * 
 * A high-performance, accessible hero section with parallax effects and entrance animations.
 * Features:
 * - Mobile-first responsive design
 * - Optimized scroll and resize handlers with debouncing
 * - Accessibility improvements (ARIA labels, reduced motion support)
 * - Performance optimizations (memoization, will-change, passive listeners)
 * - Clean separation of concerns
 * 
 * @component
 */
export default function RestaurantHero() {
  // Refs
  const heroRef = useRef(null);
  const scrollRAF = useRef(null);
  const resizeTimeout = useRef(null);

  // State
  const [scrollY, setScrollY] = useState(0);
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [introComplete, setIntroComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Optimized scroll handler with RAF
  const handleScroll = useCallback(() => {
    if (scrollRAF.current) return;
    
    scrollRAF.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
      scrollRAF.current = null;
    });
  }, []);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (resizeTimeout.current) {
      clearTimeout(resizeTimeout.current);
    }
    
    resizeTimeout.current = setTimeout(() => {
      setVw(window.innerWidth);
    }, 150);
  }, []);

  // Setup event listeners and intro animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Trigger intro animation after first paint
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setIntroComplete(true);
      });
      return () => cancelAnimationFrame(raf2);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollRAF.current) cancelAnimationFrame(scrollRAF.current);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      cancelAnimationFrame(raf1);
    };
  }, [handleScroll, handleResize]);

  // Memoized breakpoint and calculations
  const isMobile = useMemo(() => vw < 768, [vw]);
  const isTablet = useMemo(() => vw >= 768 && vw < 1024, [vw]);

  // Memoized scroll calculations
  const scrollMetrics = useMemo(() => {
    const heroHeight = isMobile ? 650 : 900;
    const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
    
    // Disable parallax if reduced motion is preferred
    const motionMultiplier = prefersReducedMotion ? 0 : 1;
    
    return {
      progress,
      bgParallax: scrollY * (isMobile ? 0.18 : 0.5) * motionMultiplier,
      textParallax: scrollY * (isMobile ? 0.12 : 0.3) * motionMultiplier,
      tableParallax: scrollY * (isMobile ? 0.16 : 0.4) * motionMultiplier,
      chickenFly: scrollY * (isMobile ? -0.22 : -0.8) * motionMultiplier,
      broccoliFly: scrollY * (isMobile ? -0.2 : -0.7) * motionMultiplier,
      dishFly: scrollY * (isMobile ? -0.12 : -0.5) * motionMultiplier,
      itemOpacity: Math.max(1 - progress * (isMobile ? 1.15 : 1.5), 0),
      rotationAmount: progress * (isMobile ? 45 : 180) * motionMultiplier,
    };
  }, [scrollY, isMobile, prefersReducedMotion]);

  // Responsive sizing
  const sizing = useMemo(() => ({
    dishBottom: "26%",
    sideDishSize: isMobile
      ? "w-[44vw] max-w-[220px]"
      : "w-[22rem] md:w-[26rem] lg:w-[28rem]",
    flyingItemSize: isMobile
      ? "w-[48vw] max-w-[260px]"
      : "w-44 h-44 md:w-[30rem] md:h-[30rem]",
    pizzaSize: isMobile ? "w-[22vw] max-w-[110px]" : "w-32 md:w-40",
    potatoSize: isMobile ? "w-[26vw] max-w-[130px]" : "w-36 md:w-44",
    chickenSize: isMobile ? "w-[22vw] max-w-[110px]" : "w-32 md:w-40",
  }), [isMobile]);

  // Animation transition timing
  const introTransition = prefersReducedMotion
    ? "none"
    : "transform 900ms cubic-bezier(.2,.9,.2,1), opacity 900ms cubic-bezier(.2,.9,.2,1)";

  return (
    <div className="relative">
      <section
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #d4c5a0 0%, #c9b896 50%, #b8a882 100%)",
        }}
        aria-label="Restaurant hero section"
      >
        {/* Background layers */}
        <div 
          className="absolute inset-0 z-[0] pointer-events-none" 
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(900px_500px_at_50%_30%,rgba(255,255,255,0.12),transparent_70%)]" />
        </div>

        {/* Side dishes with entrance animation */}
        <div
          className="pointer-events-none absolute inset-0 z-[9]"
          style={{ opacity: scrollMetrics.itemOpacity }}
          aria-hidden="true"
        >
          {/* Left dish */}
          <div
            className={`absolute ${
              isMobile ? "left-[-22vw] top-[34%]" : "left-[-8rem] top-[35%]"
            } -translate-y-1/2`}
            style={{
              transform: `
                translateY(-50%)
                translateY(${scrollMetrics.tableParallax * 0.08}px)
                translateX(${introComplete ? "0px" : isMobile ? "-120px" : "-220px"})
                rotate(${introComplete ? "0deg" : "-24deg"})
              `,
              transition: introTransition,
              opacity: introComplete ? 1 : 0,
              filter: "drop-shadow(0 24px 30px rgba(0,0,0,0.18))",
              willChange: scrollY < 900 ? "transform, opacity" : "auto",
            }}
          >
            <img
              src={dish1}
              alt=""
              role="presentation"
              loading="eager"
              decoding="async"
              width={700}
              height={700}
              className={`object-contain ${sizing.sideDishSize}`}
              draggable={false}
            />
          </div>

          {/* Right dish */}
          <div
            className={`absolute ${
              isMobile ? "right-[-22vw] top-[34%]" : "right-[-8rem] top-[35%]"
            } -translate-y-1/2`}
            style={{
              transform: `
                translateY(-50%)
                translateY(${scrollMetrics.tableParallax * 0.08}px)
                translateX(${introComplete ? "0px" : isMobile ? "120px" : "220px"})
                rotate(${introComplete ? "0deg" : "24deg"})
              `,
              transition: introTransition,
              opacity: introComplete ? 1 : 0,
              filter: "drop-shadow(0 24px 30px rgba(0,0,0,0.18))",
              willChange: scrollY < 900 ? "transform, opacity" : "auto",
            }}
          >
            <img
              src={dish2}
              alt=""
              role="presentation"
              loading="eager"
              decoding="async"
              width={700}
              height={700}
              className={`object-contain ${sizing.sideDishSize}`}
              draggable={false}
            />
          </div>
        </div>

        {/* Large watermark background text */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-[1]"
          style={{
            transform: `translateY(${scrollMetrics.bgParallax}px)`,
            opacity: scrollMetrics.itemOpacity,
          }}
          aria-hidden="true"
        >
          <h2
            className="font-black tracking-tighter opacity-10 select-none whitespace-nowrap"
            style={{
              fontFamily: "surg, sans-serif",
              fontSize: "clamp(10rem, 28vw, 28rem)",
              color: "#8b7d5c",
              textTransform: "lowercase",
            }}
          >
            restorang
          </h2>
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full">
          {/* Hero text */}
          <div
            className="w-full px-4 sm:px-8 pt-16 sm:pt-24"
            style={{
              transform: `translateY(${scrollMetrics.textParallax}px)`,
              opacity: scrollMetrics.itemOpacity,
            }}
          >
            <div className="max-w-5xl mx-auto text-center">
              <h1
                className="font-black tracking-tight"
                style={{
                  fontFamily: "surg, sans-serif",
                  fontSize: "clamp(3.2rem, 10vw, 14rem)",
                  color: "#5a4a2f",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  animation: prefersReducedMotion ? "none" : "fadeInDown 1s ease-out",
                }}
              >
                Restorang
              </h1>

              <p
                className="mt-3 sm:mt-4 text-base sm:text-2xl"
                style={{
                  fontFamily: "surg, sans-serif",
                  color: "#6b5940",
                  animation: prefersReducedMotion ? "none" : "fadeIn 1.5s ease-out",
                }}
              >
                Classic India, Chinese, Continental Dine In
              </p>

              <p
                className="mt-3 sm:mt-4 text-sm sm:text-lg max-w-md sm:max-w-2xl mx-auto"
                style={{
                  fontFamily: "surg, sans-serif",
                  color: "#ffffffff",
                  animation: prefersReducedMotion ? "none" : "fadeIn 2s ease-out",
                }}
              >
                Experience a culinary journey where traditional flavors meet
                contemporary dining. Our chefs craft each dish with passion,
                bringing you authentic tastes from around the world.
              </p>
            </div>
          </div>

          {/* Food scene */}
          <div
            className="relative w-full"
            style={{
              transform: `translateY(${scrollMetrics.tableParallax}px)`,
              opacity: scrollMetrics.itemOpacity,
            }}
          >
            <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8">
              <div className="relative h-[62svh] min-h-[520px]">
                
                {/* Flying chicken */}
                <div
                  className={`pointer-events-none absolute z-20 ${
                    isMobile
                      ? "left-0 top-[18%]"
                      : "-left-32 md:-left-56 top-3/3"
                  } -translate-y-1/2`}
                  style={{
                    transform: isMobile
                      ? `translateY(${scrollMetrics.chickenFly}px) translateX(${
                          scrollMetrics.chickenFly * 0.15
                        }px) rotate(${scrollMetrics.rotationAmount}deg)`
                      : `translateY(${scrollMetrics.chickenFly}px) translateX(${
                          scrollMetrics.chickenFly * 0.5
                        }px) rotate(${scrollMetrics.rotationAmount}deg)`,
                    willChange: scrollY < 900 ? "transform" : "auto",
                  }}
                  aria-hidden="true"
                >
                  <img
                    src={chickenFry}
                    alt=""
                    role="presentation"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                    width={600}
                    height={600}
                    className={`object-contain drop-shadow-2xl ${sizing.flyingItemSize}`}
                    draggable={false}
                  />
                </div>

                {/* Flying broccoli */}
                <div
                  className={`pointer-events-none absolute z-20 ${
                    isMobile
                      ? "right-0 top-[18%]"
                      : "-right-32 md:-right-56 top-3/3"
                  } -translate-y-1/2`}
                  style={{
                    transform: isMobile
                      ? `translateY(${scrollMetrics.broccoliFly}px) translateX(${
                          -scrollMetrics.broccoliFly * 0.15
                        }px) rotate(${-scrollMetrics.rotationAmount}deg)`
                      : `translateY(${scrollMetrics.broccoliFly}px) translateX(${
                          -scrollMetrics.broccoliFly * 0.5
                        }px) rotate(${-scrollMetrics.rotationAmount}deg)`,
                    willChange: scrollY < 900 ? "transform" : "auto",
                  }}
                  aria-hidden="true"
                >
                  <img
                    src={brocoli}
                    alt=""
                    role="presentation"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                    width={600}
                    height={600}
                    className={`object-contain drop-shadow-2xl ${sizing.flyingItemSize}`}
                    draggable={false}
                  />
                </div>

                {/* Table with dishes */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-full ${
                    isMobile ? "max-w-[620px]" : "max-w-4xl"
                  } bottom-8 sm:bottom-10 md:bottom-32`}
                  style={{
                    transform: `translateY(${
                      scrollMetrics.dishFly * 0.3
                    }px) translateX(-50%)`,
                    willChange: scrollY < 900 ? "transform" : "auto",
                  }}
                >
                  <img
                    src={tableImg}
                    alt="Wooden dining table"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                    width={1200}
                    height={600}
                    className="w-full object-contain drop-shadow-2xl pointer-events-none"
                    draggable={false}
                  />

                  {/* Dishes on table */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 flex items-end justify-center pointer-events-none ${
                      isMobile ? "gap-6" : "gap-8 md:gap-6"
                    }`}
                    style={{
                      bottom: sizing.dishBottom,
                      width: "100%",
                      maxWidth: isMobile ? "560px" : "900px",
                    }}
                  >
                    <img
                      src={pizzaImg}
                      alt="Pizza dish"
                      loading="eager"
                      decoding="async"
                      width={300}
                      height={300}
                      className={`object-contain drop-shadow-xl ${sizing.pizzaSize}`}
                      draggable={false}
                    />

                    <img
                      src={potatoImg}
                      alt="Potato dish"
                      loading="eager"
                      decoding="async"
                      width={320}
                      height={320}
                      className={`object-contain drop-shadow-xl ${sizing.potatoSize}`}
                      draggable={false}
                      style={{ marginBottom: isMobile ? 2 : 4 }}
                    />

                    <img
                      src={chickenImg}
                      alt="Chicken dish"
                      loading="eager"
                      decoding="async"
                      width={300}
                      height={300}
                      className={`object-contain drop-shadow-xl ${sizing.chickenSize}`}
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-6 sm:bottom-12"
              style={{
                opacity: scrollMetrics.itemOpacity,
                animation: prefersReducedMotion ? "none" : "bounce 2s infinite",
              }}
              aria-hidden="true"
            >
              <div className="flex flex-col items-center gap-2 pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7a6a4f"
                  strokeWidth="2"
                  aria-label="Scroll down"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Keyframe animations */}
        <style>{`
          @keyframes fadeIn {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes fadeInDown {
            from { 
              opacity: 0; 
              transform: translateY(-30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes bounce {
            0%, 100% { 
              transform: translateY(0) translateX(-50%); 
            }
            50% { 
              transform: translateY(-10px) translateX(-50%); 
            }
          }
          
          /* Respect reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          body { 
            margin: 0; 
            overflow-x: hidden; 
          }
        `}</style>
      </section>
    </div>
  );
}



