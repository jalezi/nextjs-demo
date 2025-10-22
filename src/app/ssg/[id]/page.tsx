import Link from "next/link";
import { NextJSInfo } from "../../components/nextjs-info";

// Generate static pages for specific IDs at build time
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

type Props = PageProps<"/ssg/[id]">;

export default async function SSGPostPage({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">SSG with Dynamic Params</h1>
      <p className="text-gray-600">
        This page was pre-rendered at build time for IDs: 1, 2, 3
      </p>

      <div className="border p-4 rounded bg-purple-50">
        <span className="text-sm text-gray-500">Post #{id}</span>
        <h2 className="text-2xl font-semibold mt-1">{post.title}</h2>
        <p className="mt-4">{post.body}</p>
        <p className="text-sm text-gray-500 mt-4">User ID: {post.userId}</p>
      </div>

      <div className="bg-blue-50 p-4 rounded text-sm">
        <p className="font-semibold mb-2">Try these IDs:</p>
        <div className="flex gap-2">
          <Link href="/ssg/1" className="text-blue-600 hover:underline">
            ID 1
          </Link>
          <Link href="/ssg/2" className="text-blue-600 hover:underline">
            ID 2
          </Link>
          <Link href="/ssg/3" className="text-blue-600 hover:underline">
            ID 3
          </Link>
        </div>
        <p className="mt-2 text-gray-600">
          These pages are pre-rendered at build time using
          generateStaticParams()
        </p>
      </div>

      <NextJSInfo renderingMode="SSG">
        <p>
          <strong>SSG with Params Note:</strong> This demonstrates{" "}
          <code>generateStaticParams()</code> to pre-render specific dynamic
          routes at build time. Only pages for IDs 1, 2, and 3 are generated -
          other IDs will return 404.
        </p>
      </NextJSInfo>
    </div>
  );
}
