// Force dynamic rendering - no caching
export const dynamic = "force-dynamic";

export default async function DynamicPage() {
  // This fetch happens on every request
  const res = await fetch("https://api.github.com/repos/vercel/next.js", {
    cache: "no-store",
  });
  const repo = await res.json();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dynamic Page (SSR)</h1>
      <p className="text-gray-600">
        Rendered on every request. Server-Side Rendering.
      </p>

      <div className="border p-4 rounded bg-blue-50">
        <h2 className="text-xl font-semibold">{repo.name}</h2>
        <p className="mt-2">{repo.description}</p>
        <div className="mt-4 flex gap-4 text-sm flex-wrap">
          <span>⭐ Stars: {repo.stargazers_count.toLocaleString()}</span>
          <span>🍴 Forks: {repo.forks_count.toLocaleString()}</span>
          <span>👁️ Watchers: {repo.watchers_count.toLocaleString()}</span>
          <span>🐛 Issues: {repo.open_issues_count.toLocaleString()}</span>
        </div>
      </div>

      <div className="text-sm text-gray-600 bg-yellow-50 p-4 rounded">
        <p className="font-semibold">Rendered at: {new Date().toISOString()}</p>
        <p className="mt-2">
          Refresh the page to see the timestamp update. Data is fetched on every
          request.
        </p>
        <p className="mt-2">
          The stars count may also update if it changed since your last visit!
        </p>
      </div>
    </div>
  );
}
