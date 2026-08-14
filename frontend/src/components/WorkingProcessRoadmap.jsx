import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Renders the "Complete Working Process" as an animated zigzag roadmap on
// larger screens (each step's circle alternates top/bottom, connected by a
// smooth S-curve SVG path that draws itself in on scroll, plus a small dot
// that travels the path continuously), and a simpler animated vertical
// timeline on small screens where a horizontal zigzag wouldn't fit.
// Works for any number of steps — nothing here is hardcoded to 4/5/6.
export default function WorkingProcessRoadmap({ steps }) {
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const [pathD, setPathD] = useState("");

  nodeRefs.current = [];
  const setNodeRef = (el, i) => {
    if (el) nodeRefs.current[i] = el;
  };

  // Measure each step's circle position relative to the container and build
  // a smooth connecting path between them.
  const measureAndBuildPath = () => {
    const container = containerRef.current;
    if (!container || nodeRefs.current.length < 2) return;

    const containerRect = container.getBoundingClientRect();
    const points = nodeRefs.current.map((node) => {
      const r = node.getBoundingClientRect();
      return {
        x: r.left - containerRect.left + r.width / 2,
        y: r.top - containerRect.top + r.height / 2,
      };
    });

    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2;
      d += ` C ${midX},${prev.y} ${midX},${curr.y} ${curr.x},${curr.y}`;
    }
    setPathD(d);
  };

  useLayoutEffect(() => {
    measureAndBuildPath();
    const handleResize = () => measureAndBuildPath();
    window.addEventListener("resize", handleResize);

    const ro = new ResizeObserver(handleResize);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length]);

  // Animate: path draws in on scroll, nodes fade/scale in staggered, then a
  // dot loops endlessly along the finished path for a continuous "alive"
  // feel.
  useEffect(() => {
    if (!pathD || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(nodeRefs.current, { opacity: 0, scale: 0.5 });
    if (dotRef.current) gsap.set(dotRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.to(path, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" })
        .to(
          nodeRefs.current,
          { opacity: 1, scale: 1, duration: 0.45, stagger: 0.12, ease: "back.out(2)" },
          "-=1.1"
        )
        .to(dotRef.current, { opacity: 1, duration: 0.3 }, "-=0.3")
        .call(() => {
          if (!dotRef.current) return;
          gsap.to(dotRef.current, {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
            duration: 3.5,
            ease: "power1.inOut",
            repeat: -1,
          });
        });
    }, containerRef);

    return () => ctx.revert();
  }, [pathD]);

  return (
    <div>
      {/* Desktop / tablet — horizontal zigzag roadmap */}
      <div ref={containerRef} className="relative hidden md:block h-[360px] lg:h-[320px]">
        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {pathD && (
            <>
              <path
                d={pathD}
                fill="none"
                stroke="var(--color-accent)"
                strokeOpacity="0.15"
                strokeWidth="3"
              />
              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle ref={dotRef} r="6" fill="var(--color-accent)" />
            </>
          )}
        </svg>

        <div className="relative h-full flex items-stretch gap-3 lg:gap-6">
          {steps.map((step, i) => {
            const isTop = i % 2 === 0;
            return (
              <div
                key={i}
                className={`flex-1 flex flex-col items-center ${isTop ? "justify-start" : "justify-end"}`}
              >
                {isTop && (
                  <div
                    ref={(el) => setNodeRef(el, i)}
                    className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-accent text-white font-bold flex items-center justify-center shadow-lg shadow-accent/30 shrink-0 z-10"
                  >
                    {i + 1}
                  </div>
                )}
                <div className={`text-center px-2 max-w-[160px] lg:max-w-[190px] ${isTop ? "mt-4" : "mb-4"}`}>
                  <p className="font-semibold text-primary text-sm leading-snug">{step.title}</p>
                  <p className="text-xs text-textmuted mt-1 leading-snug">{step.description}</p>
                </div>
                {!isTop && (
                  <div
                    ref={(el) => setNodeRef(el, i)}
                    className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-accent text-white font-bold flex items-center justify-center shadow-lg shadow-accent/30 shrink-0 z-10"
                  >
                    {i + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile — vertical timeline */}
      <ol className="relative border-l-2 border-accent/30 pl-6 space-y-6 md:hidden">
        {steps.map((step, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[31px] w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <p className="font-semibold text-primary">{step.title}</p>
            <p className="text-sm text-textmuted">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}