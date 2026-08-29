import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";
import PageImage from "../components/PageImage";
import EmptyState from "../components/EmptyState";
import PageTransition from "../components/PageTransition";
import img1 from "../assets/image/b3.webp";

export default function TrainingDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/training/${id}`)
      .then((res) => setItem(res.data.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (notFound || !item) return <EmptyState title="Training program not found" />;

  return (
    <PageTransition>
      <div>
        <PageHeader
          image={img1}
          eyebrow="Skill Development"
          title={item.title}
          breadcrumb={[{ to: "/training", label: "Training" }, { label: item.title }]}
        />
        <section className="py-16 bg-background">
          <div className="container-page grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <PageImage src={item.image} label={item.title} className="w-full h-72 object-cover rounded-lg" />

              {item.courseDescription && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-3">Overview</h2>
                  <p className="text-textmuted leading-relaxed">{item.courseDescription}</p>
                </div>
              )}

              {item.details && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-3">Course Details</h2>
                  <p className="text-textmuted leading-relaxed whitespace-pre-line">{item.details}</p>
                </div>
              )}

              {item.gallery?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-3">Gallery</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {item.gallery.map((g, i) => (
                      <PageImage key={i} src={g} label={item.title} className="w-full h-32 object-cover rounded-md" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-3">
              <div className="card p-6">
                <h3 className="font-semibold text-primary mb-3">Program Info</h3>
                <dl className="text-sm space-y-2">
                  {item.duration && (
                    <div className="flex justify-between"><dt className="text-textmuted">Duration</dt><dd className="font-medium text-primary text-right">{item.duration}</dd></div>
                  )}
                  {item.schedule && (
                    <div className="flex justify-between"><dt className="text-textmuted">Schedule</dt><dd className="font-medium text-primary text-right">{item.schedule}</dd></div>
                  )}
                  {item.certificationInfo && (
                    <div className="flex justify-between"><dt className="text-textmuted">Certification</dt><dd className="font-medium text-primary text-right">{item.certificationInfo}</dd></div>
                  )}
                </dl>
              </div>

              {item.contactInfo && (
                <div className="card p-6">
                  <h3 className="font-semibold text-primary mb-2">Contact</h3>
                  <p className="text-sm text-textmuted">{item.contactInfo}</p>
                </div>
              )}

              <Link to="/contact" className="btn-primary w-full">Enroll Now</Link>
            </aside>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}