import { Link } from "react-router-dom";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import PageImage from "./PageImage";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/previous-projects/${project._id}`}
      className="card flex flex-col h-full group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative overflow-hidden">
        <PageImage
          src={project.images?.[0]}
          alt={project.projectName}
          label={project.projectName}
          className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {project.yearOfExecution && (
          <span className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {project.yearOfExecution}
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {project.workCategory && (
          <span className="text-accent text-[11px] sm:text-xs font-bold uppercase tracking-wide mb-2">
            {project.workCategory}
          </span>
        )}

        <h3 className="font-semibold text-primary text-base sm:text-lg leading-snug mb-2 group-hover:text-accent transition-colors">
          {project.projectName}
        </h3>

        <p className="text-textmuted text-sm mb-4 line-clamp-2 flex-1">{project.summary}</p>

        <div className="flex items-center justify-between pt-3 border-t border-black/5">
          <div className="flex items-center gap-2 min-w-0">
            {project.contractorLogo && (
              <img
                src={resolveImageUrl(project.contractorLogo)}
                alt={project.contractorName}
                className="w-6 h-6 rounded-full object-cover shrink-0 bg-background"
              />
            )}
            <span className="text-xs text-textmuted truncate">{project.clientName}</span>
          </div>
          <span className="text-accent text-xs font-semibold shrink-0 ml-3">View Details →</span>
        </div>
      </div>
    </Link>
  );
}