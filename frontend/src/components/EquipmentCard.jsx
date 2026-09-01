import { Link } from "react-router-dom";
import PageImage from "./PageImage";

export default function EquipmentCard({ item }) {
  return (
    <Link to={`/equipment/${item.slug}`} className="card shadow-none hover:shadow-none flex flex-col h-full group">
      <div className="w-full h-56 sm:h-64 overflow-hidden">
        <PageImage
          src={item.image}
          alt={item.name}
          label={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-primary text-base mb-1 group-hover:text-accent transition-colors">{item.name}</h3>
        <p className="text-textmuted text-xs mb-3">
          {item.manufacturer} {item.quantity ? `— ${item.quantity}` : ""}
        </p>
        <p className="text-textmuted text-sm mb-4 line-clamp-2 flex-1">{item.shortDescription}</p>
        <span className="text-accent text-sm font-semibold">View Details →</span>
      </div>
    </Link>
  );
}