import { useRef, useState } from "react";
import { uploadImage } from "../../api/uploadImage";
import PageImage from "../../components/PageImage";

// Simple single-image upload: click the button -> OS file picker opens ->
// pick an image -> it uploads automatically -> preview shows. `value` is the
// stored image URL (string). Calls onChange(name, newUrl) once uploaded.
export default function ImageUploadField({ field, value, onChange }) {
  const { name, label, required } = field;
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset so selecting the same file again still fires onChange
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(name, url);
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="form-label">{label}{required && <span className="text-accent"> *</span>}</label>

      <div className="flex items-center gap-4">
        {value ? (
          <PageImage src={value} label={label} className="w-20 h-20 rounded-md object-cover border border-black/10 shrink-0" />
        ) : (
          <div className="w-20 h-20 rounded-md border border-dashed border-black/20 flex items-center justify-center text-[10px] text-textmuted shrink-0 text-center px-1">
            No image
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="btn-outline-dark text-sm py-2 px-4 disabled:opacity-60"
          >
            {uploading ? "Uploading..." : value ? "Change Image" : "Upload Image"}
          </button>
          {value && !uploading && (
            <button
              type="button"
              onClick={() => onChange(name, "")}
              className="text-xs text-gray-400 hover:text-red-600 text-left"
            >
              Remove image
            </button>
          )}
        </div>
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />

      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}
