import React, { useMemo, useState } from "react";
import InteractiveDotsBg from "../components/ui/interactive-dots";
import { CalendarDays, Clock, Users, Phone, User, MapPin, UtensilsCrossed } from "lucide-react";

const cn = (...a) => a.filter(Boolean).join(" ");

const timeSlots = [
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
];

export default function BookTable() {
  const [mode, setMode] = useState("table"); // "table" | "order"
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState("");

  const today = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: today,
    time: timeSlots[0],
    address: "",
    instructions: "",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^\d{10}$/.test(form.phone.trim())) return "Enter a valid 10-digit phone number.";
    if (mode === "table") {
      if (!form.date) return "Please select a date.";
      if (!form.time) return "Please select a time.";
    } else {
      if (!form.address.trim()) return "Please enter delivery address.";
    }
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setDone("");
    const err = validate();
    if (err) {
      setDone(err);
      return;
    }

    setLoading(true);

    // ✅ Replace this with your API call later
    await new Promise((r) => setTimeout(r, 900));

    setLoading(false);
    setDone(
      mode === "table"
        ? "✅ Table request submitted! We’ll confirm shortly."
        : "✅ Order request submitted! We’ll call you to confirm."
    );

    // optional reset (keep phone/name for convenience)
    setForm((p) => ({
      ...p,
      guests: "2",
      date: today,
      time: timeSlots[0],
      address: "",
      instructions: "",
    }));
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Beige + yellow dots */}
      <InteractiveDotsBg
        baseBg="#b8a882"
        dotColor="rgba(245,198,51,0.75)"
        count={120}
        radius={150}
      />

      {/* soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 700px at 50% 35%, rgba(255,255,255,0.28) 0%, rgba(0,0,0,0.0) 60%), radial-gradient(1000px 650px at 50% 90%, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 60%)",
        }}
      />

      <div className="relative z-[2] px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2
              className="text-5xl md:text-7xl font-black tracking-tight text-[#3b2f1c]"
               style={{ fontFamily: "surg" }}
            >
              BOOK A TABLE / ORDER NOW
            </h2>
            <p
              className="mt-3 text-[#4a3b22]/80 text-base md:text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              Reserve your seat for a perfect dine-in experience, or place an order for quick delivery.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch"
             style={{ fontFamily: "surg" }}
          >
            {/* Left: Feature card */}
            <div className="rounded-2xl border border-white/20 bg-[#1c170f]/70 text-white backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden"
             style={{ fontFamily: "surg" }}>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#f5c633]/15 border border-[#f5c633]/25 grid place-items-center">
                    <UtensilsCrossed className="h-5 w-5 text-[#f5c633]" />
                  </div>
                  <h3
                    className="text-3xl md:text-4xl font-bold"
                     style={{ fontFamily: "surg" }}
                  >
                    Why Resturang?
                  </h3>
                </div>

                <ul className="mt-6 space-y-4 text-white/80">
                  {[
                    { t: "Fast confirmation", d: "We call you back quickly to confirm your slot." },
                    { t: "Premium ambience", d: "Perfect for family dinner and celebrations." },
                    { t: "Fresh ingredients", d: "Authentic taste, consistent quality." },
                    { t: "Custom requests", d: "Tell us spice level, allergies, and preferences." },
                  ].map((x, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#f5c633]" />
                      <div>
                        <p className="font-semibold text-white">{x.t}</p>
                        <p className="text-sm text-white/70">{x.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-widest text-white/60">Call Us</p>
                    <p className="mt-1 text-lg font-semibold">+91 98765 43210</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-widest text-white/60">Location</p>
                    <p className="mt-1 text-lg font-semibold">Kolkata</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.18)] overflow-hidden">
              {/* Toggle */}
              <div className="p-4 md:p-5 border-b border-black/10 bg-white/40">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-[#3b2f1c]/70">Choose</p>
                    <p className="text-xl font-bold text-[#2b2417]">Booking Type</p>
                  </div>

                  <div className="flex bg-black/5 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setMode("table")}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-semibold transition",
                        mode === "table"
                          ? "bg-[#2b2417] text-white shadow"
                          : "text-[#2b2417]/80 hover:bg-black/5"
                      )}
                    >
                      Book Table
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("order")}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-semibold transition",
                        mode === "order"
                          ? "bg-[#2b2417] text-white shadow"
                          : "text-[#2b2417]/80 hover:bg-black/5"
                      )}
                    >
                      Order Food
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={onSubmit} className="p-6 md:p-8">
                {/* name + phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Name" icon={<User className="h-4 w-4" />}>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className="w-full bg-white/80 border border-black/10 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#f5c633]/40"
                      placeholder="Your name"
                    />
                  </Field>

                  <Field label="Phone" icon={<Phone className="h-4 w-4" />}>
                    <input
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="w-full bg-white/80 border border-black/10 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#f5c633]/40"
                      placeholder="10-digit number"
                      inputMode="numeric"
                    />
                  </Field>
                </div>

                {/* table fields */}
                {mode === "table" && (
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <Field label="Guests" icon={<Users className="h-4 w-4" />}>
                      <select
                        value={form.guests}
                        onChange={(e) => set("guests", e.target.value)}
                        className="w-full bg-white/80 border border-black/10 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#f5c633]/40"
                      >
                        {Array.from({ length: 10 }).map((_, i) => (
                          <option key={i + 1} value={String(i + 1)}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Date" icon={<CalendarDays className="h-4 w-4" />}>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        className="w-full bg-white/80 border border-black/10 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#f5c633]/40"
                        min={today}
                      />
                    </Field>

                    <Field label="Time" icon={<Clock className="h-4 w-4" />}>
                      <select
                        value={form.time}
                        onChange={(e) => set("time", e.target.value)}
                        className="w-full bg-white/80 border border-black/10 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#f5c633]/40"
                      >
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                )}

                {/* order fields */}
                {mode === "order" && (
                  <div className="mt-4">
                    <Field label="Delivery Address" icon={<MapPin className="h-4 w-4" />}>
                      <textarea
                        rows={3}
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                        className="w-full bg-white/80 border border-black/10 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#f5c633]/40 resize-none"
                        placeholder="House no, street, area, landmark..."
                      />
                    </Field>
                  </div>
                )}

                {/* instructions */}
                <div className="mt-4">
                  <Field label="Special Instructions (optional)" icon={<UtensilsCrossed className="h-4 w-4" />}>
                    <textarea
                      rows={3}
                      value={form.instructions}
                      onChange={(e) => set("instructions", e.target.value)}
                      className="w-full bg-white/80 border border-black/10 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#f5c633]/40 resize-none"
                      placeholder="Less spicy, no onion/garlic, allergy notes, etc."
                    />
                  </Field>
                </div>

                {/* status */}
                {done && (
                  <div
                    className={cn(
                      "mt-5 rounded-xl px-4 py-3 text-sm font-semibold",
                      done.startsWith("✅")
                        ? "bg-emerald-500/10 text-emerald-900 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-900 border border-red-500/20"
                    )}
                  >
                    {done}
                  </div>
                )}

                {/* submit */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
                  <button
                    disabled={loading}
                    type="submit"
                    className={cn(
                      "w-full sm:w-auto px-6 py-3 rounded-xl font-bold tracking-wide transition",
                      "bg-[#2b2417] text-white hover:brightness-110",
                      "disabled:opacity-60 disabled:cursor-not-allowed"
                    )}
                  >
                    {loading ? "Submitting..." : mode === "table" ? "Request Booking" : "Place Order"}
                  </button>

                  <p className="text-xs text-[#2b2417]/70">
                    By submitting, you agree to receive a confirmation call from Resturang.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-10" />
        </div>
      </div>

      {/* Fonts (match your previous sections) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Text:wght@400;600;700&display=swap');
      `}</style>
    </section>
  );
}

function Field({ label, icon, children }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-[#2b2417]">
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-black/5 border border-black/10 text-[#2b2417]">
          {icon}
        </span>
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
