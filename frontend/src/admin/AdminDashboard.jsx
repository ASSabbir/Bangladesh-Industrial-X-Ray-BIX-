import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

const CARDS = [
  { key: "services", label: "Services", endpoint: "/services", to: "/admin/services" },
  { key: "equipment", label: "Equipment", endpoint: "/equipment", to: "/admin/equipment" },
  { key: "gallery", label: "Gallery Items", endpoint: "/gallery", to: "/admin/gallery" },
  { key: "projects", label: "Previous Projects", endpoint: "/projects", to: "/admin/projects" },
  { key: "training", label: "Training Programs", endpoint: "/training", to: "/admin/training" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const results = await Promise.all(CARDS.map((c) => api.get(`${c.endpoint}?all=true`)));
        const map = {};
        results.forEach((res, i) => (map[CARDS[i].key] = res.data.count));
        setCounts(map);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-2">Dashboard</h1>
      <p className="text-textmuted mb-8 text-sm">
        Manage the dynamic content collections that power the BIX website — Services, Equipment,
        Gallery, Previous Projects, and Training.
      </p>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CARDS.map((c) => (
            <Link key={c.key} to={c.to} className="card p-6 hover:shadow-md">
              <p className="text-3xl font-bold text-primary mb-1">{counts[c.key] ?? "—"}</p>
              <p className="text-sm text-textmuted">{c.label}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
