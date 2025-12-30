import React, { useEffect, useRef, useState, Suspense } from "react";

// LazySection: dynamically imports a section when it approaches the viewport.
// - importFunc: () => import('../sections/SomeSection')
// - placeholder: optional React node shown until component is loaded
// - rootMargin: intersection observer margin (defaults to '300px')
export default function LazySection({ importFunc, placeholder = null, rootMargin = "300px", ...props }) {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [LoadedComponent, setLoadedComponent] = useState(null);

  useEffect(() => {
    if (!shouldLoad || LoadedComponent) return;
    let mounted = true;
    importFunc().then((mod) => {
      if (!mounted) return;
      setLoadedComponent(() => mod.default || (() => null));
    });
    return () => (mounted = false);
  }, [shouldLoad, LoadedComponent, importFunc]);

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldLoad) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, shouldLoad, rootMargin]);

  return (
    <div ref={ref}>
      {LoadedComponent ? (
        <Suspense fallback={placeholder ?? <div style={{ minHeight: 200 }} />}>
          <LoadedComponent {...props} />
        </Suspense>
      ) : (
        placeholder ?? <div style={{ minHeight: 200 }} />
      )}
    </div>
  );
}
