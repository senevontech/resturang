// import React from "react";
// import { CircularTestimonials } from "../components/ui/testimonial";

// const testimonials = [
//     {
//         quote:
//             "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
//         name: "Tamar Mendelson",
//         designation: "Restaurant Critic",
//         src:
//             "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop",
//     },
//     {
//         quote:
//             "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
//         name: "Joe Charlescraft",
//         designation: "Frequent Visitor",
//         src:
//             "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop",
//     },
//     {
//         quote:
//             "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
//         name: "Martina Edelweist",
//         designation: "Satisfied Customer",
//         src:
//             "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop",
//     },
// ];

// export function CircularTestimonialsDemo() {
//     return (
//         <section className="space-y-8">
//             {/* Light */}
//             {/* <div className="rounded-2xl bg-[#f7f7fa] p-5 sm:p-8 md:p-12">
//         <div className="mx-auto flex max-w-[1456px] justify-center">
//           <CircularTestimonials
//             testimonials={testimonials}
//             autoplay
//             colors={{
//               name: "#0a0a0a",
//               designation: "#454545",
//               testimony: "#171717",
//               arrowBackground: "#141414",
//               arrowForeground: "#f1f1f7",
//               arrowHoverBackground: "#00A6FB",
//             }}
//             fontSizes={{
//               name: "28px",
//               designation: "18px",
//               quote: "18px",
//             }}
//           />
//         </div>
//       </div> */}

//             {/* Dark */}
//             <div className="rounded-2xl bg-[#060507] p-5 sm:p-8 md:p-12">
//                 <div className="mx-auto flex max-w-[1024px] justify-center">
//                     <CircularTestimonials
//                         testimonials={testimonials}
//                         autoplay
//                         colors={{
//                             name: "#f7f7ff",
//                             designation: "#e1e1e1",
//                             testimony: "#f1f1f7",
//                             arrowBackground: "#0582CA",
//                             arrowForeground: "#141414",
//                             arrowHoverBackground: "#f7f7ff",
//                         }}
//                         // fontSizes={{
//                         //   name: "28px",
//                         //   designation: "18px",
//                         //   quote: "18px",
//                         // }}
//                         fontSizes={{
//                             name: "clamp(18px, 4.5vw, 28px)",
//                             designation: "clamp(13px, 3.6vw, 18px)",
//                             quote: "clamp(13px, 3.8vw, 18px)",
//                         }}

//                     />
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default CircularTestimonialsDemo;




































import React from "react";
import { CircularTestimonials } from "../components/ui/testimonial";

const testimonials = [
  {
    quote:
      "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
    name: "Tamar Mendelson",
    designation: "Restaurant Critic",
    src:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop",
  },
  {
    quote:
      "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
    name: "Joe Charlescraft",
    designation: "Frequent Visitor",
    src:
      "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop",
  },
  {
    quote:
      "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    src:
      "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop",
  },
];

export function CircularTestimonialsDemo() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-[#060507] p-4 sm:p-8 md:p-12">
        <div className="mx-auto flex max-w-[1024px] justify-center">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay
            colors={{
              name: "#f7f7ff",
              designation: "#e1e1e1",
              testimony: "#f1f1f7",
              arrowBackground: "#0582CA",
              arrowForeground: "#141414",
              arrowHoverBackground: "#f7f7ff",
            }}
            fontSizes={{
              name: "clamp(18px, 4.5vw, 28px)",
              designation: "clamp(13px, 3.6vw, 18px)",
              quote: "clamp(13px, 3.8vw, 18px)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default CircularTestimonialsDemo;
