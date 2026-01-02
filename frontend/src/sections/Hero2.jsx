


// import React, { useEffect, useMemo, useRef, useState } from "react";

// export default function RestaurantHero() {
//   const heroRef = useRef(null);
//   const [scrollY, setScrollY] = useState(0);
//   const [vw, setVw] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1200
//   );

//   useEffect(() => {
//     const onScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", onScroll, { passive: true });

//     const onResize = () => setVw(window.innerWidth);
//     window.addEventListener("resize", onResize, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onResize);
//     };
//   }, []);

//   const isMobile = vw < 768;

//   // --- scroll math (mobile uses softer values) ---
//   const heroHeight = isMobile ? 650 : 900;
//   const scrollProgress = Math.min(scrollY / heroHeight, 1);

//   const bgParallax = scrollY * (isMobile ? 0.18 : 0.5);
//   const textParallax = scrollY * (isMobile ? 0.12 : 0.3);
//   const tableParallax = scrollY * (isMobile ? 0.16 : 0.4);

//   const chickenFly = scrollY * (isMobile ? -0.22 : -0.8);
//   const broccoliFly = scrollY * (isMobile ? -0.2 : -0.7);
//   const dishFly = scrollY * (isMobile ? -0.12 : -0.5);

//   const itemOpacity = Math.max(1 - scrollProgress * (isMobile ? 1.15 : 1.5), 0);
//   const rotationAmount = scrollProgress * (isMobile ? 45 : 180);

//   // ✅ Dishes a bit higher above table now (mobile + desktop)
//   const dishBottom = useMemo(() => (isMobile ? "26%" : "26%"), [isMobile]);

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
//         {/* Big watermark */}
//         <div
//           className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
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
//               <div
//                 className={`relative ${
//                   isMobile ? "h-[62svh] min-h-[520px]" : "h-[62svh] min-h-[520px]"
//                 }`}
//               >
//                 {/* ✅ CHICKEN bigger */}
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

//                 {/* ✅ BROCCOLI bigger */}
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

//                 {/* ✅ TABLE moved UP slightly */}
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

//                     //   style={{
//                     //     transform: `translateY(${dishFly * (isMobile ? 0.08 : 0.12)}px)`,
//                     //   }}
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
//                 <span
//                   className="text-xs sm:text-sm tracking-widest uppercase"
//                   style={{
//                     color: "#7a6a4f",
//                     fontFamily: "'Crimson Text', serif",
//                   }}
//                 >
                  
//                 </span>
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
































import React, { useEffect, useMemo, useRef, useState } from "react";
import Antigravity from "../components/ui/AntiGravity";

