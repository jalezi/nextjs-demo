"use client";

import { useRouter } from "next/navigation";

export function ModalBackdrop() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <button
      type="button"
      className="absolute inset-0 bg-transparent"
      onClick={handleClose}
      aria-label="Close modal"
    />
  );
}
