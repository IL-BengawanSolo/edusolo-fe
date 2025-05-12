import React from "react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/index.js";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between bg-white p-4 mx-16">
      {/* Logo */}
      <a href="/">
        <div className="flex items-center ml">
          <img
            src="/src/assets/images/logo.png"
            alt="Logo"
            className="h-16 w-16 rounded-full"
          />
          <h1 className="ml-6 text-2xl font-bold text-pr-blue-800">EduSolo</h1>
        </div>
      </a>

      {/* Logo */}
      <nav>
        <ul className="flex gap-x-12">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.path}
                className="text-lg font-medium text-neutral-dark-grey hover:text-pr-blue-800"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <Button size="custom">Login</Button>
        <Button size="custom" variant="lite">
          Register
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