export default function RestaurantHero() {
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () =>
      setVw(typeof window !== "undefined" ? window.innerWidth : 1200);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const isMobile = vw < 768;

  const heroHeight = isMobile ? 650 : 900;
  const scrollProgress = Math.min(scrollY / heroHeight, 1);

  const bgParallax = scrollY * (isMobile ? 0.18 : 0.5);
  const textParallax = scrollY * (isMobile ? 0.12 : 0.3);
  const tableParallax = scrollY * (isMobile ? 0.16 : 0.4);

  const chickenFly = scrollY * (isMobile ? -0.22 : -0.8);
  const broccoliFly = scrollY * (isMobile ? -0.2 : -0.7);
  const dishFly = scrollY * (isMobile ? -0.12 : -0.5);

  const itemOpacity = Math.max(
    1 - scrollProgress * (isMobile ? 1.15 : 1.5),
    0
  );
  const rotationAmount = scrollProgress * (isMobile ? 45 : 180);

  const dishBottom = useMemo(() => (isMobile ? "26%" : "26%"), [isMobile]);

  return (
    <div className="relative">
      <section
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #d4c5a0 0%, #c9b896 50%, #b8a882 100%)",
        }}
      >
        {/* ✅ Antigravity background layer (smaller + fewer + darker) */}
        <div className="absolute inset-0 z-[0] pointer-events-none">
          <Antigravity
            // dark olive / brown to match your warm background (NOT pure black)
            color="#52480fff"
            // fewer particles
            count={isMobile ? 105 : 200}
            // smaller particles
            particleSize={isMobile ? 0.65 : 0.85}
            // calmer motion
            magnetRadius={isMobile ? 6 : 8}
            ringRadius={isMobile ? 6 : 8}
            waveSpeed={0.35}
            waveAmplitude={0.55}
            lerpSpeed={0.08}
            particleVariance={0.8}
            rotationSpeed={0.05}
            depthFactor={0.75}
            pulseSpeed={2.2}
            particleShape="capsule"
            fieldStrength={12}
            autoAnimate
          />

          {/* darker blend so particles sit subtle */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(900px_500px_at_50%_30%,rgba(255,255,255,0.12),transparent_70%)]" />
        </div>

        {/* Big watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-[1]"
          style={{
            transform: `translateY(${bgParallax}px)`,
            opacity: itemOpacity,
          }}
        >
          <h1
            className="font-black tracking-tighter opacity-10 select-none whitespace-nowrap"
            style={{
              fontFamily: "surg",
              fontSize: "clamp(10rem, 28vw, 28rem)",
              color: "#8b7d5c",
              textTransform: "lowercase",
            }}
          >
            restorang
          </h1>
        </div>

        <div className="relative z-10 w-full">
          {/* TEXT */}
          <div
            className="w-full px-4 sm:px-8 pt-16 sm:pt-24"
            style={{
              transform: `translateY(${textParallax}px)`,
              opacity: itemOpacity,
            }}
          >
            <div className="max-w-5xl mx-auto text-center">
              <h1
                className="font-black tracking-tight"
                style={{
                  fontFamily: "surg",
                  fontSize: "clamp(3.2rem, 10vw, 14rem)",
                  color: "#5a4a2f",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  animation: "fadeInDown 1s ease-out",
                }}
              >
                Restorang
              </h1>

              <p
                className="mt-3 sm:mt-4 text-base sm:text-2xl"
                style={{
                  fontFamily: "surg",
                  color: "#6b5940",
                  animation: "fadeIn 1.5s ease-out",
                }}
              >
                Classic India, Chinese, Continental Dine In
              </p>

              <p
                className="mt-3 sm:mt-4 text-sm sm:text-lg max-w-md sm:max-w-2xl mx-auto"
                style={{
                  fontFamily: "surg",
                  color: "#7a6a4f",
                  animation: "fadeIn 2s ease-out",
                }}
              >
                Experience a culinary journey where traditional flavors meet
                contemporary dining. Our chefs craft each dish with passion,
                bringing you authentic tastes from around the world.
              </p>
            </div>
          </div>

          {/* SCENE */}
          <div
            className="relative w-full"
            style={{
              transform: `translateY(${tableParallax}px)`,
              opacity: itemOpacity,
            }}
          >
            <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8">
              <div className="relative h-[62svh] min-h-[520px]">
                {/* CHICKEN */}
                <div
                  className={`
                    pointer-events-none absolute z-20
                    ${isMobile ? "left-0 top-[18%]" : "-left-32 md:-left-56 top-3/3"}
                    -translate-y-1/2
                  `}
                  style={{
                    transform: isMobile
                      ? `translateY(${chickenFly}px) translateX(${chickenFly * 0.15}px) rotate(${rotationAmount}deg)`
                      : `translateY(${chickenFly}px) translateX(${chickenFly * 0.5}px) rotate(${rotationAmount}deg)`,
                  }}
                >
                  <img
                    src="/images/chicken-fry.png"
                    alt="Fried Chicken"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    width={600}
                    height={600}
                    className={`
                      object-contain drop-shadow-2xl
                      ${isMobile ? "w-[48vw] max-w-[260px]" : "w-44 h-44 md:w-[30rem] md:h-[30rem]"}
                    `}
                    draggable={false}
                  />
                </div>

                {/* BROCCOLI */}
                <div
                  className={`
                    pointer-events-none absolute z-20
                    ${isMobile ? "right-0 top-[18%]" : "-right-32 md:-right-56 top-3/3"}
                    -translate-y-1/2
                  `}
                  style={{
                    transform: isMobile
                      ? `translateY(${broccoliFly}px) translateX(${-broccoliFly * 0.15}px) rotate(${-rotationAmount}deg)`
                      : `translateY(${broccoliFly}px) translateX(${-broccoliFly * 0.5}px) rotate(${-rotationAmount}deg)`,
                  }}
                >
                  <img
                    src="/images/brocoli.png"
                    alt="Broccoli"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    width={600}
                    height={600}
                    className={`
                      object-contain drop-shadow-2xl
                      ${isMobile ? "w-[48vw] max-w-[260px]" : "w-44 h-44 md:w-[30rem] md:h-[30rem]"}
                    `}
                    draggable={false}
                  />
                </div>

                {/* TABLE */}
                <div
                  className={`
                    absolute left-1/2 -translate-x-1/2 w-full
                    ${isMobile ? "max-w-[620px]" : "max-w-4xl"}
                    bottom-8 sm:bottom-10 md:bottom-32
                  `}
                  style={{
                    transform: `translateY(${dishFly * 0.3}px) translateX(-50%)`,
                  }}
                >
                  <img
                    src="/images/table.png"
                    alt="Wooden Table"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    width={1200}
                    height={600}
                    className="w-full object-contain drop-shadow-2xl pointer-events-none"
                    draggable={false}
                  />

                  {/* DISHES */}
                  <div
                    className={`
                      absolute left-1/2 -translate-x-1/2 flex items-end justify-center gap-6 md:gap-8 pointer-events-none
                      ${isMobile ? "gap-6" : "gap-8 md:gap-6"}
                    `}
                    style={{
                      bottom: dishBottom,
                      width: "100%",
                      maxWidth: isMobile ? "560px" : "900px",
                    }}
                  >
                    <img
                      src="/images/pizza.png"
                      alt="Pizza"
                      loading="eager"
                      decoding="async"
                      width={300}
                      height={300}
                      className={`
                        object-contain drop-shadow-xl
                        ${isMobile ? "w-[22vw] max-w-[110px]" : "w-32 md:w-40"}
                      `}
                      draggable={false}
                    />

                    <img
                      src="/images/potato.png"
                      alt="Potato"
                      loading="eager"
                      decoding="async"
                      width={320}
                      height={320}
                      className={`
                        object-contain drop-shadow-xl
                        ${isMobile ? "w-[26vw] max-w-[130px]" : "w-36 md:w-44"}
                      `}
                      draggable={false}
                      style={{ marginBottom: isMobile ? 2 : 4 }}
                    />

                    <img
                      src="/images/chicken.png"
                      alt="Chicken"
                      loading="eager"
                      decoding="async"
                      width={300}
                      height={300}
                      className={`
                        object-contain drop-shadow-xl
                        ${isMobile ? "w-[22vw] max-w-[110px]" : "w-32 md:w-40"}
                      `}
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-6 sm:bottom-12 animate-bounce"
              style={{ opacity: itemOpacity }}
            >
              <div className="flex flex-col items-center gap-2 pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7a6a4f"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          body { margin: 0; overflow-x: hidden; }
        `}</style>
      </section>
    </div>
  );
}
