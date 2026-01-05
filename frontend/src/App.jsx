




// import React, { useEffect } from "react";
// import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
// import Lenis from "lenis";

// import Home from "./pages/Home";
// import MenuCategories from "./pages/MenuCategories";

// export default function App() {
//   useEffect(() => {
//     const lenis = new Lenis({
//       smoothWheel: true,
//       lerp: 0.08,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     // 🌍 expose globally for MenuOverlay
//     window.lenis = lenis;

//     return () => {
//       window.lenis = undefined;
//       lenis.destroy();
//     };
//   }, []);

//   return (
//     <HashRouter>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/menus" element={<MenuCategories />} />
//       </Routes>
//     </BrowserRouter>
//     </HashRouter>
//   );
// }



























import React, { useEffect } from "react";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";

import Home from "./pages/Home";
import MenuCategories from "./pages/MenuCategories";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 🌍 expose globally for MenuOverlay
    window.lenis = lenis;

    return () => {
      window.lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menus" element={<MenuCategories />} />
      </Routes>
    </HashRouter>
  );
}
