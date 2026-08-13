export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto mb-12" : "mb-12"}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="text-textmuted">{subtitle}</p>}
    </div>
  );
}
