import { Link } from "react-router-dom";
import PageImage from "./PageImage";

export default function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.slug}`} className="card shadow-none hover:shadow-none flex flex-col h-full group">
      <div className="w-full h-56 sm:h-64 overflow-hidden">
        <PageImage
          src={service.image}
          alt={service.title}
          label={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-accent text-xs font-bold uppercase tracking-wide mb-1">{service.category}</p>
        <h3 className="font-semibold text-primary text-lg mb-2 group-hover:text-accent transition-colors">{service.title}</h3>
        <p className="text-textmuted text-sm mb-4 line-clamp-3 flex-1">{service.shortDescription}</p>
        <span className="text-accent text-sm font-semibold">Learn More →</span>
      </div>
    </Link>
  );
}