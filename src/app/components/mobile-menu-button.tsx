"use client";

interface MobileMenuButtonProps {
  onToggle: (isOpen: boolean) => void;
  isOpen: boolean;
}

const MobileMenuButton = ({ onToggle, isOpen }: MobileMenuButtonProps) => {
  const handleToggle = () => {
    onToggle(!isOpen);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
      aria-expanded={isOpen}
      aria-label="Toggle navigation menu"
    >
      <span className="sr-only">Open main menu</span>
      {/* Hamburger icon */}
      <svg
        className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <title>Menu</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      {/* Close icon */}
      <svg
        className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <title>Close</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default MobileMenuButton;
