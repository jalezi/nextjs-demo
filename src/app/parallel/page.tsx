import { NextJSInfo } from "../components/nextjs-info";

export default function ParallelPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">Parallel Routes Demo</h1>
      <p className="text-gray-600">
        This page demonstrates Next.js parallel routes. The content below is
        rendered simultaneously from two different route slots:{" "}
        <code>@team</code> and <code>@analytics</code>. Each slot can have its
        own loading states, error boundaries, and data fetching.
      </p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h2 className="font-semibold text-yellow-800">How it works:</h2>
        <ul className="mt-2 text-sm text-yellow-700 space-y-1">
          <li>
            • The layout accepts <code>team</code> and <code>analytics</code>{" "}
            props
          </li>
          <li>
            • Content is loaded from <code>@team/page.tsx</code> and{" "}
            <code>@analytics/page.tsx</code>
          </li>
          <li>• Each slot loads independently with different timing</li>
          <li>
            • This enables building complex layouts with multiple data sources
          </li>
        </ul>
      </div>

      <NextJSInfo renderingMode="Mixed">
        <p>
          <strong>Mixed Rendering Note:</strong> This layout truly demonstrates
          mixed rendering strategies in action - the main page content is SSG
          (static), while the <code>@team</code> slot uses SSR with 1s API delay
          and <code>@analytics</code> slot uses SSR with 1.5s delay. Each
          renders independently with its own loading states.
        </p>
      </NextJSInfo>
    </div>
  );
}
