import PageHeader from "../components/PageHeader";

const TESTIMONIALS = [
  { quote: "BIX delivered radiography services on our pipeline project with excellent quality and full compliance to standards.", name: "Engr. Rafiqul Islam", role: "Project Manager, GTCL" },
  { quote: "Professional PWHT and NDT team — turnaround jobs completed on schedule every time.", name: "Md. Kamal Hossain", role: "QA/QC Head, KAFCO" },
  { quote: "Reliable ultrasonic thickness gauging service for our shipbuilding projects.", name: "S. M. Faruk", role: "Site Engineer, Western Marine Shipyard" },
  { quote: "Their PAUT team handled our power plant weld inspections with excellent turnaround and clear reporting.", name: "Engr. Nasir Uddin", role: "QA/QC Manager, BPDB" },
  { quote: "Rope access hull inspection was completed safely and efficiently, minimizing our vessel downtime.", name: "Capt. S. Alam", role: "Fleet Manager, Marine Operations" },
];

export default function Testimonials() {
  return (
    <div>
      <PageHeader eyebrow="Client Voices" title="Testimonials" breadcrumb={[{ label: "Testimonials" }]} />
      <section className="py-16 bg-background">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card p-6">
              <div className="text-accent text-sm mb-3">★★★★★</div>
              <p className="text-textmuted text-sm mb-4 italic">"{t.quote}"</p>
              <p className="font-semibold text-primary text-sm">{t.name}</p>
              <p className="text-xs text-textmuted">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
