import ResourceManager from "./components/ResourceManager";
import { CATEGORY_OPTIONS } from "../constants/categories";

const config = {
  title: "Manage Services",
  endpoint: "/services",
  columns: [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
  ],
  fields: [
    { name: "title", label: "Title", kind: "text", required: true, placeholder: "Radiography Testing (X-Ray & Gamma Ray)" },
    { name: "category", label: "Category", kind: "select", required: true, options: CATEGORY_OPTIONS },
    { name: "shortDescription", label: "Short Description", kind: "textarea", placeholder: "One or two sentence summary shown on cards." },
    { name: "introduction", label: "Introduction", kind: "textarea" },
    { name: "detailedDescription", label: "Detailed Description", kind: "textarea" },
    { name: "workingProcess", label: "Working Process Steps", kind: "steps" },
    { name: "features", label: "Why Choose This Service (Features)", kind: "list" },
    { name: "benefits", label: "Service Benefits", kind: "list" },
    { name: "image", label: "Card / Main Image", kind: "image" },
    { name: "relatedEquipment", label: "Related Equipment", kind: "equipmentPicker" },
  ],
  emptyItem: {
    title: "", category: "", shortDescription: "", introduction: "",
    detailedDescription: "", workingProcess: [], features: [], benefits: [], image: "",
    relatedEquipment: [], published: true,
  },
};

export default function ManageServices() {
  return <ResourceManager config={config} />;
}