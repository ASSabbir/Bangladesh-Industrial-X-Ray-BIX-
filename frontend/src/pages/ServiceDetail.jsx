import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";
import PageImage from "../components/PageImage";
import EmptyState from "../components/EmptyState";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/services/${slug}`)
      .then((res) => setService(res.data.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);
  console.log(service)

  if (loading) return <Loader />;
  if (notFound || !service) return <EmptyState title="Service not found" message="This service may have been removed or renamed." />;

  return (
    <div>
      <PageHeader
        eyebrow={service.category}
        title={service.title}
        breadcrumb={[{ to: "/services", label: "Services" }, { label: service.title }]}
      />

      <section className="py-16 bg-background">
        
        <div className="container-page grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Introduction</h2>
              <p className="text-textmuted leading-relaxed">{service.introduction}</p>
              {service.detailedDescription && (
                <p className="text-textmuted leading-relaxed mt-4">{service.detailedDescription}</p>
              )}
            </div>

            {service.features?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">Why Choose This Service</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 bg-white border border-black/5 rounded-md p-3">
                      <span className="text-accent font-bold">✓</span>
                      <span className="text-sm text-textmuted">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.workingProcess?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">Complete Working Process</h2>
                <ol className="relative border-l-2 border-accent/30 pl-6 space-y-6">
                  {service.workingProcess.map((step, i) => (
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
            )}

            {service.relatedEquipment?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">Related Equipment</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.relatedEquipment.map((eq) => (
                    <Link
                      key={eq._id}
                      to={`/equipment/${eq.slug}`}
                      className="card flex gap-3 p-3 items-center hover:shadow-md"
                    >
                      <PageImage src={eq.image} label={eq.name} className="w-16 h-16 rounded object-cover shrink-0" />
                      <div>
                        <p className="font-semibold text-primary text-sm">{eq.name}</p>
                        <p className="text-xs text-textmuted">{eq.manufacturer}</p>
                        <span className="text-accent text-xs font-semibold">View Details →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            {service.benefits?.length > 0 && (
              <div className="card p-6">
                <h3 className="font-semibold text-primary mb-3">Service Benefits</h3>
                <ul className="space-y-2 text-sm text-textmuted list-disc list-inside">
                  {service.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="card p-6 bg-primary text-white">
              <h3 className="font-semibold mb-2">Need this service?</h3>
              <p className="text-sm text-white/70 mb-4">Get in touch with our team for a fast quotation.</p>
              <Link to="/contact" className="btn-primary w-full">Contact Us</Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
