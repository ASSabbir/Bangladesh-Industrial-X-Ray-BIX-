import { useEffect, useState } from "react";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import ServiceCard from "../components/ServiceCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import PageTransition from "../components/PageTransition";
import img1 from "../assets/image/b2.webp";

const PAGE_SIZE = 6;

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api
      .get("/services")
      .then((res) => setServices(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(services.length / PAGE_SIZE));
  const paged = services.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageTransition>
      <div>
        <PageHeader image={img1} eyebrow="Non-Destructive Testing" title="Our Services" breadcrumb={[{ label: "Services" }]} />
        <section className="py-16 bg-background">
          <div className="container-page">
            {loading ? (
              <Loader />
            ) : services.length === 0 ? (
              <EmptyState title="No services published yet" />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paged.map((s) => (
                    <ServiceCard key={s._id} service={s} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button onClick={() => goToPage(page - 1)} disabled={page === 1} className="w-9 h-9 flex items-center justify-center rounded-full border border-black/10 text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition-colors">‹</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button key={p} onClick={() => goToPage(p)} className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${p === page ? "bg-accent text-white" : "border border-black/10 text-primary hover:border-accent hover:text-accent"}`}>{p}</button>
                    ))}
                    <button onClick={() => goToPage(page + 1)} disabled={page === totalPages} className="w-9 h-9 flex items-center justify-center rounded-full border border-black/10 text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition-colors">›</button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}