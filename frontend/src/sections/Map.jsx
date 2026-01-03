import React from "react";

export default function LocationSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#efe6d0] via-[#e6d9ba] to-[#d8c9a6]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_80%_20%,rgba(255,255,255,0.25),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10">
        {/* ✅ items-stretch so both columns take same height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* 🗺 MAP SIDE */}
          <div className="lg:col-span-7 relative h-full">
            {/* ✅ h-full so it matches the right card height */}
            <div className="relative h-full min-h-[520px] rounded-[2.5rem] overflow-hidden border border-white/30 shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
              {/* ✅ iframe fills the card height */}
              <iframe
                title="Restaurant Location"
                src="https://www.google.com/maps?q=Kolkata&output=embed"
                className="w-full h-full grayscale contrast-105"
                loading="lazy"
              />

              {/* Glass overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl px-5 py-4 shadow-xl">
                <p className="text-xs uppercase tracking-widest text-white/80">
                  You’re here
                </p>
                <p className="text-lg font-bold text-white">Restorang</p>
              </div>
            </div>
          </div>

          {/* 📍 DETAILS SIDE */}
          <div className="lg:col-span-5 relative h-full">
            {/* Decorative shape */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#5a4a2f]/10 blur-3xl" />

            {/* ✅ h-full so it matches the map card height */}
            <div className="relative h-full rounded-[2.5rem] backdrop-blur-xl bg-white/15 border border-white/25 p-8 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.2)] flex flex-col">
              <h2
                className="font-black tracking-tight"
                style={{
                  fontFamily: "surg",
                  fontSize: "clamp(2.6rem, 4vw, 4.2rem)",
                  color: "#5a4a2f",
                }}
              >
                Visit Us
              </h2>

              <p
                className="mt-4 text-lg leading-relaxed"
                style={{ fontFamily: "surg", color: "#6b5940" }}
              >
                Experience authentic flavors in an ambience crafted for comfort,
                conversations, and unforgettable meals.
              </p>

              {/* Address */}
              <div className="mt-8 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#6b5940]/80">
                    Address
                  </p>
                  <p
                    className="mt-1 text-lg"
                    style={{ fontFamily: "surg", color: "#5a4a2f" }}
                  >
                    12 Park Street, Near City Center
                    <br />
                    Kolkata, West Bengal 700016
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6b5940]/80">
                      Call
                    </p>
                    <p
                      className="mt-1 text-lg"
                      style={{ fontFamily: "surg", color: "#5a4a2f" }}
                    >
                      +91 98765 43210
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6b5940]/80">
                      Email
                    </p>
                    <p
                      className="mt-1 text-lg"
                      style={{ fontFamily: "surg", color: "#5a4a2f" }}
                    >
                      hello@restorang.in
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="mt-6 rounded-2xl border border-white/25 bg-white/10 px-5 py-4">
                  <p className="text-xs uppercase tracking-widest text-[#6b5940]/80">
                    Opening Hours
                  </p>
                  <p
                    className="mt-2 text-base"
                    style={{ fontFamily: "surg", color: "#5a4a2f" }}
                  >
                    Mon – Fri: 11:00 AM – 11:00 PM
                    <br />
                    Sat – Sun: 10:00 AM – 12:00 AM
                  </p>
                </div>
              </div>

              {/* ✅ push CTA to bottom so card always feels balanced */}
              <div className="mt-auto pt-8 flex flex-wrap gap-4">
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/30 bg-[#5a4a2f]/20 px-6 py-3 text-[#5a4a2f] hover:bg-[#5a4a2f]/30 transition"
                >
                  Get Directions →
                </a>

                <button className="rounded-full border border-white/30 bg-white/15 px-6 py-3 text-[#5a4a2f] hover:bg-white/25 transition">
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
