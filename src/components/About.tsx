"use client";

import { useState } from "react";
import { Users, Zap, Heart, X } from "lucide-react";

const panels = [
  {
    icon: Users,
    title: "Who are we?",
    summary: "Let's cultivate collective intelligence!",
    detail:
      "IT Unchained is a French IT staffing and innovation company. We connect businesses with top-tier IT freelancers and help them leverage the French government's innovation accreditation (CIR/CII) to reduce costs by up to 20%.",
    gradient: "from-[#3652ca] to-[#6366f1]",
  },
  {
    icon: Zap,
    title: "Our Expertise",
    summary: "Unleash IT expertise, reduce costs, innovate!",
    detail:
      "From blockchain and Web3 to traditional software engineering, our experts cover the full spectrum of IT. We maintain a curated network of elite freelancers sourced from both public and hidden talent markets.",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
  },
  {
    icon: Heart,
    title: "Our Values",
    summary: "Our name reflects our DNA: unleash your ideas!",
    detail:
      "We believe talent should be free — free to innovate, collaborate, and grow. IT Unchained was built on the principle that removing constraints unlocks extraordinary results for both clients and talent.",
    gradient: "from-[#8b5cf6] to-[#ec4899]",
  },
];

export default function About() {
  const [modal, setModal] = useState<number | null>(null);

  return (
    <section id="AboutUs" className="py-24" style={{ background: "linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-eyebrow">About us</span>
          <h2 className="font-brand text-4xl md:text-5xl text-[#0f0f1a] mt-2">
            Built for <span className="gradient-text-brand">excellence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {panels.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="glass-card flex flex-col overflow-hidden">
                {/* Gradient icon bar */}
                <div className={`bg-gradient-to-r ${p.gradient} p-6 flex items-center gap-3`}>
                  <div className="bg-white/20 rounded-xl p-2.5">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">{p.title}</h3>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-gray-500 mb-6 flex-1 leading-relaxed">{p.summary}</p>
                  <button
                    onClick={() => setModal(i)}
                    className="self-start text-sm font-semibold text-[#3652ca] hover:text-[#6366f1] transition-colors flex items-center gap-1.5 group"
                  >
                    Learn more
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
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
            <div className={`bg-gradient-to-r ${panels[modal].gradient} p-6 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-xl p-2.5">
                  {(() => { const Icon = panels[modal].icon; return <Icon size={20} className="text-white" />; })()}
                </div>
                <h3 className="text-white font-semibold text-xl">{panels[modal].title}</h3>
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
              <p className="text-gray-600 leading-relaxed">{panels[modal].detail}</p>
              <button
                onClick={() => setModal(null)}
                className="mt-6 btn-primary text-sm"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
