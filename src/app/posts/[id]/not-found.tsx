import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center space-y-4 py-12">
      <h2 className="text-4xl font-bold text-gray-800">404</h2>
      <p className="text-xl text-gray-600">Post not found</p>
      <p className="text-gray-500">
        The post you're looking for doesn't exist.
      </p>
      <Link
        href="/posts"
        className="inline-block text-blue-500 hover:underline"
      >
        Back to posts →
      </Link>
      <div className="text-sm text-gray-500 mt-8">
        <p>This is a custom not-found page for the posts/[id] route.</p>
      </div>
    </div>
  );
}
