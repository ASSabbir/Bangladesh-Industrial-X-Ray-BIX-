import PageImage from "./PageImage";

export default function ProjectCard({ project }) {
  return (
    <div className="card flex flex-col md:flex-row">
      <PageImage
        src={project.images?.[0]}
        alt={project.projectName}
        label={project.projectName}
        className="w-full md:w-56 h-40 md:h-auto object-cover shrink-0"
      />
      <div className="p-5 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wide text-accent">{project.workCategory}</span>
          {project.yearOfExecution && (
            <span className="text-xs text-textmuted bg-black/5 px-2 py-0.5 rounded-full">{project.yearOfExecution}</span>
          )}
        </div>
        <h3 className="font-semibold text-primary mb-1">{project.projectName}</h3>
        <p className="text-textmuted text-sm mb-2 line-clamp-2">{project.summary}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-textmuted">
          {project.clientName && <span><strong className="text-primary/80">Client:</strong> {project.clientName}</span>}
          {project.contractorName && <span><strong className="text-primary/80">Contractor:</strong> {project.contractorName}</span>}
          {project.location && <span><strong className="text-primary/80">Location:</strong> {project.location}</span>}
        </div>
      </div>
    </div>
  );
}
