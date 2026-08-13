import ResourceManager from "./components/ResourceManager";

const config = {
  title: "Manage Previous Projects",
  endpoint: "/projects",
  columns: [
    { key: "projectName", label: "Project Name" },
    { key: "clientName", label: "Client" },
    { key: "yearOfExecution", label: "Year" },
  ],
  fields: [
    { name: "projectName", label: "Project Name", kind: "text", required: true },
    { name: "clientName", label: "Client Name", kind: "text" },
    { name: "contractorName", label: "Contractor Name", kind: "text" },
    { name: "location", label: "Location", kind: "text" },
    { name: "workCategory", label: "Work Category", kind: "text", placeholder: "Radiography by Using X-Ray Crawler & Gamma Ray" },
    { name: "yearOfExecution", label: "Year of Execution", kind: "text" },
    { name: "summary", label: "Summary", kind: "textarea" },
    { name: "images", label: "Project Images", kind: "imagelist" },
  ],
  emptyItem: {
    projectName: "", clientName: "", contractorName: "", location: "", workCategory: "",
    yearOfExecution: "", summary: "", images: [], published: true,
  },
};

export default function ManageProjects() {
  return <ResourceManager config={config} />;
}
