import Image from "next/image";
import Link from "next/link";
import { NextJSInfo } from "../components/nextjs-info";

const photos = [
  {
    id: 1,
    title: "Mountain Landscape",
    url: "https://picsum.photos/seed/mountain/400/300",
  },
  {
    id: 2,
    title: "Ocean Sunset",
    url: "https://picsum.photos/seed/ocean/400/300",
  },
  {
    id: 3,
    title: "Forest Path",
    url: "https://picsum.photos/seed/forest/400/300",
  },
  {
    id: 4,
    title: "Desert Dunes",
    url: "https://picsum.photos/seed/desert/400/300",
  },
  {
    id: 5,
    title: "City Lights",
    url: "https://picsum.photos/seed/city/400/300",
  },
  {
    id: 6,
    title: "Snowy Peaks",
    url: "https://picsum.photos/seed/snow/400/300",
  },
];

export default function PhotosPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Photo Gallery</h1>
      <p className="text-gray-600">
        Click on a photo to see <strong>intercepting routes</strong> in action
        (opens as modal). Refresh on photo page to see the full page version.
      </p>

      <div className="bg-yellow-50 p-4 rounded text-sm">
        <p className="font-semibold mb-2">How it works:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Click a photo → Opens in modal (intercepting route)</li>
          <li>Refresh while on photo page → Shows full page</li>
          <li>Direct URL access → Shows full page</li>
          <li>Back button from modal → Returns to gallery</li>
        </ul>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/photos/${photo.id}`}
            className="border rounded overflow-hidden hover:shadow-lg transition group"
          >
            <Image
              src={photo.url}
              alt={photo.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover group-hover:scale-105 transition"
            />
            <p className="p-2 text-center font-semibold">{photo.title}</p>
          </Link>
        ))}
      </div>

      <NextJSInfo renderingMode="SSG">
        <p>
          <strong>Intercepting Routes Note:</strong> This page uses static
          generation for the gallery itself, but demonstrates advanced routing
          patterns. Modal overlays are handled via intercepting routes (
          <code>@modal/(.)[id]</code>) while maintaining proper URL structure.
        </p>
      </NextJSInfo>
    </div>
  );
}
