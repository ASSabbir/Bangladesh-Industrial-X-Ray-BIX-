import { Link } from "react-router-dom";
import PageImage from "./PageImage";

export default function ServiceCard({ service }) {
  return (
    <div className="card flex flex-col h-full">
      <PageImage src={service.image} alt={service.title} label={service.title} className="w-full h-44 object-cover" />
      <div className="p-6 flex flex-col flex-1">
        <p className="text-accent text-xs font-bold uppercase tracking-wide mb-1">{service.category}</p>
        <h3 className="font-semibold text-primary text-lg mb-2">{service.title}</h3>
        <p className="text-textmuted text-sm mb-4 line-clamp-3 flex-1">{service.shortDescription}</p>
        <Link to={`/services/${service.slug}`} className="text-accent text-sm font-semibold hover:underline">
          Learn More →
        </Link>
      </div>
    </div>
  );
}
