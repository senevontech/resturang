// import React from "react";
// import InfiniteGallery from "../components/ui/3d-gallery";
// import InteractiveDotsBg from "../components/ui/interactive-dots";

// export default function Gallery3D() {
//   // ✅ Use your local images from public/images/gallery/*
//   const sampleImages = [
//     { src: "/gallery/img1.jpg", alt: "Gallery 1" },
//     { src: "/gallery/img2.jpg", alt: "Gallery 2" },
//     { src: "/gallery/img3.jpg", alt: "Gallery 3" },
//     { src: "/gallery/img4.jpg", alt: "Gallery 4" },
//     { src: "/gallery/img5.jpg", alt: "Gallery 5" },
//     { src: "/gallery/img6.jpg", alt: "Gallery 6" },
//     { src: "/gallery/img7.jpg", alt: "Gallery 7" },
//     { src: "/gallery/img8.jpg", alt: "Gallery 8" },
//   ];

//   return (
//     <section className="relative min-h-screen w-full overflow-hidden">
//       {/* Beige bg + yellow dots */}
//       <InteractiveDotsBg
//         baseBg="#b8a882"
//         dotColor="rgba(245,198,51,0.75)"
//         count={120}
//         radius={140}
//       />

//       <div className="relative z-[2] min-h-screen">
//         <InfiniteGallery
//           images={sampleImages}
//           speed={1.2}
//           visibleCount={12}
//           className="h-screen w-full overflow-hidden"
//         />

//         {/* Overlay title */}
//         <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
//           <h2 className="font-serif text-4xl md:text-7xl tracking-tight">
//             <span className="italic">Resturang</span> Gallery
//           </h2>
//         </div>

//         {/* Controls hint */}
//         <div className="pointer-events-none absolute bottom-10 left-0 right-0 text-center font-mono uppercase text-[11px] font-semibold text-white/80">
//           <p>Use mouse wheel, arrow keys, or touch to navigate</p>
//           <p className="opacity-60">Auto-play resumes after 3 seconds of inactivity</p>
//         </div>
//       </div>
//     </section>
//   );
// }































import React from "react";
import InfiniteGallery from "../components/ui/3d-gallery";
import InteractiveDotsBg from "../components/ui/interactive-dots";

export default function Gallery3D() {
  const sampleImages = [
    { src: "/gallery/img1.jpg", alt: "Gallery 1" },
    { src: "/gallery/img2.jpg", alt: "Gallery 2" },
    { src: "/gallery/img3.jpg", alt: "Gallery 3" },
    { src: "/gallery/img4.jpg", alt: "Gallery 4" },
    { src: "/gallery/img5.jpg", alt: "Gallery 5" },
    { src: "/gallery/img6.jpg", alt: "Gallery 6" },
    { src: "/gallery/img7.jpg", alt: "Gallery 7" },
    { src: "/gallery/img8.jpg", alt: "Gallery 8" },
  ];

  return (
    // ✅ 5 scroll screens pinned => (5 + 1) * 100vh = 600vh
    <section className="relative w-full" style={{ height: "300vh" }}>
      {/* ✅ Sticky only for the scroll container height */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <InteractiveDotsBg
          baseBg="#b8a882"
          dotColor="rgba(245,198,51,0.75)"
          count={120}
          radius={140}
        />

        <div className="relative z-[2] h-screen w-full">
          <InfiniteGallery
            images={sampleImages}
            speed={1.2}
            visibleCount={12}
            className="h-screen w-full"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center px-3 mix-blend-exclusion text-white z-[3]">
          <h2 className="font-serif text-4xl md:text-7xl tracking-tight">
            <span className="italic">Resturang</span> Gallery
          </h2>
        </div>

        <div className="pointer-events-none absolute bottom-10 left-0 right-0 text-center font-mono uppercase text-[11px] font-semibold text-white/80 z-[3]">
          <p>Use mouse wheel, arrow keys, or touch to navigate</p>
          <p className="opacity-60">Auto-play resumes after 3 seconds of inactivity</p>
        </div>
      </div>
    </section>
  );
}
