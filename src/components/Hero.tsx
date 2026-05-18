"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const slides = [
  {
    eyebrow: "Innovation · Talent · Growth",
    heading: "Let's bring your\nideas to life!",
    sub: "We recruit the best IT talent — handpicked from open and hidden markets.",
  },
  {
    eyebrow: "French Innovation Accreditation",
    heading: "Save 20% with our\nInnovation Accreditation.",
    sub: "Government-backed tax credit on freelancer fees — keeping more capital in your project.",
  },
  {
    eyebrow: "Join the Elite Network",
    heading: "Unlock your full\npotential with us!",
    sub: "Top IT talent. Expert mentoring. Innovative incentives built for excellence.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  function goTo(i: number) {
    if (i === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(i);
      setAnimating(false);
    }, 300);
  }

  const slide = slides[current];

  return (
    <section
      className="relative flex flex-col items-center justify-center text-white min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/images/img_1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0f0f1a]/80" />

      {/* Animated gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(54,82,202,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "float 7s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "float 9s ease-in-out infinite reverse",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-400"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(12px)" : "translateY(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {/* Eyebrow */}
        <div className="section-eyebrow mb-5 text-[#a5b4fc]" style={{ background: "rgba(99,102,241,0.15)" }}>
          {slide.eyebrow}
        </div>

        {/* Heading — "IT Unchained" uses brand font everywhere it appears */}
        <h1
          className="font-brand text-5xl md:text-7xl leading-[1.05] mb-6 tracking-tight"
          style={{ whiteSpace: "pre-line" }}
        >
          {slide.heading.includes("IT Unchained") ? (
            <>
              {slide.heading.split("IT Unchained")[0]}
              <span className="gradient-text">IT Unchained</span>
              {slide.heading.split("IT Unchained")[1]}
            </>
          ) : (
            <span className="gradient-text">{slide.heading}</span>
          )}
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          {slide.sub}
        </p>

        {/* CTA */}
        <a href="#Contact" className="btn-primary text-base">
          Get in touch
          <ArrowRight size={18} />
        </a>
      </div>

      {/* Slide dots */}
      <div className="relative z-10 flex justify-center gap-3 mt-16">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === current ? "2rem" : "0.5rem",
              height: "0.5rem",
              borderRadius: "9999px",
              background:
                i === current
                  ? "linear-gradient(135deg, #3652ca, #6366f1)"
                  : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <a
        href="#AboutUs"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} style={{ animation: "float 2s ease-in-out infinite" }} />
      </a>
    </section>
  );
}
