import { useEffect, useRef } from "react";
import gsap from "gsap";

const STATS = [
  { value: 30, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Industries Served" },
  { value: 20, suffix: "+", label: "Awards Won" },
  { value: 1000, suffix: "+", label: "Projects Delivered" },
];

function StatItem({ value, suffix, label }) {
  const numRef = useRef(null);

  useEffect(() => {
    if (!numRef.current) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 2,
      delay: 0.3,
      ease: "power2.out",
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = Math.floor(obj.val);
      },
    });
    return () => tween.kill();
  }, [value]);

  return (
    <div className="flex-1 min-w-[110px] text-center px-4 sm:px-8 py-2">
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
        <span ref={numRef}>0</span>
        {suffix}
      </p>
      <p className="text-[11px] sm:text-xs md:text-sm text-white/60 mt-1 uppercase tracking-wide">{label}</p>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 px-4 mt-8 sm:mt-10">
      <div className="max-w-5xl mx-auto flex flex-wrap items-stretch justify-center divide-x divide-white/15">
        {STATS.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}