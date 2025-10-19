"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

// Photo data that matches the gallery
const photos = [
  {
    id: 1,
    title: "Mountain Landscape",
    url: "https://picsum.photos/seed/mountain/800/600",
    desc: "A breathtaking view of mountain peaks",
  },
  {
    id: 2,
    title: "Ocean Sunset",
    url: "https://picsum.photos/seed/ocean/800/600",
    desc: "Golden hour by the sea",
  },
  {
    id: 3,
    title: "Forest Path",
    url: "https://picsum.photos/seed/forest/800/600",
    desc: "A winding trail through the woods",
  },
  {
    id: 4,
    title: "Desert Dunes",
    url: "https://picsum.photos/seed/desert/800/600",
    desc: "Endless sand formations",
  },
  {
    id: 5,
    title: "City Lights",
    url: "https://picsum.photos/seed/city/800/600",
    desc: "Urban landscape at night",
  },
  {
    id: 6,
    title: "Snowy Peaks",
    url: "https://picsum.photos/seed/snow/800/600",
    desc: "Winter wonderland vista",
  },
];

export default function PhotoModal() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isVisible, setIsVisible] = React.useState(false);
  const photo = photos.find((p) => p.id === parseInt(id, 10));

  React.useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  // Handle ESC key to close modal
  const handleClose = React.useCallback(() => {
    console.log("Closing modal");
    setIsVisible(false);
    // Wait for animation before navigating
    setTimeout(() => router.back(), 200);
  }, [router]);

  // Navigation between photos
  const navigateToPhoto = React.useCallback(
    (direction: "prev" | "next") => {
      if (!photo) return;

      const currentIndex = photos.findIndex((p) => p.id === photo.id);
      const totalPhotos = photos.length;

      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % totalPhotos
          : (currentIndex - 1 + totalPhotos) % totalPhotos;

      router.push(`/photos/${photos[newIndex].id}`);
    },
    [photo, router],
  );

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateToPhoto("prev");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateToPhoto("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, navigateToPhoto]);

  if (!photo) {
    console.log("Photo not found for id:", id);
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Photo not found
          </h2>
          <p className="mb-4">Photo with ID "{id}" could not be found.</p>
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  console.log("Rendering modal for photo:", photo.title);

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-title"
      aria-describedby="photo-description"
    >
      {/* Backdrop - click to close */}
      <button
        type="button"
        className="absolute inset-0 bg-transparent"
        onClick={handleClose}
        aria-label="Close modal"
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-lg shadow-2xl max-w-4xl max-h-full overflow-hidden transform transition-all duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1">
            <h2
              id="photo-title"
              className="text-xl font-semibold text-gray-900"
            >
              {photo.title}
            </h2>
            <p className="text-sm text-gray-600">
              Photo {photos.findIndex((p) => p.id === photo.id) + 1} of{" "}
              {photos.length}
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center space-x-2 ml-4">
            <button
              type="button"
              onClick={() => navigateToPhoto("prev")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Previous photo"
              title="Previous photo (←)"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => navigateToPhoto("next")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Next photo"
              title="Next photo (→)"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close modal"
              title="Close modal (Esc)"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative max-h-[70vh] overflow-hidden bg-gray-50">
          <Image
            src={photo.url}
            alt={photo.title}
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />

          {/* Image overlay navigation areas */}
          <button
            type="button"
            onClick={() => navigateToPhoto("prev")}
            className="absolute left-0 top-0 w-1/3 h-full bg-transparent hover:bg-black/10 transition-colors flex items-center justify-start pl-4"
            aria-label="Previous photo"
          >
            <div className="opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded-full p-2">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigateToPhoto("next")}
            className="absolute right-0 top-0 w-1/3 h-full bg-transparent hover:bg-black/10 transition-colors flex items-center justify-end pr-4"
            aria-label="Next photo"
          >
            <div className="opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded-full p-2">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <p id="photo-description" className="text-gray-700 mb-3">
            {photo.desc}
          </p>

          {/* Photo info and actions */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Intercepting Route Modal</span>

            <div className="flex items-center space-x-4">
              <span>Use ← → arrows to navigate</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
