import ResourceManager from "./components/ResourceManager";

const config = {
  title: "Manage Gallery",
  endpoint: "/gallery",
  columns: [
    { key: "title", label: "Title" },
    { key: "projectName", label: "Project" },
  ],
  fields: [
    { name: "title", label: "Title", kind: "text", required: true, placeholder: "Radiographic Testing on Gas Pipeline" },
    { name: "image", label: "Gallery Image", kind: "image", required: true },
    { name: "description", label: "Description", kind: "textarea" },
    { name: "projectName", label: "Related Project Name", kind: "text" },
  ],
  emptyItem: { title: "", image: "", description: "", projectName: "", published: true },
};

export default function ManageGallery() {
  return <ResourceManager config={config} />;
}
