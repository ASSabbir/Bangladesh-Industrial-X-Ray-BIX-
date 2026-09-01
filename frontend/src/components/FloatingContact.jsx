import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiMessageCircle, FiX, FiPhone, FiMail } from "react-icons/fi";

const WHATSAPP_NUMBER = "8801712519316"; // no + or spaces, per wa.me format
const PHONE_NUMBER = "+8801712519316";
const EMAIL = "faiz@bixndt.com";

const OPTIONS = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: FaWhatsapp,
    bg: "bg-[#25D366]",
  },
  {
    key: "phone",
    label: "Call Us",
    href: `tel:${PHONE_NUMBER}`,
    icon: FiPhone,
    bg: "bg-primary",
  },
  {
    key: "email",
    label: "Email Us",
    href: `mailto:${EMAIL}`,
    icon: FiMail,
    bg: "bg-accent",
  },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[60] flex flex-col items-end gap-3">
      {/* Expanded options */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {OPTIONS.map(({ key, label, href, icon: Icon, bg }) => (
          <a
            key={key}
            href={href}
            target={key === "whatsapp" ? "_blank" : undefined}
            rel={key === "whatsapp" ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 group"
          >
            <span className="bg-white text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {label}
            </span>
            <span className={`w-11 h-11 rounded-full ${bg} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200`}>
              <Icon size={20} />
            </span>
          </a>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" />
        )}
        <span
          className={`relative w-full h-full rounded-full flex items-center justify-center text-white shadow-xl transition-colors duration-300 ${
            open ? "bg-primary" : "bg-[#25D366]"
          }`}
        >
          {open ? <FiX size={26} /> : <FiMessageCircle size={26} />}
        </span>
      </button>
    </div>
  );
}