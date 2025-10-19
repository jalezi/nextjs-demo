"use client";

import Link from "next/link";

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-4 text-center py-12">
      <h2 className="text-2xl font-bold text-red-600">Error Loading Post</h2>
      <p className="text-gray-600">{error.message}</p>
      <div className="flex gap-2 justify-center">
        <button
          type="button"
          onClick={reset}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try again
        </button>
        <Link
          href="/posts"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to posts
        </Link>
      </div>
      <div className="text-sm text-gray-500 mt-8">
        <p>
          This error boundary caught the error and displayed this custom UI.
        </p>
      </div>
    </div>
  );
}
