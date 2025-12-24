import Footer from "@/components/ui/animated-footer";

export default function FooterSection() {
  return (
    <Footer
      leftLinks={[
        { href: "/menu", label: "Menu" },
        { href: "/reservations", label: "Reservations" },
        { href: "/privacy-policy", label: "Privacy Policy" },
      ]}
      rightLinks={[
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
        { href: "https://instagram.com", label: "Instagram" },
        { href: "https://facebook.com", label: "Facebook" },
      ]}
      copyrightText="© Resturang 2025. Crafted with flavor & passion."
      barCount={23}
    />
  );
}
