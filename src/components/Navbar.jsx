import React, { useState } from "react";
import { navLinks } from "@/constants/index.js";
import { Menu, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { NavLink, useLocation } from "react-router";
import AuthButtonGroup from "./AuthButtonGroup";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Ganti warna background jika di path "/"
  const headerBg = location.pathname === "/" ? "bg-pr-blue-50" : "bg-white";

  return (
    <header className={headerBg}>
      <div className="flex items-center justify-between p-4 px-4 lg:p-3 lg:px-16">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden gap-x-12 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={() => {
                // Custom active: aktif jika path sekarang diawali dengan link.path
                const active =
                  link.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.path);
                return `line-clamp-1 text-lg ${
                  active
                    ? "text-pr-blue-800 font-bold"
                    : "text-neutral-dark-grey hover:text-pr-blue-800 font-medium"
                }`;
              }}
              end={link.path === "/"}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden items-center space-x-4 lg:flex">
          <AuthButtonGroup />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-neutral-dark-grey hover:text-pr-blue-800 flex items-center justify-center rounded-md p-2 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 cursor-pointer" />
          ) : (
            <Menu className="h-6 w-6 cursor-pointer" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="bg-white shadow-sm lg:hidden">
          <ul className="flex flex-col items-center gap-y-4 p-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={() =>
                    // Custom active: aktif jika path sekarang diawali dengan link.path
                    `line-clamp-1 text-lg ${
                      link.path === "/"
                        ? location.pathname === "/"
                          ? "text-pr-blue-800 font-bold"
                          : "text-neutral-dark-grey hover:text-pr-blue-800 font-medium"
                        : location.pathname.startsWith(link.path)
                          ? "text-pr-blue-800 font-bold"
                          : "text-neutral-dark-grey hover:text-pr-blue-800 font-medium"
                    }`
                  }
                  end
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <div className="mt-4 flex flex-col items-center gap-y-2">
              <AuthButtonGroup
                buttonClass="w-full"
              />
            </div>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
