// src/sections/GallerySection.jsx
import React from "react";
import CircularGallery from "../components/cards";
// import Dots from "../components/dots";

// local images
import img1 from "../assets/specials/img1.jpg";
import img2 from "../assets/specials/img2.jpg";
import img3 from "../assets/specials/img3.jpg";
import img4 from "../assets/specials/img4.jpg";
import img5 from "../assets/specials/img5.jpg";

export default function GallerySection() {
  const items = [
    { image: img1, text: "Biriyani" },
    { image: img2, text: "Breakfast" },
    { image: img3, text: "Continental" },
    { image: img4, text: "Italian" },
    { image: img5, text: "Seafood" },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 🔮 FULLSCREEN DOT GRID BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {/* <Dots
          dotSize={10}
          gap={15}
          baseColor="#5227FF"
          activeColor="#7C5CFF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        /> */}
      </div>

      {/* 🌌 Optional dark gradient overlay (depth) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#fff] via-[#fff] to-[#ffffff]" />

      {/* 🎠 FOREGROUND GALLERY */}
      <div className="relative z-20 flex h-full items-center justify-center">
        <div
          style={{
            width: "100%",
            height: "70vh",
            position: "relative",
          }}
        >
          <CircularGallery
            items={items}
            bend={3}
            textColor="#8f6400ff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
      </div>
    </section>
  );
}
