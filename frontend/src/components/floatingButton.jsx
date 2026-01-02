

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Menu, Phone } from "lucide-react";

const cn = (...a) => a.filter(Boolean).join(" ");

function GlassFab({ href, label, children, accent = "from-white/25 to-white/5" }) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "group relative isolate",
        "w-12 h-12 sm:w-14 sm:h-14",
        "rounded-full",
        "grid place-items-center",
        "border border-white/20",
        "shadow-[0_12px_30px_rgba(0,0,0,0.22)]",
        "backdrop-blur-xl",
        "bg-white/10",
        "active:scale-[0.98]",
        "outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      )}
    >
      {/* liquid highlight */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full",
          "bg-gradient-to-b",
          accent,
          "opacity-80"
        )}
      />
      {/* inner glass rim */}
      <span className="pointer-events-none absolute inset-[1.5px] rounded-full border border-white/15" />

      {/* specular sweep */}
      <span
        className={cn(
          "pointer-events-none absolute -inset-6 rounded-full",
          "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_55%)]",
          "opacity-0"
        )}
      />

      {/* icon */}
      <span className="relative z-10 text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
        {children}
      </span>

      {/* tooltip */}
      <span
        className={cn(
          "absolute right-full mr-3 top-1/2 -translate-y-1/2",
          "px-3 py-1.5 rounded-full",
          "text-xs sm:text-sm font-semibold",
          "text-white whitespace-nowrap",
          "bg-white/10 backdrop-blur-xl",
          "border border-white/20 shadow-lg",
          "opacity-0 -translate-x-2"
        )}
      >
        {label}
      </span>
    </a>
  );
}

export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  // quick reveal
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 140);
    return () => clearTimeout(t);
  }, []);

  const items = useMemo(
    () => [
      {
        key: "menu",
        label: "See Menu",
        href: "/menus", // or "#menu"
        icon: <Menu className="w-5 h-5 sm:w-6 sm:h-6" />,
        accent: "from-white/28 to-white/6",
      },
      {
        key: "call",
        label: "Call",
        href: "tel:+919999999999", // 🔁 replace
        icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />,
        accent: "from-white/24 to-white/5",
      },
    ],
    []
  );

  return (
    <div className="fixed right-4 sm:right-6 bottom-6 z-[999]">
      {/* ✅ ACTIONS OPEN ABOVE THE + BUTTON */}
      <div className="mb-3 flex flex-col gap-3 items-end">
        {items.map((it, idx) => (
          <div
            key={it.key}
            className={cn(
              "transition-all duration-300 ease-out",
              open
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-3 scale-95 pointer-events-none"
            )}
            style={{
              transitionDelay: open ? `${idx * 70}ms` : "0ms",
            }}
          >
            <GlassFab href={it.href} label={it.label} accent={it.accent}>
              {it.icon}
            </GlassFab>
          </div>
        ))}
      </div>

      {/* ✅ + BUTTON STAYS AT BOTTOM */}
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-label={open ? "Close actions" : "Open actions"}
        className={cn(
          "group relative isolate",
          "w-12 h-12 sm:w-14 sm:h-14",
          "rounded-full grid place-items-center",
          "border border-white/20",
          "shadow-[0_12px_30px_rgba(0,0,0,0.22)]",
          "backdrop-blur-xl bg-white/10",
          "active:scale-[0.98]"
        )}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-white/5 opacity-80" />
        <span className="pointer-events-none absolute inset-[1.5px] rounded-full border border-white/15" />

        <span
          className={cn(
            "relative z-10 text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]",
            "transition-transform duration-300",
            open ? "rotate-45" : "rotate-0"
          )}
        >
          {/* plus icon */}
          <span className="block w-5 h-5 sm:w-6 sm:h-6 relative">
            <span className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-white/90 rounded-full" />
            <span className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] w-full bg-white/90 rounded-full" />
          </span>
        </span>

        {/* tooltip */}
        <span
          className={cn(
            "absolute right-full mr-3 top-1/2 -translate-y-1/2",
            "px-3 py-1.5 rounded-full",
            "text-xs sm:text-sm font-semibold",
            "text-white whitespace-nowrap",
            "bg-white/10 backdrop-blur-xl",
            "border border-white/20 shadow-lg",
            "opacity-0 -translate-x-2"
          )}
        >
          {open ? "Close" : "Contact"}
        </span>
      </button>
    </div>
  );
}
