import Image from "next/image";
import { notFound } from "next/navigation";
import { CloseButton } from "./close-button";
import { KeyboardNavigation } from "./keyboard-navigation";
import { ModalBackdrop } from "./modal-backdrop";

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

type Props = PageProps<"/photos/[id]">;

export default async function PhotoModal({ params }: Props) {
  const { id } = await params;
  const photo = photos.find((p) => p.id === parseInt(id, 10));

  if (!photo) {
    notFound();
  }

  const photoIndex = photos.findIndex((p) => p.id === photo.id);

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-title"
      aria-describedby="photo-description"
    >
      {/* Keyboard navigation handler (ESC only) */}
      <KeyboardNavigation />

      {/* Backdrop - Modal background to close */}
      <ModalBackdrop />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl max-h-full overflow-hidden">
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
              Photo {photoIndex + 1} of {photos.length}
            </p>
          </div>

          {/* Close button */}
          <div className="ml-4">
            <CloseButton
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
            </CloseButton>
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
              <span>ESC to close</span>
              <span>Click outside to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
