import PageHeader from "../components/PageHeader";
import PageImage from "../components/PageImage";
import PageTransition from "../components/PageTransition";
import img1 from "../assets/image/b4.webp";
import cert1 from "../assets/image/cert1.webp";
import cert2 from "../assets/image/cert2.webp";
import cert3 from "../assets/image/cert3.jpg";
import cert4 from "../assets/image/cert4.webp";
import cert5 from "../assets/image/sample.webp";
import cert6 from "../assets/image/sample.webp";
import cert7 from "../assets/image/sample.webp";

const CERTS = [
  {
    name: "ISO/IEC 17025:2017 Accreditation",
    issuer: "BAB (Bangladesh Accreditation Board)",
    info: "Testing laboratory accreditation covering NDT methods.",
    image: cert1,
  },
  {
    name: "ISO 9001:2015",
    issuer: "TUV Austria",
    info: "Quality Management System certification.",
    image: cert2,
  },
  {
    name: "ISO 14001:2015",
    issuer: "TUV Austria",
    info: "Environmental Management System certification.",
    image: cert3,
  },
  {
    name: "ISO 45001:2018",
    issuer: "TUV Austria",
    info: "Occupational Health & Safety Management certification.",
    image: cert4,
  },
  {
    name: "BAERA Radiography Licence",
    issuer: "Bangladesh Atomic Energy Regulatory Authority",
    info: "Licensed for industrial radiography practices.",
    image: cert5,
  },
  {
    name: "Radioactive Material Transport Licence",
    issuer: "BAERA",
    info: "Licence for transport of radioactive materials.",
    image: cert6,
  },
  {
    name: "Import/Export Licence (Radiation Equipment)",
    issuer: "BAERA",
    info: "Class-E import & export licence for radiation equipment.",
    image: cert7,
  },
];

export default function Certifications() {
  return (
    <PageTransition>
      <div>
        <PageHeader
          image={img1}
          eyebrow="Accreditation"
          title="Certifications & Licences"
          breadcrumb={[{ label: "Certifications" }]}
        />
        <section className="py-16 bg-background">
          <div className="container-page">
            <p className="text-textmuted max-w-7xl mb-10 text-justify">
              Bangladesh Industrial X-Ray is BAB Accredited as per ISO/IEC
              17025:2017, and also ISO 9001:2015, ISO 14001:2015, ISO 45001:2018
              certified, and endorsed by BV, DNV-GL and RINA for NDT services.
              BIX holds authority from the Bangladesh Atomic Energy Regulatory
              Authority (BAERA) to use radioactive isotopes and X-Ray equipment
              for radiographic test activities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTS.map((c) => (
                <div
                  key={c.name}
                  className="card shadow-none hover:shadow-none overflow-hidden text-center"
                >
                  <div className="w-full h-48 sm:h-56 overflow-hidden">
                    <PageImage
                      label={c.name}
                      src={c.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-primary text-sm mb-1">
                      {c.name}
                    </h3>
                    <p className="text-xs text-textmuted mb-2">{c.issuer}</p>
                    <p className="text-xs text-textmuted">{c.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
