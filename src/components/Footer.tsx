"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { translations } from "@/translations";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang].footer;

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer id="Contact" className="text-gray-300 pt-20 pb-8" style={{ background: "linear-gradient(180deg, #0f0f1a 0%, #0a0a14 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">

          {/* Contact form */}
          <div>
            <span className="section-eyebrow mb-3 block" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc" }}>
              {t.getInTouch}
            </span>
            <h3 className="font-brand text-2xl text-white mb-8">{t.leaveMessage}</h3>

            {status === "success" ? (
              <div className="rounded-2xl p-6 border border-green-500/30 bg-green-500/10 text-green-300">
                <p className="font-semibold mb-1">{t.successTitle}</p>
                <p className="text-sm text-green-400">{t.successSub}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.labels.name}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-modern"
                    placeholder={t.placeholders.name}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.labels.phone}</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input-modern"
                    placeholder={t.placeholders.phone}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.labels.email}</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-modern"
                    placeholder={t.placeholders.email}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.labels.message}</label>
                  <textarea
                    required
                    rows={4}
                    maxLength={999}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-modern resize-none"
                    placeholder={t.placeholders.message}
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-400 text-sm">{t.error}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? t.sending : t.send}
                  {status !== "sending" && <ArrowRight size={16} />}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div>
            <span className="section-eyebrow mb-3 block" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc" }}>
              {t.findUs}
            </span>
            <h3 className="font-brand text-2xl text-white mb-8">{t.contactUs}</h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={16} className="text-[#6b83e0]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-0.5">{t.address}</p>
                  <p className="text-gray-300 text-sm">39 rue de l&apos;Arrivée, 95880 Enghien-les-Bains</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#6b83e0]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-0.5">{t.telephone}</p>
                  <a href="tel:+33663115426" className="text-gray-300 text-sm hover:text-white transition-colors">
                    +33 (0)6 63 11 54 26
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-[#6b83e0]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-0.5">{t.labels.email}</p>
                  <a href="mailto:contact@it-unchained.com" className="text-gray-300 text-sm hover:text-white transition-colors">
                    contact@it-unchained.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Globe size={16} className="text-[#6b83e0]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-0.5">{t.website}</p>
                  <p className="text-gray-300 text-sm">www.it-unchained.com</p>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <a
                href="https://www.linkedin.com/company/it-unchained"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#0a66c2]/20 hover:bg-[#0a66c2]/35 border border-[#0a66c2]/40 text-[#7eb3f5] hover:text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
              >
                <LinkedInIcon size={16} />
                {t.linkedin}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>
            © 2019{" "}
            <span className="font-brand text-gray-500 text-sm">IT Unchained</span>{" "}
            SAS – {t.copyright}
          </p>
          <ul className="flex gap-6">
            <li><a href="#AboutUs" className="hover:text-gray-400 transition-colors">{t.links.about}</a></li>
            <li><a href="#" className="hover:text-gray-400 transition-colors">{t.links.privacy}</a></li>
            <li><a href="#" className="hover:text-gray-400 transition-colors">{t.links.cookies}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
