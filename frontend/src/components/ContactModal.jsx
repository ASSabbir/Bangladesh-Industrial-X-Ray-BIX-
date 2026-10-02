import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import api from "../api/axios";
import { useContactModal } from "../context/ContactModalContext";
import { BD_DISTRICTS, INDUSTRIES, TOPICS } from "../data/districts";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  jobTitle: "",
  district: "",
  industry: "",
  topic: "",
  message: "",
};

export default function ContactModal() {
  const { isOpen, closeContactModal } = useContactModal();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  // Lock body scroll while open, close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeContactModal();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeContactModal]);

  // Reset form a moment after it closes so it's fresh next open
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setForm(EMPTY_FORM);
      setStatus({ state: "idle", message: "" });
    }, 200);
    return () => clearTimeout(t);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const { data } = await api.post("/contact", form);
      setStatus({ state: "success", message: data.message || "Thanks! We'll be in touch soon." });
      setTimeout(closeContactModal, 1800);
    } catch (err) {
      setStatus({
        state: "error",
        message: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeContactModal();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-background shadow-2xl">
        <button
          onClick={closeContactModal}
          aria-label="Close"
          className="absolute top-4 right-4 text-primary/60 hover:text-primary transition-colors"
        >
          <FiX size={24} />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-primary mb-1">Contact Us</h2>
          <p className="text-sm text-textmuted mb-6">Please fill in all fields.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">First Name</label>
                <input required name="firstName" value={form.firstName} onChange={handleChange} className="form-input" placeholder="First Name" />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input required name="lastName" value={form.lastName} onChange={handleChange} className="form-input" placeholder="Last Name" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Email</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} className="form-input" placeholder="you@example.com" />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input required name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="+880 1XXX XXXXXX" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Company Name</label>
                <input required name="companyName" value={form.companyName} onChange={handleChange} className="form-input" placeholder="Company Name" />
              </div>
              <div>
                <label className="form-label">Job Title</label>
                <input required name="jobTitle" value={form.jobTitle} onChange={handleChange} className="form-input" placeholder="Job Title" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">District</label>
                <select required name="district" value={form.district} onChange={handleChange} className="form-input">
                  <option value="">Please select...</option>
                  {BD_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Industry</label>
                <select required name="industry" value={form.industry} onChange={handleChange} className="form-input">
                  <option value="">Please select...</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Topic</label>
              <select required name="topic" value={form.topic} onChange={handleChange} className="form-input">
                <option value="">Please select...</option>
                {TOPICS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Message</label>
              <textarea required rows={4} name="message" value={form.message} onChange={handleChange} className="form-input" placeholder="How can we help you?" />
            </div>

            {status.state === "success" && (
              <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">{status.message}</p>
            )}
            {status.state === "error" && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">{status.message}</p>
            )}

            <button type="submit" disabled={status.state === "loading"} className="btn-primary w-full disabled:opacity-60">
              {status.state === "loading" ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}