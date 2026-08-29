import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import PageImage from "../components/PageImage";
import img1 from '../assets/image/b5.webp'
import img2 from '../assets/image/ceo.webp'


const STRENGTHS = [
  "90+ trained and certified NDT personnel",
  "Largest fleet of Pipeline X-Ray Crawlers in Bangladesh",
  "ISO/IEC 17025:2017 BAB Accredited Testing Laboratory",
  "BAERA licensed for Industrial Radiography, Isotope Transport & Import/Export",
  "Endorsed by BV, DNV-GL and RINA for marine NDT services",
];

const ACHIEVEMENTS = [
  { year: "2008", img: img1, title: "BSNDT Award 2008", desc: "Recognized by the Bangladesh Society of Non Destructive Testing for outstanding performance in NDT." },
  { year: "2024", img: img1, title: "ISO/IEC 17025:2017 Re-accreditation", desc: "Re-accredited by the Bangladesh Accreditation Board (BAB) through 2027." },
];

const TEAM = [
  { name: "Md. Faisal Rahman", role: "Chief Executive Officer" },
  { name: "Shuvo Alam", role: "Director of Operations" },
];

export default function About() {
  return (
    <div>
      <PageHeader image={img1} eyebrow="Since 1995" title="About Bangladesh Industrial X-Ray" breadcrumb={[{ label: "About Us" }]} />

      <section className="py-16 bg-background">
        <div className="container-page max-w-4xl">
          <p className="text-textmuted leading-relaxed mb-4 text-justify">
            Bangladesh Industrial X-Ray (B.I.X) was established in 1995 with a vision to provide quality
            and prompt services in the field of Non-Destructive Testing. Starting with just 5 personnel
            and limited resources, BIX has grown into a professionally managed company with a devoted
            workforce of over 90 personnel, extending operations across all sectors and all over Bangladesh.
          </p>
          <p className="text-textmuted leading-relaxed text-justify">
            BIX is a proprietorship company and a proud leader in NDT services in Bangladesh, holding the
            largest number of Pipeline X-Ray Crawlers in the country. BIX believes human resources are the
            most valuable asset, with personnel receiving rigorous, regular training in NDT methods and
            ASNT-aligned certification.
          </p>
        </div>
      </section>

      <section className="pb-16 bg-background">
        <div className="container-page">
          <div className="card p-8 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-start">
            {/* <PageImage label="Md. Faisal Rahman" className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0" /> */}
            <img src={img2} alt="" />
            <div>
              <p className="section-eyebrow">CEO Message</p>
              <p className="italic text-textmuted mb-4 text-justify">
                "Since our founding in 1995, our philosophy has remained the same — teamwork, both
                in-house and with our customers, is the anchor for successful project completion. We are
                committed to Total Customer Satisfaction through Excellent Services, and we look forward
                to a long, fulfilling association with every client we serve."
              </p>
              <p className="font-semibold text-primary">Md. Faisal Rahman</p>
              <p className="text-sm text-textmuted">Chief Executive Officer</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-background">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-8">
            <h3 className="font-semibold text-primary text-xl mb-3">Mission</h3>
            <p className="text-textmuted text-sm leading-relaxed text-justify">
              To meet customer's satisfaction by rendering services maintaining all requisite safety,
              norms & standards utilizing technology-driven skilled resources to ensure QA & QC of
              industrial products through the application of world-class Non-Destructive Testing & other
              allied methods, Data Collection, Management & Analysis Protocols with professional integrity
              & reliability.
            </p>
          </div>
          <div className="card p-8">
            <h3 className="font-semibold text-primary text-xl mb-3">Vision</h3>
            <p className="text-textmuted text-sm leading-relaxed text-justify">
              To become leaders in the specialized field of Non-destructive Testing, Material Testing and
              related quality services by maintaining highest industrial standards, ensuring safe working
              environment, professional services fulfilling customer satisfaction through innovation,
              experience and state-of-the-art technology.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-background">
        <div className="container-page">
          <p className="section-eyebrow">Why BIX</p>
          <h2 className="section-title !text-left">Company Strength</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {STRENGTHS.map((s) => (
              <div key={s} className="flex items-start gap-3 bg-white rounded-md border border-black/5 p-4">
                <span className="text-accent font-bold">✓</span>
                <span className="text-sm text-textmuted">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 bg-background">
        <div className="container-page">
          <p className="section-eyebrow">Milestones</p>
          <h2 className="section-title !text-left">Achievements</h2>
          <div className="space-y-4 mt-6">
            {ACHIEVEMENTS.map((a) => (
              <div className="flex w-full  p-6 bg-white gap-6 justify-between">
                <div key={a.year} className="flex gap-4 p-10 bg-white w-full rounded-md ">
                  <div className="text-2xl font-bold text-accent shrink-0 w-16">{a.year}</div>
                  <div>
                    <p className="font-semibold text-primary">{a.title}</p>
                    <p className="text-sm text-textmuted">{a.desc}</p>
                  </div>
                </div>
                <img src={a.img} className="h-32 rounded-xl" alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="container-page">
          <p className="section-eyebrow">Leadership</p>
          <h2 className="section-title !text-left">Team Introduction</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6 max-w-xl">
            {TEAM.map((t) => (
              <div key={t.name} className="text-center">
                <PageImage label={t.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-3" />
                <p className="font-semibold text-primary text-sm">{t.name}</p>
                <p className="text-xs text-textmuted">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
