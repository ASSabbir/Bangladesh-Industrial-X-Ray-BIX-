import ResourceManager from "./components/ResourceManager";
import { CATEGORY_OPTIONS } from "../constants/categories";

const config = {
  title: "Manage Gallery",
  endpoint: "/gallery",
  columns: [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
  ],
  fields: [
    { name: "title", label: "Title", kind: "text", required: true, placeholder: "Radiographic Testing on Gas Pipeline" },
    { name: "category", label: "Category", kind: "select", required: true, options: CATEGORY_OPTIONS },
    { name: "image", label: "Gallery Image", kind: "image", required: true },
    { name: "description", label: "Description", kind: "textarea" },
    { name: "projectName", label: "Related Project Name", kind: "text" },
  ],
  emptyItem: { title: "", category: "", image: "", description: "", projectName: "", published: true },
};

export default function ManageGallery() {
  return <ResourceManager config={config} />;
}