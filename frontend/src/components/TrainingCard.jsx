import { Link } from "react-router-dom";
import PageImage from "./PageImage";

export default function TrainingCard({ item }) {
  return (
    <Link
      to={`/training/${item._id}`}
      className="card shadow-none hover:shadow-none flex flex-col h-full group hover:-translate-y-0.5 transition-all duration-200"
    >
      <PageImage
        src={item.image}
        alt={item.title}
        label={item.title}
        className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold text-primary text-lg mb-2 group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <p className="text-textmuted text-sm mb-4 line-clamp-3 flex-1">{item.courseDescription}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-textmuted mb-2">
          {item.duration && <span><strong className="text-primary/80">Duration:</strong> {item.duration}</span>}
        </div>
        <p className="text-xs text-textmuted mb-3">{item.schedule}</p>
        <span className="text-accent text-sm font-semibold">View Details →</span>
      </div>
    </Link>
  );
}