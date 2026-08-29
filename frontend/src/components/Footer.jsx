import { Link } from "react-router-dom";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/image/logo.png";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/equipment", label: "Equipment" },
  { to: "/certifications", label: "Certifications" },
  { to: "/gallery", label: "Gallery" },
  { to: "/previous-projects", label: "Previous Projects" },
  { to: "/training", label: "Training" },
  { to: "/partners", label: "Partners" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

const SOCIALS = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaWhatsapp, href: "#", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white/70">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1.2fr_1fr] gap-10">
        <div>
          <Link to="/" className="inline-block bg-white p-3 rounded-lg mb-5">
            <img src={logo} alt="BIX" className="w-28 sm:w-32" />
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            An ISO/IEC 17025:2017 BAB Accredited NDT company — An Ideal Home of NDT since 1995.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-accent transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FiMapPin className="shrink-0 mt-0.5 text-accent" size={16} />
              <span>House # 12, Road # 2, Block – A, Section # 11, Mirpur, Dhaka-1216, Bangladesh</span>
            </li>
            <li className="flex items-start gap-3">
              <FiMail className="shrink-0 mt-0.5 text-accent" size={16} />
              <a href="mailto:faiz@bixndt.com" className="hover:text-accent">faiz@bixndt.com</a>
            </li>
            <li className="flex items-start gap-3">
              <FiMail className="shrink-0 mt-0.5 text-accent" size={16} />
              <a href="mailto:shuvo@bixndt.com" className="hover:text-accent">shuvo@bixndt.com</a>
            </li>
            <li className="flex items-start gap-3">
              <FiPhone className="shrink-0 mt-0.5 text-accent" size={16} />
              <a href="tel:+8801712519316" className="hover:text-accent">+880 1712 519 316</a>
            </li>
            <li className="flex items-start gap-3">
              <FiPhone className="shrink-0 mt-0.5 text-accent" size={16} />
              <a href="tel:+8801963622600" className="hover:text-accent">+880 1963 622 600</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Bangladesh Industrial X-Ray. All rights reserved.
      </div>
    </footer>
  );
}