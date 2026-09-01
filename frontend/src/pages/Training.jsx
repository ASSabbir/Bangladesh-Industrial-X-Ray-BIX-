import { useEffect, useState } from "react";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import TrainingCard from "../components/TrainingCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import PageTransition from "../components/PageTransition";
import img1 from "../assets/image/b3.webp";

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
    <PageTransition>
      <div>
        <PageHeader
          image={img1}
          eyebrow="Skill Development"
          title="Training Programs"
          breadcrumb={[{ label: "Training" }]}
        />
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
    </PageTransition>
  );
}