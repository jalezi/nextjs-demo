import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params before using its properties (Next.js 15+ requirement)
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    notFound();
  }

  const post = await res.json();

  // Simulate potential error for demo
  if (id === "999") {
    throw new Error("Post not accessible - This is a demo error!");
  }

  return (
    <div className="space-y-4">
      <Link href="/posts" className="text-blue-600 hover:underline text-sm">
        ← Back to posts
      </Link>

      <div>
        <span className="text-sm text-gray-500">Post #{id}</span>
        <h1 className="text-3xl font-bold mt-1">{post.title}</h1>
      </div>

      <div className="prose max-w-none">
        <p className="text-lg">{post.body}</p>
      </div>

      <div className="border-t pt-4 text-sm text-gray-500">
        <p>User ID: {post.userId}</p>
        <p>Post ID: {id}</p>
      </div>

      <div className="bg-blue-50 p-4 rounded text-sm">
        <p className="font-semibold mb-2">Demo features on this page:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>ISR with 60-second revalidation</li>
          <li>Custom loading state (see when navigating from posts list)</li>
          <li>Error boundary (try visiting /posts/999)</li>
          <li>Not-found page (try /posts/12345)</li>
        </ul>
      </div>
    </div>
  );
}
