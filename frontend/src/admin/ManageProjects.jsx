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
    { name: "contractorLogo", label: "Contractor Logo", kind: "image" },
    { name: "location", label: "Location", kind: "text" },
    { name: "workCategory", label: "Work Category", kind: "text", placeholder: "Radiography by Using X-Ray Crawler & Gamma Ray" },
    { name: "yearOfExecution", label: "Year of Execution", kind: "text" },
    { name: "duration", label: "Project Duration", kind: "text", placeholder: "6 months" },
    { name: "summary", label: "Summary", kind: "textarea" },
    { name: "clientFeedback", label: "Client Feedback / Review", kind: "textarea", placeholder: "What the client said about this project..." },
    { name: "feedbackAuthor", label: "Feedback Given By", kind: "text", placeholder: "Engr. Name, Designation, Company" },
    { name: "images", label: "Project Images", kind: "imagelist" },
  ],
  emptyItem: {
    projectName: "", clientName: "", contractorName: "", contractorLogo: "", location: "", workCategory: "",
    yearOfExecution: "", duration: "", summary: "", clientFeedback: "", feedbackAuthor: "", images: [], published: true,
  },
};

export default function ManageProjects() {
  return <ResourceManager config={config} />;
}