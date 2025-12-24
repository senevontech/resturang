"use client";

import React, { useEffect, useRef, useState } from "react";

const Footer = ({
  leftLinks,
  rightLinks,
  copyrightText,
  barCount = 23,
}) => {
  const waveRefs = useRef([]);
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef(null);

  /* -------------------- intersection observer -------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  /* -------------------- wave animation -------------------- */
  useEffect(() => {
    let t = 0;

    const animateWave = () => {
      let offset = 0;

      waveRefs.current.forEach((el, index) => {
        if (!el) return;
        offset += Math.max(0, 20 * Math.sin((t + index) * 0.3));
        el.style.transform = `translateY(${index + offset}px)`;
      });

      t += 0.1;
      animationFrameRef.current = requestAnimationFrame(animateWave);
    };

    if (isVisible) {
      animateWave();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <footer
      ref={footerRef}
      className="bg-[#b8a882] text-white relative flex flex-col w-full lg:h-50% select-none"
    >
      {/* ---------- top content ---------- */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-6 pb-24 pt-10 px-6 text-black">
        <div>
          <ul className="flex flex-wrap gap-4">
            {leftLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="text-sm hover:text-yellow-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-xs mt-6 opacity-70">
            {copyrightText}
          </p>
        </div>

        <div className="text-right">
          <ul className="flex flex-wrap justify-end gap-4">
            {rightLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="text-sm hover:text-yellow-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm mt-6 hover:underline"
          >
            Back to top
          </button>
        </div>
      </div>

      {/* ---------- animated wave ---------- */}
      <div aria-hidden style={{ height: 200, overflow: "hidden" }}>
        {Array.from({ length: barCount }).map((_, index) => (
          <div
            key={index}
            ref={(el) => (waveRefs.current[index] = el)}
            style={{
              height: index + 1,
              backgroundColor: "#90885bff",
              marginTop: "-2px",
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
