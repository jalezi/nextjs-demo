import type { Route } from "next";
import Link from "next/link";
import DropdownMenu from "./dropdown-menu";
import MobileMenu from "./mobile-menu";

// Navigation organization
const primaryLinks = [
  { href: "/" as Route, label: "Home" },
  { href: "/static" as Route, label: "Static" },
  { href: "/dynamic" as Route, label: "Dynamic" },
  { href: "/isr" as Route, label: "ISR" },
];

const featuresLinks = [
  { href: "/ssg/1" as Route, label: "SSG Params" },
  { href: "/posts" as Route, label: "Posts" },
  { href: "/parallel" as Route, label: "Parallel" },
  { href: "/photos" as Route, label: "Photos" },
];

const advancedLinks = [
  { href: "/server-actions" as Route, label: "Server Actions" },
  { href: "/api-routes" as Route, label: "API Routes" },
  { href: "/performance" as Route, label: "Performance" },
  { href: "/streaming" as Route, label: "Streaming" },
  { href: "/error-handling" as Route, label: "Error Handling" },
];

const allLinks = [...primaryLinks, ...featuresLinks, ...advancedLinks];

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-lg relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-xl font-bold hover:text-gray-300 transition-colors"
          >
            Next.js Demo
          </Link>

          {/* Mobile menu */}
          <MobileMenu links={allLinks} />

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-1">
            {/* Primary links */}
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Features dropdown */}
            <DropdownMenu title="Features" items={featuresLinks} />

            {/* Advanced dropdown */}
            <DropdownMenu title="Advanced" items={advancedLinks} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
