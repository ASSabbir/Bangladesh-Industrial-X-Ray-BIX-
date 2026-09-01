import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import PageImage from "../components/PageImage";
import PageTransition from "../components/PageTransition";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { CATEGORY_OPTIONS } from "../constants/categories";
import img1 from "../assets/image/b2.webp";

const PAGE_SIZE = 8;

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All");
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api
      .get("/gallery")
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Only show tabs for categories that actually have published items.
  const availableTabs = useMemo(() => {
    const present = new Set(items.map((g) => g.category).filter(Boolean));
    return ["All", ...CATEGORY_OPTIONS.filter((c) => present.has(c))];
  }, [items]);

  const filtered = useMemo(
    () => (tab === "All" ? items : items.filter((g) => g.category === tab)),
    [items, tab]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const switchTab = (t) => {
    setTab(t);
    setPage(1);
  };

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = (item) => {
    setActive(item);
    requestAnimationFrame(() => setModalVisible(true));
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setActive(null), 200);
  };

  return (
    <PageTransition>
      <div>
        <PageHeader image={img1} eyebrow="Our Work" title="Gallery" breadcrumb={[{ label: "Gallery" }]} />
        <section className="py-16 bg-background">
          <div className="container-page">
            {loading ? (
              <Loader />
            ) : items.length === 0 ? (
              <EmptyState title="No gallery items published yet" />
            ) : (
              <>
                {/* Category tabs */}
                <div className="flex flex-wrap gap-2 mb-10 border-b border-black/10 pb-4">
                  {availableTabs.map((t) => (
                    <button
                      key={t}
                      onClick={() => switchTab(t)}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        tab === t
                          ? "bg-primary text-white"
                          : "bg-white text-textmuted border border-black/10 hover:border-accent hover:text-accent"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {filtered.length === 0 ? (
                  <EmptyState title="No items in this category yet" />
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {paged.map((g) => (
                      <button
                        key={g._id}
                        onClick={() => openModal(g)}
                        className="card shadow-none hover:shadow-none text-left group overflow-hidden"
                      >
                        <div className="overflow-hidden">
                          <PageImage
                            src={g.image}
                            label={g.title}
                            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium text-primary line-clamp-2">{g.title}</p>
                          {g.category && <p className="text-xs text-textmuted mt-0.5">{g.category}</p>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => goToPage(page - 1)}
                      disabled={page === 1}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-black/10 text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition-colors"
                    >
                      ‹
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                          p === page
                            ? "bg-accent text-white"
                            : "border border-black/10 text-primary hover:border-accent hover:text-accent"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => goToPage(page + 1)}
                      disabled={page === totalPages}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-black/10 text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition-colors"
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Modal */}
        {active && (
          <div
            className={`fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
              modalVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeModal}
          >
            <div
              className={`bg-white rounded-lg max-w-2xl w-full overflow-hidden transition-all duration-200 ${
                modalVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <PageImage src={active.image} label={active.title} className="w-full h-64 sm:h-80 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-primary text-lg mb-2">{active.title}</h3>
                {active.category && (
                  <p className="text-xs text-accent font-semibold uppercase tracking-wide mb-2">{active.category}</p>
                )}
                <p className="text-sm text-textmuted mb-3">{active.description}</p>
                {active.projectName && (
                  <p className="text-xs text-textmuted">
                    <strong className="text-primary">Project:</strong> {active.projectName}
                  </p>
                )}
                {active.date && (
                  <p className="text-xs text-textmuted mt-1">
                    <strong className="text-primary">Date:</strong> {new Date(active.date).toLocaleDateString()}
                  </p>
                )}
                <button className="mt-4 text-accent text-sm font-semibold" onClick={closeModal}>
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}