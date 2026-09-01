import { useEffect, useState } from "react";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import EquipmentCard from "../components/EquipmentCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import PageTransition from "../components/PageTransition";
import img1 from "../assets/image/b5.webp";

const PAGE_SIZE = 8;

export default function Equipment() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api
      .get("/equipment")
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const paged = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageTransition>
      <div>
        <PageHeader image={img1} eyebrow="Our Fleet" title="Inspection Equipment" breadcrumb={[{ label: "Equipment" }]} />
        <section className="py-16 bg-background">
          <div className="container-page">
            {loading ? (
              <Loader />
            ) : items.length === 0 ? (
              <EmptyState title="No equipment published yet" />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {paged.map((e) => (
                    <EquipmentCard key={e._id} item={e} />
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