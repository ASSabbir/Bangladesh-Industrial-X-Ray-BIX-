import { useRef, useState } from "react";

// A textarea that edits a list-like value (array of strings, or array of
// small objects like {title, description}) as free-typed multi-line text.
//
// The critical bit this fixes: the textarea's displayed value comes from
// LOCAL state that mirrors exactly what the user typed — never recomputed
// from the parsed array on every keystroke. Re-deriving the display from a
// filtered/trimmed array on each change is what silently ate blank lines
// (including the one Enter had just created), making Enter look broken.
// We still parse + report the structured array to the parent via onChange,
// but that parsed array only drives what gets saved, never what's shown.
export default function ArrayTextAreaField({ field, value, onChange, parseLine, serializeItem, rows = 4 }) {
  const { name, label, hint, placeholder } = field;

  const initialText = Array.isArray(value) ? value.map(serializeItem).join("\n") : value || "";
  const [text, setText] = useState(initialText);
  const skipNextSync = useRef(false);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText); // update what's on screen immediately, unaltered

    // Parse into the structured array the backend expects, but only for
    // saving — this never feeds back into what the textarea displays.
    const parsed = newText
      .split("\n")
      .filter((l) => l.trim() !== "")
      .map(parseLine);
    skipNextSync.current = true;
    onChange(name, parsed);
  };

  return (
    <div>
      <label className="form-label">
        {label} {hint && <span className="text-textmuted font-normal">({hint})</span>}
      </label>
      <textarea
        className="form-input"
        rows={rows}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}