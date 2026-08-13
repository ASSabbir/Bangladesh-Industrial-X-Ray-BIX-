import PageHeader from "../components/PageHeader";

const PARTNERS = [
  "Chevron", "Halliburton", "Schlumberger", "Weatherford", "Bashundhara Group",
  "BSRM", "United Group", "L&T", "KAFCO", "Titas Gas", "BPDB",
  "Western Marine Shipyard", "Khulna Shipyard", "Eastern Refinery Ltd (ERL)",
];

export default function Partners() {
  return (
    <div>
      <PageHeader eyebrow="Trusted By" title="Our Partners & Clients" breadcrumb={[{ label: "Partners" }]} />
      <section className="py-16 bg-background">
        <div className="container-page">
          <p className="text-textmuted max-w-3xl mb-10">
            Over three decades, BIX has partnered with leading names across oil & gas, power, fertilizer,
            shipbuilding and construction sectors — delivering NDT and industrial inspection services they
            can rely on.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {PARTNERS.map((p) => (
              <div key={p} className="h-20 rounded-md bg-white border border-black/5 flex items-center justify-center text-sm font-semibold text-textmuted text-center px-3">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
