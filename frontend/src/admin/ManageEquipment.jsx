import ResourceManager from "./components/ResourceManager";
import { CATEGORY_OPTIONS } from "../constants/categories";

const config = {
  title: "Manage Equipment",
  endpoint: "/equipment",
  columns: [
    { key: "name", label: "Name" },
    { key: "manufacturer", label: "Manufacturer" },
    { key: "category", label: "Category" },
  ],
  fields: [
    { name: "name", label: "Name", kind: "text", required: true, placeholder: "X-Ray Machine — XXG-3505 (350KV)" },
    { name: "category", label: "Category", kind: "select", required: true, options: CATEGORY_OPTIONS },
    { name: "manufacturer", label: "Manufacturer", kind: "text" },
    { name: "model", label: "Model", kind: "text" },
    { name: "quantity", label: "Quantity", kind: "text", placeholder: "05 Sets" },
    { name: "shortDescription", label: "Short Description", kind: "textarea" },
    { name: "description", label: "Full Description", kind: "textarea" },
    { name: "specifications", label: "Specifications", kind: "specs" },
    { name: "features", label: "Features", kind: "list" },
    { name: "image", label: "Equipment Image", kind: "image" },
  ],
  emptyItem: {
    name: "", category: "", manufacturer: "", model: "", quantity: "", shortDescription: "",
    description: "", specifications: [], features: [], image: "", published: true,
  },
};

export default function ManageEquipment() {
  return <ResourceManager config={config} />;
}