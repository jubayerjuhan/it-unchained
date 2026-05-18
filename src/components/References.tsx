import Image from "next/image";

const partners = [
  { name: "BPI France", logo: "/images/img_5.png", url: "https://www.bpifrance.fr/" },
  { name: "Innovation Finance", logo: "/images/img_6.svg", url: "https://finance-innovation.org/" },
  { name: "Consensys", logo: "/images/Consensys.png", url: "https://consensys.io/" },
  { name: "Gate.io", logo: "/images/Gate_io.avif", url: "https://www.gate.io/fr/" },
  { name: "iExec", logo: "/images/iExec.png", url: "https://iex.ec/fr/" },
  { name: "Darewise", logo: "/images/img_10.png", url: "http://darewise.com/" },
  { name: "GoodHive", logo: "/images/GoodHive.png", url: "https://goodhive.io/" },
  { name: "Starton", logo: "/images/Starton.jpg", url: "https://www.starton.com/" },
  { name: "FEATURE", logo: "/images/FEATURE.png", url: "https://feature.sh/fr" },
  { name: "Blockchain Business School", logo: "/images/img_14.png", url: "https://www.bbschool.fr/" },
  { name: "Angle Protocol", logo: "/images/img_15.png", url: "https://angle.money/" },
  { name: "MetaDev3", logo: "/images/MetaDev3.png", url: "https://www.metadev3.com/" },
  { name: "PyratzLabs", logo: "/images/img_18.png", url: "https://www.pyratzlabs.com/" },
  { name: "Kiln", logo: "/images/Kiln.png", url: "https://www.kiln.fi/" },
  { name: "Stack Talent", logo: "/images/img_20.png", url: "https://stack-talent.com/" },
  { name: "ERA 2140", logo: "/images/img_21.png", url: "https://www.era2140.com/" },
  { name: "Markchain", logo: "/images/Markchain.png", url: "https://markchain.io/" },
];

// Duplicate for seamless loop
const track = [...partners, ...partners];

export default function References() {
  return (
    <section id="OurCustomers" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-eyebrow">Trusted by</span>
          <h2 className="font-brand text-4xl md:text-5xl text-[#0f0f1a] mt-2">
            References &amp; <span className="gradient-text-brand">Partners</span>
          </h2>
        </div>

        {/* Scrolling carousel */}
        <div
          className="overflow-hidden rounded-2xl py-6"
          style={{ background: "linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)" }}
        >
          <div className="marquee-track">
            {track.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center justify-center mx-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                style={{ width: 140, height: 72 }}
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={120}
                  height={56}
                  className="object-contain max-h-14"
                  unoptimized
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
