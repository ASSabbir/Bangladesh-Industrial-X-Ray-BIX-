import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiMessageCircle, FiX, FiPhone, FiMail, FiChevronLeft } from "react-icons/fi";

const CONTACTS = [
  { key: "ceo", label: "Contact With CEO", phone: "8801712519316", tel: "+8801712519316", email: "faiz@bixndt.com" },
  { key: "manager", label: "Contact With Manager", phone: "8801963622600", tel: "+8801963622600", email: "shuvo@bixndt.com" },
];

const CHANNELS = [
  { key: "whatsapp", label: "WhatsApp", icon: FaWhatsapp, bg: "bg-[#25D366]", build: (c) => `https://wa.me/${c.phone}`, target: "_blank" },
  { key: "phone", label: "Call", icon: FiPhone, bg: "bg-primary", build: (c) => `tel:${c.tel}` },
  { key: "email", label: "Email", icon: FiMail, bg: "bg-accent", build: (c) => `mailto:${c.email}` },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState(null); // which channel's contact list is showing

  const toggleMain = () => {
    setChannel(null);
    setOpen((v) => !v);
  };

  const closeAll = () => {
    setOpen(false);
    setChannel(null);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[60] flex flex-col items-end gap-3">
      {/* Level 2: contact picker for the chosen channel */}
      {open && channel && (
        <div className="flex flex-col items-end gap-2 mb-1">
          <div className="bg-white rounded-xl shadow-xl border border-black/5 overflow-hidden w-56">
            <button
              onClick={() => setChannel(null)}
              className="w-full flex items-center gap-2 px-4 py-3 text-xs font-semibold text-textmuted hover:bg-background border-b border-black/5"
            >
              <FiChevronLeft size={14} /> Back
            </button>
            {CONTACTS.map((c) => {
              const ch = CHANNELS.find((x) => x.key === channel);
              return (
                <a
                  key={c.key}
                  href={ch.build(c)}
                  target={ch.target}
                  rel={ch.target ? "noopener noreferrer" : undefined}
                  onClick={closeAll}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-primary hover:bg-background transition-colors"
                >
                  <span className={`w-8 h-8 rounded-full ${ch.bg} text-white flex items-center justify-center shrink-0`}>
                    <ch.icon size={14} />
                  </span>
                  {c.label}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Level 1: channel picker */}
      {open && !channel && (
        <div className="flex flex-col items-end gap-3">
          {CHANNELS.map(({ key, label, icon: Icon, bg }) => (
            <button key={key} onClick={() => setChannel(key)} className="flex items-center gap-3 group">
              <span className="bg-white text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {label}
              </span>
              <span className={`w-11 h-11 rounded-full ${bg} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200`}>
                <Icon size={20} />
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={toggleMain}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" />}
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