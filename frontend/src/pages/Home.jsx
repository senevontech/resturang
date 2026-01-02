

import Hero from "../sections/Hero2";
import Menu from "../sections/Menu";
import Gallery from "../sections/Gallery";
import Reservation from "../sections/Reservation";
import About from "../sections/about";
import Footer from "../sections/footer";
import MenuOverlay from "../sections/MenuOverlay";

import FloatingActions from "../components/floatingButton";
import LazySection from "../components/LazySection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MenuOverlay />

      <FloatingActions />

      <div id="home"><Hero /></div>
      <div id="menu"><Menu /></div>
      <div id="gallery"><Gallery /></div>
      <div id="reservation"><Reservation /></div>
      <div id="about"><About /></div>
      <div id="footer"><Footer /></div>
    </div>
  );
}


