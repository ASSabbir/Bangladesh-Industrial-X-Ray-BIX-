import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import PageImage from "../components/PageImage";
import ServiceCard from "../components/ServiceCard";
import EquipmentCard from "../components/EquipmentCard";
import SectionHeading from "../components/SectionHeading";
import Loader from "../components/Loader";
import heroVideo from '../assets/video/hero.webm'
import PartnersMarquee from "../components/PartnersMarquee";
import AboutPreview from "../components/AboutPreview";
import TestimonialsSlider from "../components/TestimonialsSlider";

const CLIENT_LOGOS = [
  "Chevron", "Halliburton", "Schlumberger", "Weatherford", "Bashundhara Group",
  "BSRM", "United Group", "Western Marine Shipyard", "Khulna Shipyard", "L&T",
  "KAFCO", "Titas Gas", "BPDB", "GTCL",
];

const TESTIMONIALS = [
  {
    quote: "BIX delivered radiography services on our pipeline project with excellent quality and full compliance to standards.",
    name: "Engr. Rafiqul Islam",
    role: "Project Manager, GTCL",
  },
  {
    quote: "Professional PWHT and NDT team — turnaround jobs completed on schedule every time.",
    name: "Md. Kamal Hossain",
    role: "QA/QC Head, KAFCO",
  },
  {
    quote: "Reliable ultrasonic thickness gauging service for our shipbuilding projects.",
    name: "S. M. Faruk",
    role: "Site Engineer, Western Marine Shipyard",
  },
];

const FAQS = [
  { q: "What NDT methods does BIX offer?", a: "BIX offers Radiography (RT), Ultrasonic Testing (UT), Phased Array (PAUT), TOFD, LRUT, Digital Radiography, PMI, MPI, DPT, Hardness Testing, Metallurgical Inspection, PWHT, Vacuum Box Testing and more." },
  { q: "Is BIX internationally accredited?", a: "Yes. BIX is ISO/IEC 17025:2017 BAB accredited, ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 certified, and endorsed by BV, DNV-GL and RINA for marine NDT services." },
  { q: "Does BIX provide services outside Dhaka?", a: "Yes. BIX operates all over Bangladesh, including Chattogram and project sites nationwide, with offices in Dhaka and Chattogram." },
  { q: "How can I request a service quotation?", a: "Use the Contact page form, call +880 1712 519 316, or email faiz@bixndt.com and our team will respond promptly." },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [sRes, eRes] = await Promise.all([
          api.get("/services"),
          api.get("/equipment"),
        ]);
        setServices(sRes.data.data.slice(0, 6));
        setEquipment(eRes.data.data.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative md:h-[70vh] overflow-hidden flex items-center">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Optional gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

        {/* Hero Content */}
        <div className="container-page relative z-10 w-full py-20 sm:py-24 md:py-32 lg:py-36 text-center px-4 sm:px-6">
          {/* Badge */}
          <span className="inline-block bg-accent/90 text-white text-[10px] sm:text-xs md:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-6 tracking-wide uppercase">
            ISO/IEC 17025:2017 BAB Accredited
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-5 max-w-5xl mx-auto text-white">
            Bangladesh Industrial X-Ray
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/75 leading-relaxed max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto mb-7 sm:mb-8 px-2">
            Trusted NDT & Industrial Inspection partner since 1995 — Radiography,
            Ultrasonic, PAUT, PMI, Lifting Equipment and Rope Access services
            across Bangladesh.
          </p>

          {/* CTA */}
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base"
          >
            Get a Quote
          </Link>
        </div>
      </section>
      <PartnersMarquee></PartnersMarquee>

      {/* Services preview */}
      <section className="py-20 bg-background">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            subtitle="Comprehensive NDT and industrial inspection services delivered by ASNT-certified professionals."
          />
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <ServiceCard key={s._id} service={s} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/services" className="btn-outline-dark">View All Services</Link>
          </div>
        </div>
      </section>

      <AboutPreview></AboutPreview>

      {/* Equipment preview */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Our Fleet" title="Major Inspection Equipment" />
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipment.map((e) => (
                <EquipmentCard key={e._id} item={e} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/equipment" className="btn-outline-dark">View All Equipment</Link>
          </div>
        </div>
      </section>

      {/* Mission / Vision band */}
      <section className="py-16 bg-primary text-white">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="section-eyebrow text-red-400">Mission</p>
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              To meet customer's satisfaction by rendering services maintaining all requisite safety,
              norms & standards utilizing technology-driven skilled resources to ensure QA & QC of
              industrial products through world-class NDT and allied methods.
            </p>
          </div>
          <div>
            <p className="section-eyebrow text-red-400">Vision</p>
            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              To become leaders in the specialized field of Non-destructive Testing, Material Testing
              and related quality services, ensuring safe working environments through innovation and
              state-of-the-art technology.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSlider></TestimonialsSlider>

      {/* Clients */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Trusted By" title="Our Happy Clients" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CLIENT_LOGOS.map((c) => (
              <div key={c} className="h-16 rounded-md bg-background border border-black/5 flex items-center justify-center text-xs font-semibold text-textmuted text-center px-2">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Have Questions?" title="Frequently Asked Questions" />
          <div className="divide-y divide-black/10 border-t border-b border-black/10">
            {FAQS.map((f, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between py-4 text-left font-medium text-primary"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  <span className="text-accent">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="pb-4 text-sm text-textmuted">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
