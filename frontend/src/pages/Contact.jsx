import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import api from "../api/axios";
import PageHeader from "../components/PageHeader";
import PageTransition from "../components/PageTransition";
import img1 from "../assets/image/5.webp";

const OFFICES = [
  {
    label: "Registered Office",
    address: "House #11, Road #2, Block-B, Section #10, Mirpur, Dhaka-1216, Bangladesh",
  },
  {
    label: "Head Office",
    address: "House #12, Road #2, Block-A, Section #11, Mirpur, Dhaka-1216, Bangladesh",
  },
  {
    label: "Warehouse",
    address: "Kaliakoir, Birulia, Savar, Bangladesh",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const contentRef = useRef(null);
  const moveX = useRef(null);
  const moveY = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const { data } = await api.post("/contact", form);
      setStatus({ state: "success", message: data.message });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({
        state: "error",
        message: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  // Soft mouse-parallax — content drifts a few px toward the cursor.
  useEffect(() => {
    if (!contentRef.current) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    moveX.current = gsap.quickTo(contentRef.current, "x", { duration: 0.8, ease: "power3.out" });
    moveY.current = gsap.quickTo(contentRef.current, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const relX = e.clientX / window.innerWidth - 0.5;
      const relY = e.clientY / window.innerHeight - 0.5;
      moveX.current(relX * 16);
      moveY.current(relY * 16);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <PageTransition>
      <div>
        <PageHeader image={img1} eyebrow="Get In Touch" title="Contact Us" breadcrumb={[{ label: "Contact" }]} />
        <section className="py-16 bg-background overflow-hidden">
          <div ref={contentRef} className="container-page grid grid-cols-1 lg:grid-cols-2 gap-10 will-change-transform">
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input required name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="Your name" />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} className="form-input" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="+880 ..." />
                </div>
                <div>
                  <label className="form-label">Message</label>
                  <textarea required rows={5} name="message" value={form.message} onChange={handleChange} className="form-input" placeholder="How can we help?" />
                </div>

                {status.state === "success" && (
                  <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">{status.message}</p>
                )}
                {status.state === "error" && (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">{status.message}</p>
                )}

                <button type="submit" disabled={status.state === "loading"} className="btn-primary w-full disabled:opacity-60">
                  {status.state === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Our Offices</h2>
              <div className="space-y-5">
                {OFFICES.map((office) => (
                  <div key={office.label} className="card p-5">
                    <p className="font-semibold text-primary text-sm mb-1">{office.label}</p>
                    <p className="text-sm text-textmuted mb-3">{office.address}</p>
                    <div className="rounded-md overflow-hidden border border-black/5 h-40 sm:h-48">
                      <iframe
                        title={office.label}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(office.address)}&output=embed`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                ))}

                <div className="card p-5">
                  <p className="font-semibold text-primary text-sm mb-1">Email & Phone</p>
                  <p className="text-sm text-textmuted">faiz@bixndt.com / shuvo@bixndt.com</p>
                  <p className="text-sm text-textmuted">+880 1712 519 316 / +880 1963 622 600</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}