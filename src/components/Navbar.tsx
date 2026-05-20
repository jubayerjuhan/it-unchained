"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { translations } from "@/translations";

export default function Navbar() {
  const { lang, setLang } = useLang();
  const t = translations[lang].navbar;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLang = lang === "fr" ? "en" : "fr";
  const otherLangLabel = lang === "fr" ? "EN" : "FR";

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f0f1a]/90 backdrop-blur-lg shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
          : "bg-[#0f0f1a]/80 backdrop-blur-md"
      } border-b border-white/5`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link
          href="#"
          className="font-brand text-white text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          IT{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6b83e0 0%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Unchained
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {t.links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="relative text-gray-400 hover:text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/5 group"
              >
                {l.label}
                <span className="absolute bottom-1 left-3 right-3 h-px bg-gradient-to-r from-[#3652ca] to-[#6366f1] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </a>
            </li>
          ))}
          <li className="ml-2">
            <button
              onClick={() => setLang(otherLang)}
              className="text-xs font-semibold px-4 py-1.5 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all"
              aria-label={`Switch to ${otherLangLabel}`}
            >
              {otherLangLabel}
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0f0f1a]/95 backdrop-blur-lg px-6 pb-5 pt-3">
          <ul className="flex flex-col gap-1">
            {t.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="block text-gray-400 hover:text-white text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <button
                onClick={() => { setLang(otherLang); setOpen(false); }}
                className="text-xs font-semibold px-4 py-1.5 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all"
                aria-label={`Switch to ${otherLangLabel}`}
              >
                {otherLangLabel}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
