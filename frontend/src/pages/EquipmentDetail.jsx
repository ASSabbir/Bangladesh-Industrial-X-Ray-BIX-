import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";
import PageImage from "../components/PageImage";
import EmptyState from "../components/EmptyState";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import img1 from '../assets/image/b4.webp'
export default function EquipmentDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [categoryGallery, setCategoryGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/equipment/${slug}`)
      .then((res) => setItem(res.data.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Same category-linkage as the service detail page — gallery images
  // sharing this equipment's category show up automatically, no manual
  // per-item selection needed in the admin panel.
  useEffect(() => {
    if (!item?.category) {
      setCategoryGallery([]);
      return;
    }
    api
      .get(`/gallery?category=${encodeURIComponent(item.category)}`)
      .then((res) => setCategoryGallery(res.data.data))
      .catch(() => setCategoryGallery([]));
  }, [item?.category]);

  if (loading) return <Loader />;
  if (notFound || !item) return <EmptyState title="Equipment not found" />;

  return (
    <div>
      <PageHeader
      image={img1}
        eyebrow={item.category}
        title={item.name}
        breadcrumb={[{ to: "/equipment", label: "Equipment" }, { label: item.name }]}
      />
      <section className="py-16 bg-background">
        <div className="container-page grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <PageImage src={item.image} label={item.name} className="w-full h-72 object-cover rounded-lg" />
            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Description</h2>
              <p className="text-textmuted leading-relaxed">{item.description}</p>
            </div>

            {item.specifications?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-3">Specifications</h2>
                <div className="card divide-y divide-black/5">
                  {item.specifications.map((s, i) => (
                    <div key={i} className="flex justify-between px-4 py-2 text-sm">
                      <span className="text-textmuted">{s.label}</span>
                      <span className="font-medium text-primary">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.features?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-3">Features</h2>
                <ul className="space-y-2 text-sm text-textmuted">
                  {item.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.relatedServices?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary mb-3">Related Services</h2>
                <div className="flex flex-wrap gap-3">
                  {item.relatedServices.map((s) => (
                    <Link key={s._id} to={`/services/${s.slug}`} className="px-4 py-2 bg-white border border-black/10 rounded-full text-sm text-primary hover:border-accent hover:text-accent">
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-3">
            <div className="card p-6">
              <h3 className="font-semibold text-primary mb-3">Equipment Info</h3>
              <dl className="text-sm space-y-2">
                <div className="flex justify-between"><dt className="text-textmuted">Manufacturer</dt><dd className="font-medium text-primary text-right">{item.manufacturer}</dd></div>
                <div className="flex justify-between"><dt className="text-textmuted">Model</dt><dd className="font-medium text-primary text-right">{item.model}</dd></div>
                <div className="flex justify-between"><dt className="text-textmuted">Quantity</dt><dd className="font-medium text-primary text-right">{item.quantity}</dd></div>
              </dl>
            </div>

            {categoryGallery.length > 0 && (
              <div className="card p-6">
                <h3 className="font-semibold text-primary mb-3">Related Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categoryGallery.slice(0, 6).map((g) => (
                    <div key={g._id} className="rounded-md overflow-hidden">
                      <img
                        src={resolveImageUrl(g.image)}
                        alt={g.title}
                        className="w-full h-20 object-cover bg-background"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link to="/contact" className="btn-primary w-full">Request Inspection</Link>
          </aside>
        </div>
      </section>
    </div>
  );
}