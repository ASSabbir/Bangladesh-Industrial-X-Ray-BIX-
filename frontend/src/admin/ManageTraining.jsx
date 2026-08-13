import ResourceManager from "./components/ResourceManager";

const config = {
  title: "Manage Training",
  endpoint: "/training",
  columns: [
    { key: "title", label: "Title" },
    { key: "duration", label: "Duration" },
  ],
  fields: [
    { name: "title", label: "Title", kind: "text", required: true, placeholder: "ASNT Level I & II Radiographic Testing (RT) Course" },
    { name: "courseDescription", label: "Course Description", kind: "textarea" },
    { name: "details", label: "Details", kind: "textarea" },
    { name: "duration", label: "Duration", kind: "text", placeholder: "10 Days" },
    { name: "schedule", label: "Schedule", kind: "textarea" },
    { name: "certificationInfo", label: "Certification Info", kind: "textarea" },
    { name: "contactInfo", label: "Contact Info", kind: "text" },
    { name: "image", label: "Training Image", kind: "image" },
  ],
  emptyItem: {
    title: "", courseDescription: "", details: "", duration: "", schedule: "",
    certificationInfo: "", contactInfo: "", image: "", published: true,
  },
};

export default function ManageTraining() {
  return <ResourceManager config={config} />;
}
