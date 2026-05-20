"use client";

import { useState } from "react";
import { TrendingDown, Target, GraduationCap, Award, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { translations } from "@/translations";

const icons = [TrendingDown, Target, GraduationCap, Award];
const gradients = [
  { card: "from-[#3652ca] to-[#6366f1]", accent: "#3652ca" },
  { card: "from-[#6366f1] to-[#8b5cf6]", accent: "#6366f1" },
  { card: "from-[#8b5cf6] to-[#a855f7]", accent: "#8b5cf6" },
  { card: "from-[#a855f7] to-[#ec4899]", accent: "#a855f7" },
];

export default function Services() {
  const { lang } = useLang();
  const t = translations[lang].services;

  const [modal, setModal] = useState<number | null>(null);

  return (
    <section id="Services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-eyebrow">{t.eyebrow}</span>
          <h2 className="font-brand text-4xl md:text-5xl text-[#0f0f1a] mt-2 max-w-2xl mx-auto leading-tight">
            {t.headingStart}<span className="gradient-text-brand">{t.headingHighlight}</span>{t.headingEnd}
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
            {t.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((s, i) => {
            const Icon = icons[i];
            const g = gradients[i];
            return (
              <div
                key={i}
                className="glass-card flex flex-col overflow-hidden group cursor-pointer"
                onClick={() => setModal(i)}
              >
                {/* Icon area */}
                <div className={`bg-gradient-to-br ${g.card} p-7 flex items-center justify-center`}>
                  <div className="bg-white/15 rounded-2xl p-3.5 group-hover:bg-white/25 transition-colors">
                    <Icon size={28} className="text-white" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-[#0f0f1a] mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.summary}</p>
                  <button
                    className="mt-4 text-sm font-semibold flex items-center gap-1.5 group/btn"
                    style={{ color: g.accent }}
                    onClick={(e) => { e.stopPropagation(); setModal(i); }}
                  >
                    {t.learnMore}
                    <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modal !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f1a]/60 backdrop-blur-sm px-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className={`bg-gradient-to-r ${gradients[modal].card} p-6 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-xl p-2.5">
                  {(() => { const Icon = icons[modal]; return <Icon size={20} className="text-white" />; })()}
                </div>
                <h3 className="text-white font-semibold text-xl">{t.items[modal].title}</h3>
              </div>
              <button
                onClick={() => setModal(null)}
                className="text-white/70 hover:text-white transition-colors rounded-lg p-1 hover:bg-white/10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-8">
              <p className="text-gray-600 leading-relaxed">{t.items[modal].detail}</p>
              <button
                onClick={() => setModal(null)}
                className="mt-6 btn-primary text-sm"
              >
                {t.gotIt}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
