import { useEffect, useState } from "react";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import PageImage from "../components/PageImage";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import img1 from '../assets/image/b2.webp'
export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    api
      .get("/gallery")
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader image={img1} eyebrow="Our Work" title="Gallery" breadcrumb={[{ label: "Gallery" }]} />
      <section className="py-16 bg-background">
        <div className="container-page">
          {loading ? (
            <Loader />
          ) : items.length === 0 ? (
            <EmptyState title="No gallery items published yet" />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((g) => (
                <button
                  key={g._id}
                  onClick={() => setActive(g)}
                  className="card text-left group"
                >
                  <PageImage src={g.image} label={g.title} className="w-full h-40 object-cover group-hover:opacity-90" />
                  <div className="p-3">
                    <p className="text-sm font-medium text-primary line-clamp-2">{g.title}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <PageImage src={active.image} label={active.title} className="w-full h-72 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-primary text-lg mb-2">{active.title}</h3>
              <p className="text-sm text-textmuted mb-3">{active.description}</p>
              {active.projectName && (
                <p className="text-xs text-textmuted"><strong className="text-primary">Project:</strong> {active.projectName}</p>
              )}
              <button className="mt-4 text-accent text-sm font-semibold" onClick={() => setActive(null)}>Close ✕</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
