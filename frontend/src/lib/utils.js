// src/lib/utils.js

// Simple className merge helper (shadcn-like)
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
