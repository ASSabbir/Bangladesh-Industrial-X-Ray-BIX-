import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import PageTransition from "../components/PageTransition";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import img1 from "../assets/image/b2.webp";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/projects/${id}`)
      .then((res) => setProject(res.data.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (notFound || !project) return <EmptyState title="Project not found" message="This project may have been removed." />;

  const hasImages = project.images?.length > 0;

  return (
    <PageTransition>
      <div>
        <PageHeader
          image={img1}
          eyebrow={project.workCategory}
          title={project.projectName}
          breadcrumb={[{ to: "/previous-projects", label: "Previous Projects" }, { label: project.projectName }]}
        />

        <section className="py-16 bg-background">
          <div className="container-page grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {hasImages && (
                <div className="rounded-2xl overflow-hidden shadow-lg border border-black/5">
                  <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    speed={600}
                    autoplay={project.images.length > 1 ? { delay: 4000, disableOnInteraction: false } : false}
                    pagination={project.images.length > 1 ? { clickable: true } : false}
                    navigation={project.images.length > 1}
                    loop={project.images.length > 1}
                    className="h-[260px] sm:h-[360px] md:h-[440px]"
                  >
                    {project.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={resolveImageUrl(img)}
                          alt={`${project.projectName} — photo ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}

              {project.summary && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-3">Project Overview</h2>
                  <p className="text-textmuted leading-relaxed">{project.summary}</p>
                </div>
              )}

              {project.clientFeedback && (
                <div className="card p-6 sm:p-8 bg-primary text-white relative overflow-hidden">
                  <span className="absolute top-4 left-6 text-6xl text-white/10 font-serif leading-none select-none">
                    "
                  </span>
                  <p className="relative text-white/90 text-base sm:text-lg italic leading-relaxed mb-4">
                    {project.clientFeedback}
                  </p>
                  {project.feedbackAuthor && (
                    <p className="relative text-sm text-white/60 font-medium">— {project.feedbackAuthor}</p>
                  )}
                </div>
              )}

              {project.relatedServices?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-4">Services Used in This Project</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.relatedServices.map((s) => (
                      <Link
                        key={s._id}
                        to={`/services/${s.slug}`}
                        className="px-4 py-2 bg-white border border-black/10 rounded-full text-sm text-primary hover:border-accent hover:text-accent transition-colors"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="card p-6">
                <h3 className="font-semibold text-primary mb-4">Project Details</h3>
                <dl className="text-sm space-y-3">
                  {project.clientName && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-textmuted shrink-0">Client</dt>
                      <dd className="font-medium text-primary text-right">{project.clientName}</dd>
                    </div>
                  )}
                  {project.contractorName && (
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-textmuted shrink-0">Contractor</dt>
                      <dd className="font-medium text-primary text-right flex items-center gap-2">
                        {project.contractorLogo && (
                          <img
                            src={resolveImageUrl(project.contractorLogo)}
                            alt={project.contractorName}
                            className="w-6 h-6 rounded-full object-cover bg-background"
                          />
                        )}
                        {project.contractorName}
                      </dd>
                    </div>
                  )}
                  {project.location && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-textmuted shrink-0">Location</dt>
                      <dd className="font-medium text-primary text-right">{project.location}</dd>
                    </div>
                  )}
                  {project.workCategory && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-textmuted shrink-0">Work Category</dt>
                      <dd className="font-medium text-primary text-right">{project.workCategory}</dd>
                    </div>
                  )}
                  {project.yearOfExecution && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-textmuted shrink-0">Year</dt>
                      <dd className="font-medium text-primary text-right">{project.yearOfExecution}</dd>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-textmuted shrink-0">Duration</dt>
                      <dd className="font-medium text-primary text-right">{project.duration}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="card p-6 bg-primary text-white">
                <h3 className="font-semibold mb-2">Need a similar solution?</h3>
                <p className="text-sm text-white/70 mb-4">Talk to our team about your project requirements.</p>
                <Link to="/contact" className="btn-primary w-full">Contact Us</Link>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}