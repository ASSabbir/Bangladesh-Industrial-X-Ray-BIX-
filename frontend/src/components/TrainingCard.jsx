import PageImage from "./PageImage";

export default function TrainingCard({ item }) {
  return (
    <div className="card flex flex-col h-full">
      <PageImage src={item.image} alt={item.title} label={item.title} className="w-full h-40 object-cover" />
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold text-primary text-lg mb-2">{item.title}</h3>
        <p className="text-textmuted text-sm mb-4 line-clamp-3 flex-1">{item.courseDescription}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-textmuted mb-2">
          {item.duration && <span><strong className="text-primary/80">Duration:</strong> {item.duration}</span>}
        </div>
        <p className="text-xs text-textmuted">{item.schedule}</p>
      </div>
    </div>
  );
}
