import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import SolutionFinderForm from "../components/SolutionFinderForm";
import { useContactModal } from "../context/ContactModalContext";
import { METHODS, SPECIALTIES, getIndustry, isValidSelection } from "../data/solutionFinderData";
import img1 from "../assets/image/b3.webp";

function MethodItem({ method, open, highlighted, onToggle }) {
  const { openContactModal } = useContactModal();
  return (
    <div className={`bg-white border ${highlighted ? "border-accent" : "border-black/10"}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-semibold text-primary text-sm sm:text-base">{method.label}</span>
        <span className="w-7 h-7 shrink-0 rounded-full bg-background text-accent flex items-center justify-center text-lg leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 -mt-1">
          <p className="text-sm text-textmuted leading-relaxed max-w-3xl">{method.description}</p>
          <button
            type="button"
            onClick={openContactModal}
            className="btn-primary inline-flex mt-4 text-sm"
          >
            Request a quote
          </button>
        </div>
      )}
    </div>
  );
}

export default function SolutionFinder() {
  const [params] = useSearchParams();
  const industry = params.get("industry") || "";
  const specialty = params.get("specialty") || "";
  const method = params.get("method") || "";

  const valid = isValidSelection(industry, specialty, method);
  const spec = valid ? SPECIALTIES[specialty] : null;

  // The chosen method starts open; the user can open any other method of the same specialty
  const [openId, setOpenId] = useState(null);
  const activeOpen = openId ?? method;
  useEffect(() => setOpenId(null), [method]);

  return (
    <PageTransition>
      <div>
        <PageHeader
          image={img1}
          eyebrow="Find the right service"
          title="Solution Finder"
          breadcrumb={[{ label: "Solution Finder" }]}
        />

        <section className="bg-background pt-10 pb-6">
          <div className="container-page">
            <SolutionFinderForm
              syncUrl
              initial={{ industry, specialty, method }}
            />
          </div>
        </section>

        <section className="py-12 bg-white min-h-[320px]">
          <div className="container-page">
            <h2 className="text-3xl font-bold text-primary mb-6">Your solutions</h2>

            {!valid ? (
              <div className="bg-background border border-black/5 p-8 text-textmuted text-sm">
                Choose an industry, then a specialty, then a method to see how BIX can help.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-background p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div>
                    <p className="font-semibold text-primary mb-1">{spec.label}</p>
                    <p className="text-xs text-textmuted mb-2">
                      Industry: {getIndustry(industry).label}
                    </p>
                    <p className="text-sm text-textmuted max-w-2xl">{spec.description}</p>
                  </div>
                  <Link to="/services" className="btn-outline-dark shrink-0 self-start md:self-center">
                    Learn more
                  </Link>
                </div>

                {spec.methods.map((id) => (
                  <MethodItem
                    key={id}
                    method={METHODS[id]}
                    highlighted={id === method}
                    open={activeOpen === id}
                    onToggle={() => setOpenId(activeOpen === id ? "" : id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}