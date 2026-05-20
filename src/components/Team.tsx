"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Check, X, Coffee } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { translations } from "@/translations";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

type Member = {
  name: string;
  role: string;
  quote: string;
  quoteAuthor: string | null;
  photo: string;
  linkedin: string;
};

const initialMembers: Member[] = [
  {
    name: "Benoit Kulesza",
    role: "Founder & CEO",
    quote: "The best way to predict the future is to create it.",
    quoteAuthor: "Abraham Lincoln",
    photo: "/images/Member.png",
    linkedin: "https://www.linkedin.com/company/it-unchained",
  },
  {
    name: "Samir Ibbou",
    role: "Part-Time CTO",
    quote: "There are no problems, only solutions!",
    quoteAuthor: null,
    photo: "/images/Member_1.png",
    linkedin: "https://www.linkedin.com/company/it-unchained",
  },
];

export default function Team() {
  const { lang } = useLang();
  const t = translations[lang].team;

  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editData, setEditData] = useState<Member | null>(null);

  function startEdit(i: number) {
    setEditingIdx(i);
    setEditData({ ...members[i] });
  }

  function cancelEdit() {
    setEditingIdx(null);
    setEditData(null);
  }

  function saveEdit(i: number) {
    if (!editData) return;
    setMembers((prev) => prev.map((m, idx) => (idx === i ? editData : m)));
    setEditingIdx(null);
    setEditData(null);
  }

  return (
    <section id="OurTeam" className="py-24" style={{ background: "linear-gradient(180deg, #f8f9ff 0%, #eef0ff 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-eyebrow">{t.eyebrow}</span>
          <h2 className="font-brand text-4xl md:text-5xl text-[#0f0f1a] mt-2">
            {t.headingStart}<span className="gradient-text-brand">{t.headingHighlight}</span>
          </h2>
        </div>

        {/* Member cards */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {members.map((m, i) => {
            const isEditing = editingIdx === i;

            return (
              <div
                key={i}
                className="glass-card flex flex-col items-center text-center w-80 relative overflow-hidden"
                style={{ minHeight: "420px" }}
              >
                {/* Top gradient band behind photo */}
                <div
                  className="w-full flex justify-center pt-8 pb-4 relative"
                  style={{ background: "linear-gradient(160deg, rgba(54,82,202,0.08) 0%, rgba(99,102,241,0.12) 100%)" }}
                >
                  {/* Edit / Save / Cancel buttons */}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEdit(i)}
                          className="p-1.5 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
                          aria-label="Save"
                        >
                          <Check size={15} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                          aria-label="Cancel"
                        >
                          <X size={15} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEdit(i)}
                        className="p-1.5 rounded-lg bg-[#3652ca]/10 text-[#3652ca] hover:bg-[#3652ca]/20 transition-colors"
                        aria-label="Edit member"
                      >
                        <Pencil size={15} />
                      </button>
                    )}
                  </div>

                  {/* Photo */}
                  <div
                    className="relative flex-shrink-0"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #3652ca, #6366f1)",
                      padding: "3px",
                    }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        className="object-cover object-top"
                        sizes="120px"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center px-7 pb-7 pt-4 flex-1">
                  {/* Name */}
                  {isEditing ? (
                    <input
                      value={editData?.name ?? ""}
                      onChange={(e) => setEditData((d) => d ? { ...d, name: e.target.value } : d)}
                      className="text-base font-bold text-[#0f0f1a] text-center w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 mb-1 focus:outline-none focus:border-[#3652ca] transition-colors"
                      placeholder="Full name"
                    />
                  ) : (
                    <h6 className="font-bold text-[#0f0f1a] text-lg leading-tight">{m.name}</h6>
                  )}

                  {/* Role */}
                  {isEditing ? (
                    <input
                      value={editData?.role ?? ""}
                      onChange={(e) => setEditData((d) => d ? { ...d, role: e.target.value } : d)}
                      className="text-sm text-gray-500 text-center w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 mb-3 focus:outline-none focus:border-[#3652ca] transition-colors"
                      placeholder="Role / title"
                    />
                  ) : (
                    <span
                      className="text-xs font-semibold uppercase tracking-widest mt-1 mb-4 px-3 py-1 rounded-full"
                      style={{ background: "rgba(54,82,202,0.08)", color: "#3652ca" }}
                    >
                      {m.role}
                    </span>
                  )}

                  {/* Divider */}
                  <div className="w-10 h-px mb-4" style={{ background: "linear-gradient(90deg, #3652ca, #6366f1)" }} />

                  {/* Quote */}
                  <div className="flex-1 w-full">
                    {isEditing ? (
                      <textarea
                        value={editData?.quote ?? ""}
                        onChange={(e) => setEditData((d) => d ? { ...d, quote: e.target.value } : d)}
                        className="w-full text-sm text-gray-500 italic bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-[#3652ca] transition-colors"
                        rows={3}
                        placeholder="Quote…"
                      />
                    ) : (
                      <p className="text-gray-400 italic text-sm leading-relaxed">
                        &ldquo;{m.quote}&rdquo;
                        {m.quoteAuthor && (
                          <span className="block not-italic font-semibold text-xs mt-1.5 text-gray-300">
                            — {m.quoteAuthor}
                          </span>
                        )}
                      </p>
                    )}
                    {isEditing && (
                      <input
                        value={editData?.quoteAuthor ?? ""}
                        onChange={(e) => setEditData((d) => d ? { ...d, quoteAuthor: e.target.value || null } : d)}
                        className="w-full mt-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#3652ca] transition-colors"
                        placeholder="Quote author (optional)"
                      />
                    )}
                  </div>

                  {/* LinkedIn */}
                  {isEditing ? (
                    <input
                      value={editData?.linkedin ?? ""}
                      onChange={(e) => setEditData((d) => d ? { ...d, linkedin: e.target.value } : d)}
                      className="text-xs text-gray-500 text-center w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 mt-4 focus:outline-none focus:border-[#3652ca] transition-colors"
                      placeholder="LinkedIn URL"
                    />
                  ) : (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#0a66c2] hover:bg-[#004182] px-4 py-2 rounded-full transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon size={13} />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Virtual Coffee CTA — wide horizontal card */}
        <div
          className="rounded-[1.5rem] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(54,82,202,0.06) 0%, rgba(99,102,241,0.1) 50%, rgba(54,82,202,0.06) 100%)",
            border: "1.5px solid rgba(54,82,202,0.2)",
            boxShadow: "0 4px 32px rgba(54,82,202,0.08)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 px-10 py-10">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: "linear-gradient(135deg, #3652ca, #6366f1)" }}
              >
                <Coffee size={36} className="text-white" />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full"
                style={{ background: "rgba(54,82,202,0.1)", color: "#3652ca" }}
              >
                {t.joinEyebrow}
              </span>
              <h3 className="font-brand text-2xl md:text-3xl text-[#0f0f1a] mb-2">{t.joinTitle}</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">{t.joinSub}</p>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <a
                href="#Contact"
                className="btn-primary whitespace-nowrap text-sm px-7 py-3"
              >
                {t.joinCta}
              </a>
              <span className="text-xs text-gray-400">{t.joinNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
