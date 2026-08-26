import ImageUploadField from "./ImageUploadField";
import ImageListUploadField from "./ImageListUploadField";
import ArrayTextAreaField from "./ArrayTextAreaField";
import RelatedEquipmentField from "./RelatedEquipmentField";

// Native HTML <input> types this form is allowed to render for plain fields.
// Kept as a strict whitelist so an unexpected string (e.g. "image") can never
// slip through as a raw input type — type="image" is a real HTML element
// that behaves as a graphical *submit* button, which caused an earlier bug.
const NATIVE_TEXT_TYPES = ["text", "email", "password", "number", "date", "url", "tel", "search"];

// Renders one form field based on a simple field-config object.
// `kind` selects the widget: image, imagelist, textarea, checkbox, list,
// steps, specs, select, equipmentPicker. No `kind` (or an unrecognized one)
// renders a plain text-like input, using `type` only as the native HTML
// input type (defaults to "text").
export default function FormField({ field, value, onChange }) {
  const { name, label, kind, type, placeholder, required, options } = field;
  const handle = (v) => onChange(name, v);

  switch (kind) {
    case "image":
      return <ImageUploadField field={field} value={value} onChange={onChange} />;

    case "imagelist":
      return <ImageListUploadField field={field} value={value} onChange={onChange} />;

    case "equipmentPicker":
      return <RelatedEquipmentField field={field} value={value} onChange={onChange} />;

    case "select":
      return (
        <div>
          <label className="form-label">{label}{required && <span className="text-accent"> *</span>}</label>
          <select
            className="form-input"
            required={required}
            value={value ?? ""}
            onChange={(e) => handle(e.target.value)}
          >
            <option value="" disabled>
              Select {label.toLowerCase()}...
            </option>
            {(options || []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );

    case "textarea":
      return (
        <div>
          <label className="form-label">{label}{required && <span className="text-accent"> *</span>}</label>
          <textarea
            className="form-input"
            rows={4}
            required={required}
            placeholder={placeholder}
            value={value || ""}
            onChange={(e) => handle(e.target.value)}
          />
        </div>
      );

    case "checkbox":
      return (
        <label className="flex items-center gap-2 text-sm text-primary">
          <input type="checkbox" checked={!!value} onChange={(e) => handle(e.target.checked)} className="rounded" />
          {label}
        </label>
      );

    case "list":
      // stored as array of strings; edited as newline-separated text
      return (
        <ArrayTextAreaField
          field={{ ...field, hint: "one per line" }}
          value={value}
          onChange={onChange}
          parseLine={(line) => line.trim()}
          serializeItem={(item) => item}
        />
      );

    case "steps":
      // stored as array of {title, description}; edited as "Title | Description" per line
      return (
        <ArrayTextAreaField
          field={{ ...field, hint: "one step per line: Title | Description" }}
          value={value}
          onChange={onChange}
          rows={5}
          parseLine={(line) => {
            const [title, ...rest] = line.split("|");
            return { title: (title || "").trim(), description: rest.join("|").trim() };
          }}
          serializeItem={(s) => `${s.title} | ${s.description}`}
        />
      );

    case "specs":
      // stored as array of {label, value}; edited as "Label: Value" per line
      return (
        <ArrayTextAreaField
          field={{ ...field, hint: "one per line: Label: Value" }}
          value={value}
          onChange={onChange}
          parseLine={(line) => {
            const [label, ...rest] = line.split(":");
            return { label: (label || "").trim(), value: rest.join(":").trim() };
          }}
          serializeItem={(s) => `${s.label}: ${s.value}`}
        />
      );

    default: {
      const safeType = NATIVE_TEXT_TYPES.includes(type) ? type : "text";
      return (
        <div>
          <label className="form-label">{label}{required && <span className="text-accent"> *</span>}</label>
          <input
            type={safeType}
            className="form-input"
            required={required}
            placeholder={placeholder}
            value={value ?? ""}
            onChange={(e) => handle(e.target.value)}
          />
        </div>
      );
    }
  }
}