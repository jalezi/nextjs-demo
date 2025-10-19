// Revalidate every 60 seconds
export const revalidate = 60;

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string;
}

export default async function ISRPage() {
  let data: GitHubRepo;
  let isError = false;

  try {
    // This fetch will be cached and revalidated every 60 seconds
    // Using GitHub API which is very reliable
    const res = await fetch("https://api.github.com/repos/vercel/next.js", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    data = (await res.json()) as GitHubRepo;
  } catch (e) {
    isError = true;
    console.error("Failed to fetch GitHub data:", e);

    // Fallback data when API fails
    data = {
      name: "next.js",
      description: "The React Framework (fallback data)",
      stargazers_count: 125000,
      forks_count: 28000,
      updated_at: new Date().toISOString(),
      language: "TypeScript",
    };
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">
        ISR Page (Incremental Static Regeneration)
      </h1>
      <p className="text-gray-600">
        Revalidates every 60 seconds. First user after 60s sees stale content,
        triggers regeneration in background.
      </p>

      <div className="border p-4 rounded bg-green-50">
        <h2 className="text-xl font-semibold">Next.js Repository Stats</h2>
        {isError && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded mb-3 text-sm">
            ⚠️ Using fallback data - GitHub API unavailable
          </div>
        )}
        <div className="mt-3 space-y-2">
          <p>
            <span className="font-semibold">Repository:</span> {data.name}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {data.description}
          </p>
          <p>
            <span className="font-semibold">Language:</span> {data.language}
          </p>
          <div className="flex gap-4 mt-3">
            <span className="bg-blue-100 px-3 py-1 rounded">
              ⭐ {data.stargazers_count.toLocaleString()} stars
            </span>
            <span className="bg-purple-100 px-3 py-1 rounded">
              🍴 {data.forks_count.toLocaleString()} forks
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Last updated: {new Date(data.updated_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded">
        <p className="font-semibold">Page generated at:</p>
        <p className="text-lg font-mono">{new Date().toISOString()}</p>
        <p className="text-sm text-gray-600 mt-2">
          It will revalidate 60 seconds after the last request.
        </p>
      </div>

      <div className="text-sm text-gray-600 bg-yellow-50 p-4 rounded">
        <h3 className="font-semibold mb-2">How to test ISR:</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Note the repository stats and "Page generated at" timestamp above
          </li>
          <li>Wait 60+ seconds</li>
          <li>Refresh the page</li>
          <li>
            The first refresh will show the old data (stale-while-revalidate)
          </li>
          <li>Refresh again - you'll see the updated data from GitHub</li>
        </ol>
      </div>
    </div>
  );
}
