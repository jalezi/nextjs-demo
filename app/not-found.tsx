import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-6xl font-bold text-gray-800">404</h2>
        <p className="text-2xl text-gray-600">Page Not Found</p>
        <p className="text-gray-500">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 mt-4"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
