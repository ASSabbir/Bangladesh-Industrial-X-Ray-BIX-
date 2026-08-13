export default function EmptyState({ title = "Nothing here yet", message = "Please check back soon." }) {
  return (
    <div className="text-center py-20">
      <h3 className="text-lg font-semibold text-primary mb-1">{title}</h3>
      <p className="text-textmuted text-sm">{message}</p>
    </div>
  );
}
