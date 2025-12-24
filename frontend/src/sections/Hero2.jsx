// import React, { useState, useEffect, useRef } from "react";

// export default function RestaurantHero() {
//     const [scrollY, setScrollY] = useState(0);
//     const heroRef = useRef(null);

//     useEffect(() => {
//         const handleScroll = () => setScrollY(window.scrollY);
//         window.addEventListener("scroll", handleScroll, { passive: true });
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     // Calculate parallax and flying effects
//     const heroHeight = 900;
//     const scrollProgress = Math.min(scrollY / heroHeight, 1);

//     // Parallax speeds for different elements
//     const bgParallax = scrollY * 0.5;
//     const textParallax = scrollY * 0.3;
//     const tableParallax = scrollY * 0.4;

//     // Flying animations - items fly away as you scroll
//     const chickenFly = scrollY * -0.8; // left + up
//     const broccoliFly = scrollY * -0.7; // right + up
//     const dishFly = scrollY * -0.5; // up slower

//     // Opacity fade as items fly away
//     const itemOpacity = Math.max(1 - scrollProgress * 1.5, 0);

//     // Rotation based on scroll
//     const rotationAmount = scrollProgress * 180;

//     return (
//         <div className="relative">
//             {/* Hero Section */}
//             <section
//                 ref={heroRef}
//                 className="relative h-screen overflow-hidden"
//                 style={{
//                     background:
//                         "linear-gradient(135deg, #d4c5a0 0%, #c9b896 50%, #b8a882 100%)",
//                 }}
//             >
//                 {/* Large Background Text Watermark */}
//                 <div
//                     className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
//                     style={{
//                         transform: `translateY(${bgParallax}px)`,
//                         opacity: itemOpacity,
//                     }}
//                 >
//                     <h1
//                         className="text-[28vw] font-black tracking-tighter opacity-10 select-none whitespace-nowrap"
//                         style={{
//                             fontFamily: "surg",
//                             color: "#8b7d5c",
//                             textTransform: "lowercase",
//                         }}
//                     >
//                         restorang
//                     </h1>
//                 </div>

//                 {/* Main Content Container */}
//                 <div className="relative h-full flex flex-col items-center justify-center px-8">
//                     {/* Title and Subtitle */}
//                     <div
//                         className="text-center z-10 mb-16"
//                         style={{
//                             transform: `translateY(${textParallax}px)`,
//                             opacity: itemOpacity,
//                         }}
//                     >
//                         <h1
//                             className="font-black mb-6 tracking-tight"
//                             style={{
//                                 fontFamily: "surg",
//                                 fontSize: "clamp(6rem, 12vw, 14rem)",
//                                 color: "#5a4a2f",
//                                 textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
//                                 animation: "fadeInDown 1s ease-out",
//                             }}
//                         >
//                             Resturang
//                         </h1>

//                         <p
//                             className="text-xl md:text-2xl mb-4"
//                             style={{
//                                 fontFamily: "surg",
//                                 color: "#6b5940",
//                                 animation: "fadeIn 1.5s ease-out",
//                             }}
//                         >
//                             Classic India, Chinese, Continental Dine In
//                         </p>

//                         <p
//                             className="text-base md:text-lg max-w-2xl mx-auto"
//                             style={{
//                                 fontFamily: "surg",
//                                 color: "#7a6a4f",
//                                 animation: "fadeIn 2s ease-out",
//                             }}
//                         >
//                             Experience a culinary journey where traditional flavors meet
//                             contemporary dining. Our chefs craft each dish with passion,
//                             bringing you authentic tastes from around the world.
//                         </p>
//                     </div>

//                     {/* Food Display */}
//                     <div
//                         className="relative w-full max-w-6xl"
//                         style={{
//                             transform: `translateY(${tableParallax}px)`,
//                             opacity: itemOpacity,
//                         }}
//                     >
//                         {/* Fried Chicken - Left */}
//                         <div
//                             className="absolute -left-24 md:-left-44 top-1/1 -translate-y-1/2 z-20 pointer-events-none"
//                             style={{
//                                 transform: `translateY(${chickenFly}px) translateX(${chickenFly * 0.5
//                                     }px) rotate(${rotationAmount}deg)`,
//                                 animation: "rotateIn 1.2s ease-out, float 3s ease-in-out infinite",
//                                 animationDelay: "0s, 1.2s",
//                             }}
//                         >
//                             <img
//                                 src="/images/chicken-fry.png"
//                                 alt="Fried Chicken"
//                                 className="w-40 h-40 md:w-96 md:h-96 object-contain drop-shadow-2xl"
//                                 draggable={false}
//                             />
//                         </div>

