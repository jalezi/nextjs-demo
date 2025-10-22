import { NextJSInfo } from "../components/nextjs-info";

// This page is statically generated at build time
export default async function StaticPage() {
  // This fetch is cached by default
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const post = await res.json();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Static Page (SSG)</h1>
      <p className="text-gray-600">Generated at build time. No revalidation.</p>

      <div className="border p-4 rounded bg-gray-50">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="mt-2">{post.body}</p>
        <p className="text-sm text-gray-500 mt-4">
          This data was fetched at build time and cached indefinitely.
        </p>
      </div>

      <div className="text-sm text-gray-600">
        <p>Build time: {new Date().toISOString()}</p>
        <p className="mt-2">
          Refresh the page - the timestamp won't change because it's statically
          generated.
        </p>
      </div>

      <NextJSInfo renderingMode="SSG">
        <p>
          <strong>SSG Note:</strong> This page demonstrates pure static site
          generation. The content is pre-rendered at build time and cached
          indefinitely. This is the most performant option for content that
          rarely changes.
        </p>
      </NextJSInfo>
    </div>
  );
}
