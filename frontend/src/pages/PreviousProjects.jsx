import { useEffect, useState } from "react";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function PreviousProjects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader eyebrow="Our Track Record" title="Previous Projects" breadcrumb={[{ label: "Previous Projects" }]} />
      <section className="py-16 bg-background">
        <div className="container-page">
          {loading ? (
            <Loader />
          ) : items.length === 0 ? (
            <EmptyState title="No projects published yet" />
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {items.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
