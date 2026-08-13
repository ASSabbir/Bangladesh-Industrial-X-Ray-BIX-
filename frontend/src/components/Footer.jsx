import { Link } from "react-router-dom";

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

export default function Footer() {
  return (
    <footer className="bg-primary text-textmain-inverse">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-white/70">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm border-2 border-accent">
              BIX
            </div>
          </div>
          <p className="text-sm leading-relaxed">
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
          <ul className="space-y-2 text-sm">
            <li>House # 12, Road # 2, Block – A, Section # 11, Mirpur, Dhaka-1216, Bangladesh</li>
            <li>
              <a href="mailto:faiz@bixndt.com" className="hover:text-accent">faiz@bixndt.com</a>
              {" / "}
              <a href="mailto:shuvo@bixndt.com" className="hover:text-accent">shuvo@bixndt.com</a>
            </li>
            <li>
              <a href="tel:+8801712519316" className="hover:text-accent">+880 1712 519 316</a>
              {" / "}
              <a href="tel:+8801963622600" className="hover:text-accent">+880 1963 622 600</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-3">
            {["F", "L", "Y", "W"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold hover:bg-accent hover:text-white transition-colors"
              >
                {s}
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
