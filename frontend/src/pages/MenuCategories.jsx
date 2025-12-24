// import { PixelTrail } from "@/components/ui/pixel-trail";
// import { useScreenSize } from "@/components/hooks/use-screen-size";

// const MENUS = [
//   {
//     category: "Starters",
//     items: [
//       { name: "Crispy Veg Spring Rolls", desc: "Golden fried rolls with house dip", price: "₹220" },
//       { name: "Chicken Tikka", desc: "Char-grilled chicken with spices", price: "₹320" },
//     ],
//   },
//   {
//     category: "Main Course",
//     items: [
//       { name: "Butter Chicken", desc: "Creamy tomato gravy, classic style", price: "₹420" },
//       { name: "Paneer Lababdar", desc: "Rich onion-cashew gravy", price: "₹380" },
//     ],
//   },
//   {
//     category: "Chinese",
//     items: [
//       { name: "Hakka Noodles", desc: "Wok tossed veggies & sauces", price: "₹260" },
//       { name: "Chilli Chicken", desc: "Spicy Indo-Chinese favorite", price: "₹340" },
//     ],
//   },
//   {
//     category: "Desserts",
//     items: [
//       { name: "Gulab Jamun", desc: "Warm syrup soaked dumplings", price: "₹140" },
//       { name: "Chocolate Brownie", desc: "Served with vanilla ice cream", price: "₹220" },
//     ],
//   },
// ];

// export default function MenuCategories() {
//   const screenSize = useScreenSize();

//   return (
//     <section className="relative min-h-screen bg-[#dcddd7] overflow-hidden">
//       {/* 🔸 Background */}
//       <PixelTrail
//         pixelSize={screenSize.lessThan("md") ? 48 : 80}
//         fadeDuration={0}
//         delay={1200}
//         pixelClassName="rounded-full bg-[#ffa04f]"
//       />

//       {/* 🔸 Hero heading (non-interactive) */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-[40vh] text-center px-6 pointer-events-none">
//         <h1 className="text-4xl md:text-7xl font-serif tracking-tight"
//         style={{ fontFamily: "surg",
//                  color: "#7a6a4f",
//                  animation: "fadeIn 2s ease-out",}}
//         >
//           Our Menus
//         </h1>
//         <p className="mt-4 text-sm md:text-xl max-w-xl"
//         style={{ fontFamily: "surg",
//                  color: "#7a6a4f",
//                  animation: "fadeIn 2s ease-out",}}
//         >
//           Discover curated menus crafted for every taste — seasonal,
//           signature, and chef specials.
//         </p>
//       </div>

//       {/* 🔸 Menu list (interactive) */}
//       <div className="relative z-20 max-w-5xl mx-auto px-6 pb-24 pointer-events-auto">
//         <div className="grid md:grid-cols-2 gap-12">
//           {MENUS.map((section) => (
//             <div key={section.category}>
//               <h2 className="text-2xl md:text-3xl font-serif mb-6 border-b border-black/20 pb-2">
//                 {section.category}
//               </h2>

//               <ul className="space-y-5">
//                 {section.items.map((item) => (
//                   <li
//                     key={item.name}
//                     className="flex items-start justify-between gap-4"
//                   >
//                     <div>
//                       <p className="text-base md:text-lg font-medium">
//                         {item.name}
//                       </p>
//                       <p className="text-sm text-black/60">
//                         {item.desc}
//                       </p>
//                     </div>

//                     <div className="text-base md:text-lg font-semibold whitespace-nowrap">
//                       {item.price}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }








// ___________________________________________________________________________________________________________








import { PixelTrail } from "@/components/ui/pixel-trail";
import { useScreenSize } from "@/components/hooks/use-screen-size";

const MENUS = [
  {
    category: "Starters",
    items: [
      { name: "Crispy Veg Spring Rolls", desc: "Golden fried rolls with house dip", price: "₹220" },
      { name: "Chicken Tikka", desc: "Char-grilled chicken with spices", price: "₹320" },
    ],
  },
  {
    category: "Main Course",
    items: [
      { name: "Butter Chicken", desc: "Creamy tomato gravy, classic style", price: "₹420" },
      { name: "Paneer Lababdar", desc: "Rich onion-cashew gravy", price: "₹380" },
    ],
  },
  {
    category: "Chinese",
    items: [
      { name: "Hakka Noodles", desc: "Wok tossed veggies & sauces", price: "₹260" },
      { name: "Chilli Chicken", desc: "Spicy Indo-Chinese favorite", price: "₹340" },
    ],
  },
  {
    category: "Indian",
    items: [
      { name: "Butter naan", desc: "Warm syrup soaked dumplings", price: "₹140" },
      { name: "Butter Chicken", desc: "Served with vanilla ice cream", price: "₹220" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Gulab Jamun", desc: "Warm syrup soaked dumplings", price: "₹140" },
      { name: "Chocolate Brownie", desc: "Served with vanilla ice cream", price: "₹220" },
    ],
  },
  {
    category: "Continental",
    items: [
      { name: "Pasta", desc: "Warm syrup soaked dumplings", price: "₹140" },
      { name: "Garlic breads", desc: "Served with vanilla ice cream", price: "₹220" },
    ],
  },
];

export default function MenuCategories() {
  const screenSize = useScreenSize();

  return (
    <section className="relative h-100% bg-[#dcddd7] overflow-hidden">
      {/* Background */}
      <PixelTrail
        pixelSize={screenSize.lessThan("md") ? 48 : 80}
        fadeDuration={0}
        delay={1200}
        pixelClassName="rounded-full bg-[#ffa04f]"
      />

      {/* Heading */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[45vh] text-center px-6 pointer-events-none">
        <h1 className="text-5xl md:text-8xl font-serif tracking-tight text-black"
        style={{ fontFamily: "surg",
                  color: "#7a6a4f",
                  animation: "fadeIn 2s ease-out",}}>
          Our Menus
        </h1>
        <p className="mt-6 text-base md:text-2xl max-w-2xl text-black">
          Discover curated menus crafted for every taste — seasonal,
          signature, and chef specials.
        </p>
      </div>

      {/* Menu list */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 pb-32 pointer-events-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {MENUS.map((section) => (
            <div key={section.category}>
              <h2 className="text-3xl md:text-4xl font-serif mb-10 border-b border-black/20 pb-4"
              style={{ fontFamily: "surg",
                  color: "#7a6a4f",
                  animation: "fadeIn 2s ease-out",}}
              
              >
                {section.category}
              </h2>

              <ul className="space-y-8">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start justify-between gap-6 text-black"
                  >
                    <div>
                      <p className="text-xl md:text-2xl font-semibold leading-tight">
                        {item.name}
                      </p>
                      <p className="text-sm md:text-base text-black/60 mt-1">
                        {item.desc}
                      </p>
                    </div>

                    <div className="text-xl md:text-2xl font-bold whitespace-nowrap text-[#178a13]">
                      {item.price}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





