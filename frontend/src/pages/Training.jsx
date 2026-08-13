import { useEffect, useState } from "react";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import TrainingCard from "../components/TrainingCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function Training() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/training")
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader eyebrow="Skill Development" title="Training Programs" breadcrumb={[{ label: "Training" }]} />
      <section className="py-16 bg-background">
        <div className="container-page">
          {loading ? (
            <Loader />
          ) : items.length === 0 ? (
            <EmptyState title="No training programs published yet" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((t) => (
                <TrainingCard key={t._id} item={t} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
