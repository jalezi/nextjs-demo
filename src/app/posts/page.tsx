import Link from "next/link";
import { NextJSInfo } from "../components/nextjs-info";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const revalidate = 30;

export default async function PostsPage() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
  );
  const posts: Post[] = await res.json();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Posts (ISR)</h1>
      <p className="text-gray-600">Revalidates every 30 seconds</p>

      <div className="grid gap-4">
        {posts.map((post: Post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="border p-4 rounded hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold text-lg">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {post.body.substring(0, 100)}...
            </p>
            <p className="text-xs text-gray-400 mt-2">Post ID: {post.id}</p>
          </Link>
        ))}
      </div>

      <div className="bg-yellow-50 p-4 rounded text-sm mt-6">
        <p className="font-semibold mb-2">Try these:</p>
        <ul className="space-y-1">
          <li>• Click any post to view details (with loading state)</li>
          <li>
            • Visit{" "}
            <Link href="/posts/999" className="text-blue-600 hover:underline">
              /posts/999
            </Link>{" "}
            to trigger error boundary
          </li>
          <li>
            • Visit{" "}
            <Link href="/posts/12345" className="text-blue-600 hover:underline">
              /posts/12345
            </Link>{" "}
            to see not-found page
          </li>
        </ul>
      </div>

      <NextJSInfo renderingMode="ISR">
        <p>
          <strong>ISR Note:</strong> This posts listing uses{" "}
          <code>export const revalidate = 30</code> for faster updates than the
          main ISR demo. Each individual post page also uses ISR with its own
          revalidation strategy.
        </p>
      </NextJSInfo>
    </div>
  );
}
