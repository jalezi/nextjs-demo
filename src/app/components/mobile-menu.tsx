"use client";

import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import MobileMenuButton from "./mobile-menu-button";

interface NavigationLink {
  href: Route;
  label: string;
}

interface MobileMenuProps {
  links: NavigationLink[];
}

const MobileMenu = ({ links }: MobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <MobileMenuButton onToggle={setIsMenuOpen} isOpen={isMenuOpen} />

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white transition-colors"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
