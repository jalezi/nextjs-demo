"use client";

import { useRouter } from "next/navigation";

export function CloseButton({
  children,
  className,
  "aria-label": ariaLabel,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  title?: string;
}) {
  const router = useRouter();

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  return (
    <button
      type="button"
      onClick={handleClose}
      className={className}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </button>
  );
}