//                         {/* Broccoli - Right */}
//                         <div
//                             className="absolute -right-24 md:-right-44 top-1/1 -translate-y-1/2 z-20 pointer-events-none"
//                             style={{
//                                 transform: `translateY(${broccoliFly}px) translateX(${-broccoliFly * 0.5
//                                     }px) rotate(${-rotationAmount}deg)`,
//                                 animation: "rotateIn 1.4s ease-out, float 3.5s ease-in-out infinite",
//                                 animationDelay: "0s, 1.4s",
//                             }}
//                         >
//                             <img
//                                 src="/images/brocoli.png"
//                                 alt="Broccoli"
//                                 className="w-40 h-40 md:w-96 md:h-96 object-contain drop-shadow-2xl"
//                                 draggable={false}
//                             />
//                         </div>

//                         {/* Table + Dishes */}
//                         {/* Table + Dishes */}
//                         <div
//                             className="relative mx-auto w-full max-w-4xl  mt-10 md:mt-24"
//                             style={{ transform: `translateY(${dishFly * 0.3}px)` }}
//                         >
//                             {/* Wooden Table Image */}
//                             <div className="relative pointer-events-none">
//                                 <img
//                                     src="/images/table.png"
//                                     alt="Wooden Table"
//                                     className="w-full object-contain drop-shadow-2xl"
//                                     draggable={false}
//                                 />
//                             </div>

//                             {/* ✅ Dishes OVER the table */}
//                             <div
//                                 className="absolute left-1/2 -translate-x-1/2 flex items-end justify-center gap-8 md:gap-6 pointer-events-none"
//                                 style={{
//                                     // adjust this number to perfectly sit on table top
//                                     bottom: "22%",
//                                     width: "100%",
//                                     maxWidth: "900px",
//                                 }}
//                             >
//                                 {/* Dish 1 */}
//                                 <div
//                                     className="relative"
//                                     style={{
//                                         animation: "rotateIn 1s ease-out, hover 4s ease-in-out infinite",
//                                         animationDelay: "0.2s, 1s",
//                                     }}
//                                 >
//                                     <img
//                                         src="/images/pizza.png"
//                                         alt="Dish 1"
//                                         className="w-32 md:w-40 object-contain drop-shadow-xl"
//                                         draggable={false}
//                                     />
//                                 </div>

//                                 {/* Dish 2 */}
//                                 <div
//                                     className="relative"
//                                     style={{
//                                         animation: "rotateIn 1.2s ease-out, hover 4.5s ease-in-out infinite",
//                                         animationDelay: "0.4s, 1.2s",
//                                         transform: `translateY(${dishFly * 0.12}px)`,
//                                     }}
//                                 >
//                                     <img
//                                         src="/images/potato.png"
//                                         alt="Dish 2"
//                                         className="w-36 md:w-44 object-contain drop-shadow-xl"
//                                         draggable={false}
//                                     />
//                                 </div>

//                                 {/* Dish 3 */}
//                                 <div
//                                     className="relative"
//                                     style={{
//                                         animation: "rotateIn 1.4s ease-out, hover 3.8s ease-in-out infinite",
//                                         animationDelay: "0.6s, 1.4s",
//                                     }}
//                                 >
//                                     <img
//                                         src="/images/chicken.png"
//                                         alt="Dish 3"
//                                         className="w-32 md:w-40 object-contain drop-shadow-xl"
//                                         draggable={false}
//                                     />
//                                 </div>
//                             </div>
//                         </div>



//                     </div>

