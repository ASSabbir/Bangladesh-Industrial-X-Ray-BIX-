import { useEffect, useState } from "react";
import api from "../../api/axios";
import FormField from "./FormField";
import Loader from "../../components/Loader";

// Generic CRUD manager. Config shape:
// {
//   title, endpoint, columns: [{key, label}], fields: [{name,label,type,required}],
//   emptyItem: {}
// }
export default function ResourceManager({ config }) {
  const { title, endpoint, columns, fields, emptyItem } = config;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${endpoint}?all=true`);
      setItems(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const openNew = () => setEditing({ ...emptyItem });
  const openEdit = (item) => setEditing({ ...item });
  const closeForm = () => {
    setEditing(null);
    setError("");
  };

  const handleFieldChange = (name, value) => setEditing((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...editing };
      delete payload._id;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.__v;
      delete payload.slug;

      if (editing._id) {
        await api.put(`${endpoint}/${editing._id}`, payload);
      } else {
        await api.post(endpoint, payload);
      }
      await load();
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save. Please check the form and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item[columns[0].key]}"? This cannot be undone.`)) return;
    try {
      await api.delete(`${endpoint}/${item._id}`);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <button onClick={openNew} className="btn-primary text-sm py-2 px-4">+ Add New</button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg border border-black/5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background text-textmuted text-left">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-semibold">{c.label}</th>
                ))}
                <th className="px-4 py-3 font-semibold">Published</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {items.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 2} className="px-4 py-8 text-center text-textmuted">
                    No records yet — click "Add New" to create one.
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-background/60">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-primary">
                      {String(item[c.key] ?? "").slice(0, 60)}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => openEdit(item)} className="text-accent font-semibold hover:underline">Edit</button>
                    <button onClick={() => handleDelete(item)} className="text-gray-400 font-semibold hover:text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg max-w-2xl w-full my-8 shadow-xl">
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <h2 className="font-bold text-primary text-lg">{editing._id ? "Edit" : "Add New"} {title.replace(/^Manage /, "")}</h2>
              <button type="button" onClick={closeForm} className="text-textmuted hover:text-primary">✕</button>
            </div>
            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">{error}</p>}
              {fields.map((f) => (
                <FormField key={f.name} field={f} value={editing[f.name]} onChange={handleFieldChange} />
              ))}
              <FormField field={{ name: "published", label: "Published (visible on the public site)", type: "checkbox" }} value={editing.published} onChange={handleFieldChange} />
            </div>
            <div className="p-6 border-t border-black/5 flex justify-end gap-3">
              <button type="button" onClick={closeForm} className="btn-outline-dark py-2 px-5">Cancel</button>
              <button type="submit" disabled={saving} className="btn-primary py-2 px-5 disabled:opacity-60">
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
