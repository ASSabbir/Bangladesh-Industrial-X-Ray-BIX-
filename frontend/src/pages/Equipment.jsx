import { useEffect, useState } from "react";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import EquipmentCard from "../components/EquipmentCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import img1 from '../assets/image/b5.webp'
export default function Equipment() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/equipment")
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader image={img1} eyebrow="Our Fleet" title="Inspection Equipment" breadcrumb={[{ label: "Equipment" }]} />
      <section className="py-16 bg-background">
        <div className="container-page">
          {loading ? (
            <Loader />
          ) : items.length === 0 ? (
            <EmptyState title="No equipment published yet" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((e) => (
                <EquipmentCard key={e._id} item={e} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