//                     {/* Scroll Indicator */}
//                     <div
//                         className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
//                         style={{ opacity: itemOpacity }}
//                     >
//                         <div className="flex flex-col items-center gap-2">
//                             <span
//                                 className="text-sm tracking-widest uppercase"
//                                 style={{
//                                     color: "#7a6a4f",
//                                     fontFamily: "'Crimson Text', serif",
//                                 }}
//                             >
//                                 Scroll
//                             </span>
//                             <svg
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="#7a6a4f"
//                                 strokeWidth="2"
//                             >
//                                 <path d="M12 5v14M19 12l-7 7-7-7" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Styles */}
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Text:wght@400;600;700&display=swap');

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes fadeInDown {
//           from { opacity: 0; transform: translateY(-30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes rotateIn {
//           from { opacity: 0; transform: rotate(-180deg) scale(0.5); }
//           to { opacity: 1; transform: rotate(0deg) scale(1); }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(5deg); }
//         }

//         @keyframes hover {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }

//         * { scroll-behavior: smooth; }

//         body { margin: 0; overflow-x: hidden; }
//       `}</style>
//         </div>
//     );
// }


















// _____________________________________________________________________________________________________








import React, { useEffect, useMemo, useRef, useState } from "react";

export default function RestaurantHero() {
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const isMobile = vw < 768;

  // --- scroll math (mobile uses softer values) ---
  const heroHeight = isMobile ? 650 : 900;
  const scrollProgress = Math.min(scrollY / heroHeight, 1);

  const bgParallax = scrollY * (isMobile ? 0.18 : 0.5);
  const textParallax = scrollY * (isMobile ? 0.12 : 0.3);
  const tableParallax = scrollY * (isMobile ? 0.16 : 0.4);

  const chickenFly = scrollY * (isMobile ? -0.22 : -0.8);
  const broccoliFly = scrollY * (isMobile ? -0.2 : -0.7);
  const dishFly = scrollY * (isMobile ? -0.12 : -0.5);

  const itemOpacity = Math.max(1 - scrollProgress * (isMobile ? 1.15 : 1.5), 0);
  const rotationAmount = scrollProgress * (isMobile ? 45 : 180);

  // ✅ Dishes a bit higher above table now (mobile + desktop)
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
        {/* Big watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
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
              <div
                className={`relative ${
                  isMobile ? "h-[62svh] min-h-[520px]" : "h-[62svh] min-h-[520px]"
                }`}
              >
                {/* ✅ CHICKEN bigger */}
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
                    className={`
                      object-contain drop-shadow-2xl
                      ${isMobile ? "w-[48vw] max-w-[260px]" : "w-44 h-44 md:w-[30rem] md:h-[30rem]"}
                    `}
                    draggable={false}
                  />
                </div>

                {/* ✅ BROCCOLI bigger */}
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
                    className={`
                      object-contain drop-shadow-2xl
                      ${isMobile ? "w-[48vw] max-w-[260px]" : "w-44 h-44 md:w-[30rem] md:h-[30rem]"}
                    `}
                    draggable={false}
                  />
                </div>

                {/* ✅ TABLE moved UP slightly */}
                <div
                  className={`
                    absolute left-1/2 -translate-x-1/2 w-full
                    ${isMobile ? "max-w-[620px]" : "max-w-4xl"}
                    bottom-8 sm:bottom-10 md:bottom-12
                  `}
                  style={{
                    transform: `translateY(${dishFly * 0.3}px) translateX(-50%)`,
                  }}
                >
                  <img
                    src="/images/table.png"
                    alt="Wooden Table"
                    className="w-full object-contain drop-shadow-2xl pointer-events-none"
                    draggable={false}
                  />

                  {/* DISHES */}
                  <div
                    className={`
                      absolute left-1/2 -translate-x-1/2 flex items-end justify-center pointer-events-none
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
                      className={`
                        object-contain drop-shadow-xl
                        ${isMobile ? "w-[22vw] max-w-[110px]" : "w-32 md:w-40"}
                      `}
                      draggable={false}
                    />
                    <img
                      src="/images/potato.png"
                      alt="Potato"
                      className={`
                        object-contain drop-shadow-xl
                        ${isMobile ? "w-[26vw] max-w-[130px]" : "w-36 md:w-44"}
                      `}
                      draggable={false}
                    //   style={{
                    //     transform: `translateY(${dishFly * (isMobile ? 0.08 : 0.12)}px)`,
                    //   }}
                    />
                    <img
                      src="/images/chicken.png"
                      alt="Chicken"
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
                <span
                  className="text-xs sm:text-sm tracking-widest uppercase"
                  style={{
                    color: "#7a6a4f",
                    fontFamily: "'Crimson Text', serif",
                  }}
                >
                  Scroll
                </span>
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
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Text:wght@400;600;700&display=swap');

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
