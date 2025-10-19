import Image from "next/image";
import Link from "next/link";

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

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = photos.find((p) => p.id === parseInt(id, 10));

  if (!photo) {
    return <div>Photo not found</div>;
  }

  return (
    <div className="space-y-4">
      <Link href="/photos" className="text-blue-600 hover:underline text-sm">
        ← Back to gallery
      </Link>

      <h1 className="text-3xl font-bold">{photo.title}</h1>
      <p className="text-gray-600">
        Full page view (accessed directly or via refresh)
      </p>

      <Image
        src={photo.url}
        alt={photo.title}
        width={800}
        height={600}
        className="w-full max-w-3xl rounded shadow-lg"
      />

      <p className="text-lg">{photo.desc}</p>

      <div className="bg-blue-50 p-4 rounded text-sm">
        <p className="font-semibold mb-2">
          You're seeing the full page because:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>You accessed this URL directly, OR</li>
          <li>You refreshed the page while viewing the modal</li>
        </ul>
        <p className="mt-2">
          Navigate from the gallery to see the modal version (intercepting
          route).
        </p>
      </div>
    </div>
  );
}
