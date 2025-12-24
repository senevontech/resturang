// src/components/HeroScrollStack.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ScrollStack, { ScrollStackItem } from "../components/stack";
import "./HeroStacks.css";

gsap.registerPlugin(ScrollTrigger);

// A single slide (bg + title/subtitle) with GSAP on-enter animation
function HeroSlide({ bg, title, subtitle }) {
  const slideRef = useRef(null);

  useLayoutEffect(() => {
    const el = slideRef.current;
    if (!el) return;

    const t = el.querySelector("[data-title]");
    const s = el.querySelector("[data-subtitle]");
    const bgEl = el.querySelector("[data-bg]");

    const ctx = gsap.context(() => {
      // BG subtle motion
      gsap.fromTo(
        bgEl,
        { scale: 1.1 },
        {
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Title/Sub enter animation (plays once when slide enters)
      gsap.fromTo(
        t,
        { y: 40, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        s,
        { y: 22, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
          delay: 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, slideRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={slideRef} className="hero-slide">
      {/* BG */}
      <div
        data-bg
        className="hero-bg"
        style={{ backgroundImage: `url(${bg})` }}
      />
      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-copy">
          <h1 data-title className="hero-title">
            {title}
          </h1>
          <p data-subtitle className="hero-subtitle">
            {subtitle}
          </p>

          <div className="hero-cta-row">
            <button className="hero-btn hero-btn-primary">Start Tour</button>
            <button className="hero-btn hero-btn-ghost">View Features</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroScrollStack() {
  return (
    <section className="hero-stack-wrap">
      <ScrollStack
        className="hero-stack"
        useWindowScroll={true}
        itemDistance={0}
        itemStackDistance={0}
        stackPosition="0%"
        scaleEndPosition="0%"
        baseScale={1}
        itemScale={0}
        rotationAmount={0}
        blurAmount={0}
      >
        <ScrollStackItem itemClassName="hero-card">
          <HeroSlide
            bg="/images/img1.jpg"
            title="Explore the World in 3D"
            subtitle="Stacked hero slides powered by Lenis + your ScrollStack engine."
          />
        </ScrollStackItem>

        <ScrollStackItem itemClassName="hero-card">
          <HeroSlide
            bg="/images/img2.jpg"
            title="Cinematic Section Cover"
            subtitle="Scroll down — each slide naturally covers the previous."
          />
        </ScrollStackItem>

        <ScrollStackItem itemClassName="hero-card">
          <HeroSlide
            bg="/images/img3.jpg"
            title="Ready for Your Blender Map"
            subtitle="After the last slide, your normal sections continue below."
          />
        </ScrollStackItem>

        {/* ✅ Added more items */}
        <ScrollStackItem itemClassName="hero-card">
          <HeroSlide
            bg="/images/img4.jpg"
            title="Real-time Interaction"
            subtitle="Rotate, pan, zoom — make it feel like a game world."
          />
        </ScrollStackItem>

        <ScrollStackItem itemClassName="hero-card">
          <HeroSlide
            bg="/images/img5.jpg"
            title="Optimized for Performance"
            subtitle="Smooth visuals with modern rendering + clean transitions."
          />
        </ScrollStackItem>

       
      </ScrollStack>
    </section>
  );
}
