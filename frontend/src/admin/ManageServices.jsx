import ResourceManager from "./components/ResourceManager";

const config = {
  title: "Manage Services",
  endpoint: "/services",
  columns: [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
  ],
  fields: [
    { name: "title", label: "Title", kind: "text", required: true, placeholder: "Radiography Testing (X-Ray & Gamma Ray)" },
    { name: "category", label: "Category", kind: "text", placeholder: "Non-Destructive Testing" },
    { name: "shortDescription", label: "Short Description", kind: "textarea", placeholder: "One or two sentence summary shown on cards." },
    { name: "introduction", label: "Introduction", kind: "textarea" },
    { name: "detailedDescription", label: "Detailed Description", kind: "textarea" },
    { name: "workingProcess", label: "Working Process Steps", kind: "steps" },
    { name: "features", label: "Why Choose This Service (Features)", kind: "list" },
    { name: "benefits", label: "Service Benefits", kind: "list" },
    { name: "image", label: "Card Image", kind: "image" },
    { name: "bannerImage", label: "Banner Image", kind: "image" },
  ],
  emptyItem: {
    title: "", category: "Non-Destructive Testing", shortDescription: "", introduction: "",
    detailedDescription: "", workingProcess: [], features: [], benefits: [], image: "", bannerImage: "", published: true,
  },
};

export default function ManageServices() {
  return <ResourceManager config={config} />;
}
