"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Check, X, Coffee } from "lucide-react";

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
          <span className="section-eyebrow">The people</span>
          <h2 className="font-brand text-4xl md:text-5xl text-[#0f0f1a] mt-2">
            Who are <span className="gradient-text-brand">we?</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {members.map((m, i) => {
            const isEditing = editingIdx === i;

            return (
              <div
                key={i}
                className="glass-card flex flex-col items-center text-center w-72 p-7 relative"
                style={{ minHeight: "380px" }}
              >
                {/* Edit / Save / Cancel buttons */}
                <div className="absolute top-4 right-4 flex gap-1.5">
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

                {/* Quote */}
                <div className="mb-5 w-full">
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
                        <span className="block not-italic font-semibold text-xs mt-1 text-gray-300">
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

                {/* Photo */}
                <div
                  className="relative w-28 h-28 rounded-full overflow-hidden mb-4 flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #3652ca, #6366f1)",
                    padding: "3px",
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                </div>

                {/* Name */}
                {isEditing ? (
                  <input
                    value={editData?.name ?? ""}
                    onChange={(e) => setEditData((d) => d ? { ...d, name: e.target.value } : d)}
                    className="text-base font-bold text-[#0f0f1a] text-center w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 mb-1.5 focus:outline-none focus:border-[#3652ca] transition-colors"
                    placeholder="Full name"
                  />
                ) : (
                  <h6 className="font-bold text-[#0f0f1a] text-base">{m.name}</h6>
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
                  <span className="text-gray-400 text-sm mt-0.5">{m.role}</span>
                )}

                {/* LinkedIn */}
                {isEditing ? (
                  <input
                    value={editData?.linkedin ?? ""}
                    onChange={(e) => setEditData((d) => d ? { ...d, linkedin: e.target.value } : d)}
                    className="text-xs text-gray-500 text-center w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 mt-2 focus:outline-none focus:border-[#3652ca] transition-colors"
                    placeholder="LinkedIn URL"
                  />
                ) : (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#0a66c2] hover:bg-[#004182] px-3 py-1.5 rounded-full transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon size={13} />
                    LinkedIn
                  </a>
                )}
              </div>
            );
          })}

          {/* Join the team CTA */}
          <div
            className="flex flex-col items-center justify-center text-center w-72 p-7 rounded-[1.25rem]"
            style={{
              border: "2px dashed rgba(54,82,202,0.35)",
              background: "linear-gradient(135deg, rgba(54,82,202,0.04) 0%, rgba(99,102,241,0.06) 100%)",
              minHeight: "380px",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, #3652ca, #6366f1)" }}
            >
              <Coffee size={24} className="text-white" />
            </div>
            <h6 className="font-bold text-[#0f0f1a] text-base mb-2">Want to join the team?</h6>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              We&apos;re always looking for passionate people.
            </p>
            <a href="#Contact" className="btn-primary text-sm">
              Have a coffee with us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
