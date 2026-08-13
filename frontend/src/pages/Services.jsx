import { useEffect, useState } from "react";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import ServiceCard from "../components/ServiceCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/services")
      .then((res) => setServices(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader eyebrow="Non-Destructive Testing" title="Our Services" breadcrumb={[{ label: "Services" }]} />
      <section className="py-16 bg-background">
        <div className="container-page">
          {loading ? (
            <Loader />
          ) : services.length === 0 ? (
            <EmptyState title="No services published yet" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <ServiceCard key={s._id} service={s} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
