Summary of implemented optimizations

- Lazy-loaded below-the-fold sections: `Gallery`, `Reservation`, `about`, `footer` via `src/components/LazySection.jsx`. This defers heavy code (notably `@react-three/*`, `three`) and WebGL until needed.
- Added loading / decoding hints to images used in hero and gallery fallback to reduce network pressure and limit layout shift.
- Preconnected and preloaded Google Fonts in `index.html` (fonts moved out of component inline @import).
- Added `vite-plugin-compression` and `vite-imagetools` to `vite.config.js` (requires install) so you can generate optimized image variants and compressed build artifacts.

Recommended follow-up steps (run these locally):

1) Install the build plugins (optional but recommended):
   npm install -D vite-plugin-compression vite-imagetools

2) Convert main `public/images/*` images to WebP/AVIF (or generate variants during build):
   - Option A: Use `vite-imagetools` and import images using `?format=webp;avif;png&q=75` where needed.
   - Option B: Bulk convert images offline (e.g., using `imagemin` / `sharp`) and put optimized files into `public/gallery/`.

3) Analyze bundle sizes:
   - Add `rollup-plugin-visualizer` or run `npm run build` and inspect `dist` to ensure big deps are not in initial chunk.

4) Consider server-level caching and compression on your hosting/CDN (Brotli/Gzip, long cache TTL for hashed assets).

Notes / Constraints:
- I didn't change any design or major component behaviour; changes are focused on deferring work until needed and improving loading hints.
- After installing the optional plugins, do a clean `npm run build` and test in production mode to verify LCP / TTFB improvements.

If you want, I can:
- Add a `image-optimization` npm script that converts public images to WebP/AVIF with `sharp`.
- Make more components lazy (e.g., animated footer or 3D-cards) if you'd like further savings.
