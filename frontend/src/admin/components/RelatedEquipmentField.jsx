import { useEffect, useState } from "react";
import api from "../../api/axios";

const MAX_SELECTABLE = 4;

// Lets the admin pick up to 4 pieces of equipment related to a service.
// `value` is an array of equipment _id strings; onChange(name, newArray)
// keeps it in sync. Equipment options are loaded from the backend once.
export default function RelatedEquipmentField({ field, value, onChange }) {
  const { name, label } = field;
  const selected = Array.isArray(value) ? value : [];
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/equipment?all=true")
      .then((res) => setEquipmentList(res.data.data))
      .catch(() => setError("Could not load equipment list."))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (equipmentId) => {
    const isSelected = selected.includes(equipmentId);
    if (isSelected) {
      onChange(name, selected.filter((id) => id !== equipmentId));
      return;
    }
    if (selected.length >= MAX_SELECTABLE) return; // silently ignore, checkbox is disabled anyway
    onChange(name, [...selected, equipmentId]);
  };

  return (
    <div>
      <label className="form-label">
        {label} <span className="text-textmuted font-normal">(choose up to {MAX_SELECTABLE})</span>
      </label>

      <div className="border border-black/10 rounded-md max-h-56 overflow-y-auto divide-y divide-black/5">
        {loading && <p className="text-sm text-textmuted p-3">Loading equipment...</p>}
        {error && <p className="text-sm text-red-600 p-3">{error}</p>}
        {!loading && !error && equipmentList.length === 0 && (
          <p className="text-sm text-textmuted p-3">No equipment found — add some under Manage Equipment first.</p>
        )}

        {!loading &&
          equipmentList.map((eq) => {
            const isChecked = selected.includes(eq._id);
            const isDisabled = !isChecked && selected.length >= MAX_SELECTABLE;
            return (
              <label
                key={eq._id}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer hover:bg-background/60 ${
                  isDisabled ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => toggle(eq._id)}
                  className="rounded"
                />
                <span className="text-primary font-medium">{eq.name}</span>
                {eq.manufacturer && <span className="text-textmuted text-xs">— {eq.manufacturer}</span>}
              </label>
            );
          })}
      </div>

      {selected.length >= MAX_SELECTABLE && (
        <p className="text-xs text-textmuted mt-1.5">Maximum of {MAX_SELECTABLE} selected — uncheck one to change your pick.</p>
      )}
    </div>
  );
}