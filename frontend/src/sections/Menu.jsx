import React from "react";
import { CircularGallery } from "../components/ui/circular-gallery";
import InteractiveDotsBg from "../components/ui/interactive-dots";
import FlowingMenu from "../components/ui/flowingMenu";

// const demoItems = [
//   { link: "#", text: "Indian Classics", image: "/images/img1.jpg" },
//   { link: "#", text: "Chinese Delights", image: "/images/img2.jpg" },
//   { link: "#", text: "Continental Favorites", image: "/images/img3.jpg" },
//   { link: "#", text: "Desserts & Drinks", image: "/images/img4.jpg" },
// ];


const demoItems = [
  { link: "/menus", text: "Indian Classics", image: "/images/img1.jpg" },
  { link: "/menus", text: "Chinese Delights", image: "/images/img2.jpg" },
  { link: "/menus", text: "Continental Favorites", image: "/images/img3.jpg" },
  { link: "/menus", text: "Desserts & Drinks", image: "/images/img4.jpg" },
];

/* -------------------- LOCAL GALLERY DATA --------------------
   Put images in: public/images/gallery/*
   and use url: "/images/gallery/xxx.jpg"
-------------------------------------------------------------- */
const galleryData = [
  {
    common: "Signature Platter",
    binomial: "Chef Special",
    photo: {
      url: "/images/img1.jpg",
      text: "signature platter",
      pos: "50% 50%",
      by: "Resturang",
    },
  },
  {
    common: "Woodfire Pizza",
    binomial: "Italian",
    photo: {
      url: "/images/img2.jpg",
      text: "woodfire pizza",
      pos: "50% 50%",
      by: "Resturang",
    },
  },
  {
    common: "Spicy Chicken",
    binomial: "Indian",
    photo: {
      url: "/images/img3.jpg",
      text: "spicy chicken",
      pos: "50% 50%",
      by: "Resturang",
    },
  },
  {
    common: "Dessert Bowl",
    binomial: "Continental",
    photo: {
      url: "/images/img4.jpg",
      text: "dessert bowl",
      pos: "50% 50%",
      by: "Resturang",
    },
  },
  {
    common: "Noodles",
    binomial: "Chinese",
    photo: {
      url: "/images/img5.jpg",
      text: "noodles bowl",
      pos: "50% 50%",
      by: "Resturang",
    },
  },
  // {
  //   common: "Mocktail",
  //   binomial: "Beverage",
  //   photo: {
  //     url: "/images/gallery/food-6.jpg",
  //     text: "mocktail",
  //     pos: "50% 50%",
  //     by: "Resturang",
  //   },
  // },
];

export default function CircularGalleryAndMenu() {
  return (
    <section className="w-full text-[#2b2417]">
      {/* ================== PART 1: CIRCULAR GALLERY ================== */}
      <div className="w-full relative" style={{ height: "350vh" }}>
        {/* Sticky area */}
        <div className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden relative">
          {/* Interactive dots background */}
          <InteractiveDotsBg
            baseBg="#b8a882"
            dotColor="rgba(132, 110, 44, 0.95)"
            count={110}
            radius={140}
          />

          {/* Overlay heading */}
          <div className="absolute top-16 z-10 text-center px-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide text-[#4a3b22]">
              Explore Our Specials
            </h2>
            <p className="text-[#5a4a2f]/80 mt-2">
              Scroll to rotate the gallery
            </p>
          </div>

          {/* Gallery container */}
          <div className="w-full h-full relative z-[2]">
            <CircularGallery items={galleryData} radius={520} autoRotateSpeed={0.03} />
          </div>

          {/* soft overlay for better contrast */}
          <div className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "radial-gradient(1200px 600px at 50% 40%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 70%)",
            }}
          />
        </div>
      </div>

      {/* ================== PART 2: OUR MENU ================== */}
      <section className="relative min-h-screen bg-gradient-to-b from-[#2b2417] to-[#1c170f] text-white py-24 px-8 overflow-hidden">
        {/* Optional: add dots behind menu too */}
        <div className="absolute inset-0 opacity-40">
          <InteractiveDotsBg
            baseBg="transparent"
            dotColor="rgba(245,198,51,0.55)"
            count={90}
            radius={120}
          />
        </div>

        <div className="relative w-full">
          <h2
            className="text-6xl md:text-7xl font-bold text-center mb-6"
            style={{ fontFamily: "surg" }}
          >
            Our Menu
          </h2>

          <p
            className="text-xl text-center text-white/70 mb-14 max-w-2xl mx-auto"
            style={{ fontFamily: "surg" }}
          >
            Explore our carefully curated selection of dishes, each prepared with
            the finest ingredients and authentic recipes.
          </p>

          {/* ✅ FlowingMenu area */}
          {/* ✅ Full-width FlowingMenu */}
          <div className="relative w-full h-[70vh] mt-16">
            <FlowingMenu items={demoItems} />
          </div>

        </div>
      </section>
    </section>
  );
}
