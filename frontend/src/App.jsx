// // App.jsx
// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";

// // ✅ Minimal placeholder pages (you can move to ./pages/* later)
// function NotFound() {
//   return (
//     <main className="min-h-screen bg-white text-black flex items-center justify-center p-6">
//       <div className="max-w-lg text-center">
//         <h1 className="text-3xl font-semibold">404</h1>
//         <p className="mt-2 text-gray-600">Page not found.</p>
//       </div>
//     </main>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Default */}
//         <Route path="/" element={<Home />} />

//         {/* Example alias */}
//         <Route path="/home" element={<Navigate to="/" replace />} />

//         {/* 404 */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }







// ------------------------------------------------------------------------------------

// 2nd update flexible 
// import React from "react";
// import Lenis from "lenis";
// import { useEffect } from "react";
// import Hero from "./sections/Hero2";
// import Menu from "./sections/Menu";
// import Gallery from "./sections/Gallery";
// import Reservation from "./sections/Reservation";
// import About from "./sections/about";
// import Footer from "./sections/footer";
// import MenuOverlay from "./sections/MenuOverlay";



// export default function App() {
  
//    useEffect(() => {
//     const lenis = new Lenis({
//       smoothWheel: true,
//       lerp: 0.08,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     return () => lenis.destroy();
//   }, []);
//   return (
//     <div className="min-h-screen">
//       <MenuOverlay />

//       <Hero />
//       <Menu />
//       <Gallery />
//       <Reservation />
//       <About />
//       <Footer />
//     </div>
//   );
// }




// -------------________________________________________________________________________________________________




// 3rd update for navigation 
// App.jsx
// import React, { useEffect } from "react";
// import Lenis from "lenis";
// import Hero from "./sections/Hero2";
// import Menu from "./sections/Menu";
// import Gallery from "./sections/Gallery";
// import Reservation from "./sections/Reservation";
// import About from "./sections/about";
// import Footer from "./sections/footer";
// import MenuOverlay from "./sections/MenuOverlay";

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

//     // ✅ make lenis globally accessible for menu scrolling
//     window.lenis = lenis;

//     return () => {
//       window.lenis = undefined;
//       lenis.destroy();
//     };
//   }, []);

//   return (
//     <div className="min-h-screen">
//       <MenuOverlay />

//       <div id="home"><Hero /></div>
//       <div id="menu"><Menu /></div>
//       <div id="gallery"><Gallery /></div>
//       <div id="reservation"><Reservation /></div>
//       <div id="about"><About /></div>
//       <div id="footer"><Footer /></div>
//     </div>
//   );
// }














import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menus" element={<MenuCategories />} />
      </Routes>
    </BrowserRouter>
  );
}

