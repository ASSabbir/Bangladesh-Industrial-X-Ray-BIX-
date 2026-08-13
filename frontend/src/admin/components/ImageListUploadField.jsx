import { useRef, useState } from "react";
import { uploadImages } from "../../api/uploadImage";
import PageImage from "../../components/PageImage";

// Simple multi-image upload: click the button -> OS file picker opens
// (multi-select allowed) -> pick images -> they upload automatically ->
// thumbnails appear, each removable. `value` is an array of image URLs.
export default function ImageListUploadField({ field, value, onChange }) {
  const { name, label } = field;
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const images = Array.isArray(value) ? value : [];

  const handleFilesSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (files.length === 0) return;

    const oversized = files.find((f) => f.size > 5 * 1024 * 1024);
    if (oversized) {
      setError(`"${oversized.name}" is larger than 5MB.`);
      return;
    }

    setError("");
    setUploading(true);
    try {
      const urls = await uploadImages(files);
      onChange(name, [...images, ...urls]);
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index) => onChange(name, images.filter((_, i) => i !== index));

  return (
    <div>
      <label className="form-label">{label}</label>

      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mb-3">
          {images.map((url, i) => (
            <div key={i} className="relative group">
              <PageImage src={url} label={`Image ${i + 1}`} className="w-full h-20 rounded-md object-cover border border-black/10" />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="btn-outline-dark text-sm py-2 px-4 disabled:opacity-60"
      >
        {uploading ? "Uploading..." : "+ Upload Image(s)"}
      </button>

      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFilesSelect} />

      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}
