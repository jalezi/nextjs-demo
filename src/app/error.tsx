"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-lg">
        <h2 className="text-3xl font-bold text-red-600">Application Error</h2>
        <p className="text-gray-600">{error.message}</p>
        {error.digest && (
          <p className="text-sm text-gray-500">Error ID: {error.digest}</p>
        )}
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={reset}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
