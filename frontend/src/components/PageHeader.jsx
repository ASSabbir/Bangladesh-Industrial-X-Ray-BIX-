import { Link } from "react-router-dom";
import PageImage from "./PageImage";

export default function PageHeader({ eyebrow, title, breadcrumb, image }) {
  return (
    <div className="relative bg-primary text-white overflow-hidden">
      {image && (
        <PageImage src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
      )}
      <div className="container-page relative py-16">
        {eyebrow && <p className="section-eyebrow text-red-400">{eyebrow}</p>}
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {breadcrumb && (
          <div className="mt-4 text-sm text-white/60 flex gap-2 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link>
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                {b.to ? (
                  <Link to={b.to} className="hover:text-white">{b.label}</Link>
                ) : (
                  <span className="text-white">{b.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
