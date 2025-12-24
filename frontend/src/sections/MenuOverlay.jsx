// import StaggeredMenu from "../components/ui/staggerMenu";

// const menuItems = [
//   { label: "Home", ariaLabel: "Go to home page", link: "/" },
//   { label: "About", ariaLabel: "Learn about us", link: "/about" },
//   { label: "Menu", ariaLabel: "View menu", link: "/menu" },
//   { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
// ];

// const socialItems = [
//   { label: "Instagram", link: "https://instagram.com" },
//   { label: "Facebook", link: "https://facebook.com" },
//   { label: "Google Maps", link: "https://maps.google.com" },
// ];

// export default function MenuOverlay() {
//   return (
//     <StaggeredMenu
//       position="right"
//       items={menuItems}
//       socialItems={socialItems}
//       displaySocials={true}
//       displayItemNumbering={true}
//       menuButtonColor="#000000ff"
//       openMenuButtonColor="#000000ff"
//       changeMenuColorOnOpen={true}
//       colors={["#b8a882", "#3a2f1d"]}
//       logoUrl="/src/assets/logo/logo.png"
//       accentColor="#b8895b"
//       isFixed={true}
//       onMenuOpen={() => console.log("Menu opened")}
//       onMenuClose={() => console.log("Menu closed")}
//     />
//   );
// }



// __________________________________________________________________________________________________________





// the 3rd update for navigation with IDs 
// MenuOverlay.jsx
import StaggeredMenu from "../components/ui/staggerMenu";

// const menuItems = [
//   { label: "Home", ariaLabel: "Go to home section", link: "#home" },
//   { label: "Menu", ariaLabel: "Go to menu section", link: "#menu" },
//   { label: "Gallery", ariaLabel: "Go to gallery section", link: "#gallery" },
//   { label: "Reservation", ariaLabel: "Go to reservation section", link: "#reservation" },
//   { label: "About", ariaLabel: "Go to about section", link: "#about" },
//   { label: "Contact", ariaLabel: "Go to footer section", link: "#footer" },
// ];


const menuItems = [
  { label: "Home", link: "#home" },
  { label: "Menu", link: "#menu" },
  { label: "Gallery", link: "#gallery" },
  { label: "Reserve", link: "#reservation" },
  { label: "About", link: "#about" },
  { label: "Menus", link: "/menus" }, // 👈 routed page
];

const socialItems = [
  { label: "Instagram", link: "https://instagram.com" },
  { label: "Facebook", link: "https://facebook.com" },
  { label: "Google Maps", link: "https://maps.google.com" },
];

export default function MenuOverlay() {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#000000ff"
      openMenuButtonColor="#000000ff"
      changeMenuColorOnOpen={true}
      colors={["#b8a882", "#3a2f1d"]}
      logoUrl="/src/assets/logo/logo.png"
      accentColor="#b8895b"
      isFixed={true}
      onMenuOpen={() => console.log("Menu opened")}
      onMenuClose={() => console.log("Menu closed")}
    />
  );
}
