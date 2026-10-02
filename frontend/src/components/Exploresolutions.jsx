import { useEffect, useRef, useState } from "react";
import bg from "../assets/image/b4.webp"; // swap for any dark industrial photo

// Content comes from the BIX brochure. Add or remove items freely:
// the ring spaces any number of nodes evenly (4 to 6 looks best).
const SOLUTIONS = [
  {
    id: "ndt",
    label: "NDT Inspection & Examination",
    description:
      "Radiography, ultrasonic, magnetic particle and dye penetrant testing by certified teams, with reports issued to the applicable codes and standards.",
  },
  {
    id: "advanced",
    label: "Advanced NDT",
    description:
      "Phased array, TOFD, long range ultrasonics, digital radiography and PMI give faster, more detailed weld and corrosion inspection with a permanent record.",
  },
  {
    id: "heat",
    label: "Heat Treatment (PWHT)",
    description:
      "Post weld heat treatment with automatic resistance and induction machines relieves residual stress and reduces the risk of cracking in welded joints.",
  },
  {
    id: "lifting",
    label: "Lifting Equipment Inspection",
    description:
      "Load tests plus visual and NDT examination of lifting equipment to British and international standards, ending with a Report of Thorough Examination.",
  },
  {
    id: "rope",
    label: "Rope Access Services",
    description:
      "IRATA certified teams carry out NDT, hull and coating inspection where scaffolding is slow or costly, cutting cost and interference with other work.",
  },
];

const RING_RADIUS = 38; // % of the square container

export default function ExploreSolutions() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Play the entrance (ring draws, nodes pop in) once, when scrolled into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const count = SOLUTIONS.length;
  const activeIndex = SOLUTIONS.findIndex((s) => s.id === activeId);
  const active = activeIndex >= 0 ? SOLUTIONS[activeIndex] : null;

  // Highlighted arc sits on the active node and slides to the next one
  const arc = 1 / count;
  const arcOffset = activeIndex >= 0 ? -(activeIndex / count - arc / 2) : 0;

  return (
    <section ref={sectionRef} className="relative overflow-hidden text-white">
      <style>{`
        @keyframes ex-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes ex-orbit { to { transform: rotate(360deg); } }
        .ex-fade { animation: ex-fade .55s cubic-bezier(.2,.7,.2,1) both; }
        .ex-orbit { animation: ex-orbit 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ex-fade, .ex-orbit { animation: none; }
        }
      `}</style>

      <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />

      <div className="container-page relative z-10 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left copy */}
        <div>
          <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tight mb-6">
            Explore our solutions
          </h2>
          <p className="text-white/80 leading-relaxed max-w-md">
            From conventional radiography to phased array, heat treatment and rope access, BIX
            brings an ISO/IEC 17025:2017 accredited team to pipelines, power plants, refineries and
            shipyards across Bangladesh.
          </p>
        </div>

        {/* Ring */}
        <div className="relative mx-auto w-full max-w-[560px] aspect-square">
          {/* soft glass disc behind the description */}
          <div className="absolute inset-[11%] rounded-full bg-white/[0.04] backdrop-blur-sm" />

          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
            {/* base ring, draws itself on entrance */}
            <circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={inView ? 0 : 1}
              className="text-white/60"
              style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(.6,.1,.2,1)" }}
              transform="rotate(-90 50 50)"
            />
            {/* highlighted arc under the active node */}
            <circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray={`${arc} ${1 - arc}`}
              strokeDashoffset={arcOffset}
              className="text-accent"
              style={{
                opacity: active ? 1 : 0,
                transition: "stroke-dashoffset .8s cubic-bezier(.6,.1,.2,1), opacity .4s",
              }}
              transform="rotate(-90 50 50)"
            />
          </svg>

          {/* a small light travelling around the ring */}
          <div className="ex-orbit absolute inset-0 pointer-events-none" aria-hidden="true">
            <span
              className="absolute left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_3px_rgba(255,255,255,0.35)]"
              style={{ top: `${50 - RING_RADIUS}%`, opacity: inView ? 1 : 0, transition: "opacity 1s 1.6s" }}
            />
          </div>

          {/* middle text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] text-center">
            {active ? (
              <p
                key={active.id}
                className="ex-fade text-[11px] sm:text-sm md:text-base leading-relaxed text-white"
              >
                {active.description}
              </p>
            ) : (
              <p className="text-[11px] sm:text-sm text-white/50 leading-relaxed">
                Select a solution to see how BIX can help.
              </p>
            )}
          </div>

          {/* nodes */}
          {SOLUTIONS.map((s, i) => {
            const angle = ((-90 + (360 / count) * i) * Math.PI) / 180;
            const left = 50 + RING_RADIUS * Math.cos(angle);
            const top = 50 + RING_RADIUS * Math.sin(angle);
            const isActive = s.id === activeId;

            return (
              <div
                key={s.id}
                className="absolute w-[25%] aspect-square -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                {/* entrance wrapper (kept separate so its delay never slows the hover) */}
                <div
                  className={`w-full h-full transition-[opacity,transform] duration-700 ease-out ${
                    inView ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                  style={{ transitionDelay: inView ? `${500 + i * 130}ms` : "0ms" }}
                >
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(isActive ? null : s.id)}
                    className={`relative w-full h-full rounded-full flex items-center justify-center text-center px-[9%] font-bold leading-tight text-[9px] sm:text-xs md:text-sm border-[3px] transition-all duration-300 ease-out outline-none focus-visible:ring-4 focus-visible:ring-white/60 ${
                      isActive
                        ? "bg-primary text-white border-accent scale-110 shadow-2xl"
                        : "bg-white text-primary border-white hover:bg-accent hover:border-accent hover:text-white hover:scale-105 hover:shadow-xl"
                    }`}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full border-2 border-accent/70 animate-ping motion-reduce:hidden pointer-events-none"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative">{s.label}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}