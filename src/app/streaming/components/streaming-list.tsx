import { fetchPosts } from "../lib/data";

export default async function StreamingList() {
  const posts = await fetchPosts(2000); // 2 second delay

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        📋 Streaming Blog Posts (2s delay)
      </h3>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="bg-white p-4 rounded border">
            <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>

            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>By {post.author}</span>
              <span>{post.publishedAt}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 text-xs text-blue-600">
        ⏱️ Posts loaded at: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}
