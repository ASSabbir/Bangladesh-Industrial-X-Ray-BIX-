import { Link } from "react-router-dom";
import PageImage from "./PageImage";

export default function EquipmentCard({ item }) {
  return (
    <div className="card flex flex-col h-full">
      <PageImage src={item.image} alt={item.name} label={item.name} className="w-full h-40 object-cover" />
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-primary text-base mb-1">{item.name}</h3>
        <p className="text-textmuted text-xs mb-3">
          {item.manufacturer} {item.quantity ? `— ${item.quantity}` : ""}
        </p>
        <p className="text-textmuted text-sm mb-4 line-clamp-2 flex-1">{item.shortDescription}</p>
        <Link to={`/equipment/${item.slug}`} className="text-accent text-sm font-semibold hover:underline">
          View Details →
        </Link>
      </div>
    </div>
  );
}
