
import React, { useEffect, useMemo, useRef, useState } from "react";
import SphereImageGrid from "../components/ui/img-sphere";

const BASE_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    alt: "Mountain Landscape",
    title: "Mountain Landscape",
    description: "Golden hour mountains with dramatic light.",
  },
  {
    src: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80",
    alt: "Portrait Photography",
    title: "Portrait Photography",
    description: "Soft natural light portrait composition.",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    alt: "Urban Architecture",
    title: "Urban Architecture",
    description: "Modern glass architecture and geometry.",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    alt: "Nature Scene",
    title: "Nature Scene",
    description: "Calm forest atmosphere with rich greens.",
  },
  {
    src: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=1200&q=80",
    alt: "Abstract",
    title: "Abstract",
    description: "Color and texture with artistic vibes.",
  },
  {
    src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80",
    alt: "City Night",
    title: "City Night",
    description: "Urban lights and depth at night.",
  },
];

function buildImages(count = 60) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const base = BASE_IMAGES[i % BASE_IMAGES.length];
    out.push({
      id: `img-${i + 1}`,
      ...base,
      alt: `${base.alt} (${Math.floor(i / BASE_IMAGES.length) + 1})`,
    });
  }
  return out;
}

export default function DemoSphere() {
  const wrapperRef = useRef(null);
  const [size, setSize] = useState(320);

  // Mobile-first responsive sizing: sphere fits viewport width.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      // clamp: min 280px, max 600px
      const next = Math.max(280, Math.min(600, Math.floor(w)));
      setSize(next);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const images = useMemo(() => buildImages(60), []);

  const CONFIG = {
    containerSize: size,
    sphereRadius: Math.floor(size * 0.44), // responsive radius
    dragSensitivity: 0.8,
    momentumDecay: 0.96,
    maxRotationSpeed: 6,
    baseImageScale: 0.15,
    hoverScale: 1.3,
    perspective: 1000,
    autoRotate: true,
    autoRotateSpeed: 0.2,
  };

  return (
    <main className=" w-full px-4 py-10 bg-[#c9b896]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-balance text-2xl font-semibold sm:text-3xl text-black">
            Resturang Gallery
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base text-black">
            get a glimps inside our aesthetic environemnt
          </p>
        </div>

        <div ref={wrapperRef} className="mx-auto w-full max-w-[600px]">
          <SphereImageGrid images={images} {...CONFIG} className="mx-auto" />
        </div>
      </div>
    </main>
  );
}





































// import React, { useEffect, useMemo, useRef, useState } from "react";
// import SphereImageGrid from "../components/ui/img-sphere";

// // ✅ Local images from src/assets (change names to match yours)
// import g1 from "../assets/gallery/img1.jpg";
// import g2 from "../assets/gallery/img2.jpg";
// import g3 from "../assets/gallery/img3.jpg";
// import g4 from "../assets/gallery/img4.jpg";
// import g5 from "../assets/gallery/img5.jpg";
// import g6 from "../assets/gallery/img6.jpg";

// const BASE_IMAGES = [
//   { src: g1, alt: "Gallery 1", title: "Gallery 1", description: "Local image" },
//   { src: g2, alt: "Gallery 2", title: "Gallery 2", description: "Local image" },
//   { src: g3, alt: "Gallery 3", title: "Gallery 3", description: "Local image" },
//   { src: g4, alt: "Gallery 4", title: "Gallery 4", description: "Local image" },
//   { src: g5, alt: "Gallery 5", title: "Gallery 5", description: "Local image" },
//   { src: g6, alt: "Gallery 6", title: "Gallery 6", description: "Local image" },
// ];

// function buildImages(count = 60) {
//   const out = [];
//   for (let i = 0; i < count; i++) {
//     const base = BASE_IMAGES[i % BASE_IMAGES.length];
//     out.push({
//       id: `img-${i + 1}`,
//       ...base,
//       alt: `${base.alt} (${Math.floor(i / BASE_IMAGES.length) + 1})`,
//     });
//   }
//   return out;
// }

// export default function DemoSphere() {
//   const wrapperRef = useRef(null);
//   const [size, setSize] = useState(360);

//   // ✅ Bigger sphere on mobile: use more of viewport width
//   useEffect(() => {
//     const el = wrapperRef.current;
//     if (!el) return;

//     const ro = new ResizeObserver(() => {
//       const w = el.clientWidth;

//       // ✅ Make it bigger than before:
//       // min 340 (mobile), max 720 (desktop)
//       const next = Math.max(340, Math.min(720, Math.floor(w)));
//       setSize(next);
//     });

//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   const images = useMemo(() => buildImages(60), []);

//   // ✅ Use a larger radius ratio + slightly bigger image scale for mobile impact
//   const CONFIG = useMemo(() => {
//     const isMobile = size <= 420;

//     return {
//       containerSize: size,
//       sphereRadius: Math.floor(size * (isMobile ? 0.42 : 0.38)), // ✅ bigger globe radius
//       dragSensitivity: 0.85,
//       momentumDecay: 0.96,
//       maxRotationSpeed: 6,
//       baseImageScale: isMobile ? 0.17 : 0.15, // ✅ slightly bigger dots on mobile
//       hoverScale: 1.3,
//       perspective: 1000,
//       autoRotate: true,
//       autoRotateSpeed: 0.2,
//     };
//   }, [size]);

//   return (
//     <main className=" w-full px-4 py-10 bg-[#c9b896]">
//       <div className="mx-auto max-w-5xl">
//         <div className="mb-6 space-y-2 text-center">
//           <h1 className="text-balance text-2xl font-semibold sm:text-3xl text-black">
//             Resturang Gallery
//           </h1>
//           <p className="text-sm sm:text-base text-black/70">
//             Get a glimpse inside our aesthetic environment
//           </p>
//         </div>

//         {/* ✅ give wrapper more width so containerSize can grow */}
//         <div ref={wrapperRef} className="mx-auto w-full max-w-[720px]">
//           <SphereImageGrid images={images} {...CONFIG} className="mx-auto" />
//         </div>
//       </div>
//     </main>
//   );
// }
