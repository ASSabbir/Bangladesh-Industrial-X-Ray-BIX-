import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/image/logo.png";
import badge35 from "../assets/image/30year.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/equipment", label: "Equipment" },
  { to: "/certifications", label: "Certifications" },
  { to: "/gallery", label: "Gallery" },
  { to: "/previous-projects", label: "Previous Projects" },
  { to: "/training", label: "Training" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 flex justify-center duration-200 bg-white ${scrolled ? "shadow-lg" : ""}`}>
      <nav className={`container-page max-w-[1400px] w-full grid grid-cols-[auto_1fr_auto] items-center gap-4 transition-all duration-200 ${scrolled ? "py-2.5" : "py-4"}`}>
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} className={`transition-all duration-200 ${scrolled ? "w-16" : "w-24"}`} alt="BIX" />
        </Link>

        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `group relative text-sm 2xl:text-base font-medium whitespace-nowrap transition-colors ${
                  isActive ? "text-accent" : "text-primary/80 hover:text-accent"
                } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-red-500 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center justify-end shrink-0">
          <img src={badge35} className={`transition-all duration-200 ${scrolled ? "w-12" : "w-22"}`} alt="35 Years of Experience" />
        </div>

        <button
          className="lg:hidden p-2 text-primary justify-self-end col-start-3"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-black/5 px-4 pb-4 shadow-lg">
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group relative py-2 px-2 rounded text-sm font-medium ${
                    isActive ? "text-accent bg-accent/5" : "text-primary/80"
                  } after:absolute after:left-2 after:right-2 after:bottom-1 after:h-[2px] after:bg-red-500 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}