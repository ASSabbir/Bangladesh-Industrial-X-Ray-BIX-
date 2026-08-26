import PageHeader from "../components/PageHeader";
import PageImage from "../components/PageImage";
import img1 from '../assets/image/b4.webp'
const CERTS = [
  { name: "ISO/IEC 17025:2017 Accreditation", issuer: "BAB (Bangladesh Accreditation Board)", info: "Testing laboratory accreditation covering NDT methods." },
  { name: "ISO 9001:2015", issuer: "TUV Austria", info: "Quality Management System certification." },
  { name: "ISO 14001:2015", issuer: "TUV Austria", info: "Environmental Management System certification." },
  { name: "ISO 45001:2018", issuer: "TUV Austria", info: "Occupational Health & Safety Management certification." },
  { name: "BAERA Radiography Licence", issuer: "Bangladesh Atomic Energy Regulatory Authority", info: "Licensed for industrial radiography practices." },
  { name: "Radioactive Material Transport Licence", issuer: "BAERA", info: "Licence for transport of radioactive materials." },
  { name: "Import/Export Licence (Radiation Equipment)", issuer: "BAERA", info: "Class-E import & export licence for radiation equipment." },
];

export default function Certifications() {
  return (
    <div>
      <PageHeader image={img1} eyebrow="Accreditation" title="Certifications & Licences" breadcrumb={[{ label: "Certifications" }]} />
      <section className="py-16 bg-background">
        <div className="container-page">
          <p className="text-textmuted max-w-3xl mb-10">
            Bangladesh Industrial X-Ray is BAB Accredited as per ISO/IEC 17025:2017, and also ISO 9001:2015,
            ISO 14001:2015, ISO 45001:2018 certified, and endorsed by BV, DNV-GL and RINA for NDT services.
            BIX holds authority from the Bangladesh Atomic Energy Regulatory Authority (BAERA) to use
            radioactive isotopes and X-Ray equipment for radiographic test activities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTS.map((c) => (
              <div key={c.name} className="card p-6 text-center">
                <PageImage label={c.name} className="w-full h-40 rounded object-cover mb-4" />
                <h3 className="font-semibold text-primary text-sm mb-1">{c.name}</h3>
                <p className="text-xs text-textmuted mb-2">{c.issuer}</p>
                <p className="text-xs text-textmuted">{c.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
