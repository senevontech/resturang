// src/components/ui/image-gallery.jsx
import React from "react";
import { cn } from "@/lib/utils";

export default function ImageGallery({
  title = "Our Latest Creations",
  subtitle = "A visual collection of our most recent works – each piece crafted with intention, emotion, and style.",
  images = [
    "https://images.unsplash.com/photo-1719368472026-dc26f70a9b76?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1649265825072-f7dd6942baed?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1729086046027-09979ade13fd?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1601568494843-772eb04aca5d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1585687501004-615dfdfde7f1?auto=format&fit=crop&w=1200&q=80",
  ],
  className,
}) {
  return (
    <section
      className={cn(
        "w-full flex flex-col items-center justify-start py-12",
        className
      )}
    >
      <div className="max-w-3xl text-center px-4">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-sm text-slate-500 mt-2">{subtitle}</p>
      </div>

      {/* Gallery */}
      <div
        className={cn(
          // desktop layout
          "mt-10 w-full max-w-5xl px-4",
          "flex items-center gap-2 h-[400px]",
          // mobile: scroll instead of hover expand
          "overflow-x-auto md:overflow-visible",
          "snap-x snap-mandatory md:snap-none"
        )}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className={cn(
              "relative group rounded-lg overflow-hidden h-[400px]",
              // base width for mobile + snap
              "flex-none w-72 snap-start",
              // desktop: grow + hover expand
              "md:flex-grow md:w-56 md:transition-all md:duration-500 md:hover:w-full"
            )}
          >
            <img
              className="h-full w-full object-cover object-center"
              src={src}
              alt={`image-${idx}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
