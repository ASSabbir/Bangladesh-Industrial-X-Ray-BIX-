import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SolutionFinderSelect from "./SolutionFinderSelect";
import { IndustryIcon, SpecialtyIcon, MethodIcon } from "./SolutionFinderIcons";
import { INDUSTRIES, getSpecialtiesFor, getMethodsFor } from "../data/solutionFinderData";

const buildUrl = (params) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v && qs.set(k, v));
  return `/solution-finder?${qs.toString()}`;
};

/**
 * Three linked dropdowns: industry -> specialty -> method.
 * - specialty stays greyed out until an industry is picked
 * - method stays greyed out until a specialty is picked
 * - picking a method redirects to /solution-finder?industry=..&specialty=..&method=..
 *
 * Props
 *  initial  : { industry, specialty, method } to preselect (used on the results page)
 *  syncUrl  : true on the results page so every change also updates the URL
 */
export default function SolutionFinderForm({ initial = {}, syncUrl = false, className = "" }) {
  const navigate = useNavigate();
  const wrapRef = useRef(null);

  const [industry, setIndustry] = useState(initial.industry || "");
  const [specialty, setSpecialty] = useState(initial.specialty || "");
  const [method, setMethod] = useState(initial.method || "");
  const [open, setOpen] = useState(null); // "industry" | "specialty" | "method" | null

  // Keep in sync with the URL (browser back/forward on the results page)
  useEffect(() => {
    setIndustry(initial.industry || "");
    setSpecialty(initial.specialty || "");
    setMethod(initial.method || "");
  }, [initial.industry, initial.specialty, initial.method]);

  // Close the open dropdown on outside click / Escape
  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(null);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const specialtyOptions = industry ? getSpecialtiesFor(industry) : [];
  const methodOptions = specialty ? getMethodsFor(specialty) : [];

  const pickIndustry = (id) => {
    if (id === industry) return setOpen("specialty");
    setIndustry(id);
    setSpecialty("");
    setMethod("");
    setOpen("specialty");
    if (syncUrl) navigate(buildUrl({ industry: id }), { replace: true });
  };

  const pickSpecialty = (id) => {
    if (id === specialty) return setOpen("method");
    setSpecialty(id);
    setMethod("");
    setOpen("method");
    if (syncUrl) navigate(buildUrl({ industry, specialty: id }), { replace: true });
  };

  const pickMethod = (id) => {
    setMethod(id);
    setOpen(null);
    navigate(buildUrl({ industry, specialty, method: id }), syncUrl ? { replace: true } : undefined);
  };

  const toggle = (key) => setOpen((cur) => (cur === key ? null : key));

  return (
    <div
      ref={wrapRef}
      className={`grid grid-cols-1  md:grid-cols-3 gap-px bg-primary/10 shadow-sm ${className}`}
    >
      <SolutionFinderSelect
        icon={<IndustryIcon />}
        placeholder="Select your industry"
        options={INDUSTRIES.map(({ id, label }) => ({ id, label }))}
        value={industry}
        open={open === "industry"}
        onToggle={() => toggle("industry")}
        onSelect={pickIndustry}
      />
      <SolutionFinderSelect
        icon={<SpecialtyIcon />}
        placeholder="Select a specialty"
        options={specialtyOptions}
        value={specialty}
        disabled={!industry}
        open={open === "specialty"}
        onToggle={() => toggle("specialty")}
        onSelect={pickSpecialty}
      />
      <SolutionFinderSelect
        icon={<MethodIcon />}
        placeholder="Select a method"
        options={methodOptions}
        value={method}
        disabled={!specialty}
        open={open === "method"}
        onToggle={() => toggle("method")}
        onSelect={pickMethod}
      />
    </div>
  );
}