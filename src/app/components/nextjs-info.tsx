import type { ReactNode } from "react";

interface NextJSInfoProps {
  renderingMode: "SSG" | "SSR" | "ISR" | "Mixed";
  children?: ReactNode;
}

export function NextJSInfo({ renderingMode, children }: NextJSInfoProps) {
  const isDev = process.env.NODE_ENV === "development";
  const nextjsVersion = "15.5.6"; // From package.json

  const renderingBehavior = {
    SSG: {
      dev: "Pages are regenerated on every request to show changes immediately during development.",
      prod: "Pages are generated once at build time and served statically until next deployment.",
    },
    SSR: {
      dev: "Pages are server-rendered on every request with hot reloading for instant updates.",
      prod: "Pages are server-rendered on every request, no caching unless explicitly configured.",
    },
    ISR: {
      dev: "Revalidation timing is bypassed - pages regenerate on every request for development convenience.",
      prod: "Pages follow the revalidation schedule (e.g., every 60s) and serve stale content while regenerating in background.",
    },
    Mixed: {
      dev: "Different routes may behave differently, but all respect development hot reloading.",
      prod: "Each route follows its specific caching and rendering strategy as configured.",
    },
  };

  return (
    <details className="mt-8 group">
      <summary className="cursor-pointer p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors select-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-blue-900 inline">
            Next.js {nextjsVersion} - Development & Production Behavior
          </h3>
        </div>
      </summary>

      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 border-t-0 rounded-b-lg space-y-4 text-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  isDev
                    ? "bg-orange-100 text-orange-800 border border-orange-200"
                    : "bg-green-100 text-green-800 border border-green-200"
                }`}
              >
                {isDev ? "Development Mode" : "Production Mode"}
              </span>
              <span className="text-xs text-gray-600">({renderingMode})</span>
            </div>
            <p className="text-gray-700 bg-white p-3 rounded border">
              <strong>Current:</strong>{" "}
              {isDev
                ? renderingBehavior[renderingMode].dev
                : renderingBehavior[renderingMode].prod}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  !isDev
                    ? "bg-orange-100 text-orange-800 border border-orange-200"
                    : "bg-green-100 text-green-800 border border-green-200"
                }`}
              >
                {!isDev ? "Development Mode" : "Production Mode"}
              </span>
              <span className="text-xs text-gray-600">({renderingMode})</span>
            </div>
            <p className="text-gray-700 bg-white p-3 rounded border">
              <strong>When {!isDev ? "developing" : "deployed"}:</strong>{" "}
              {!isDev
                ? renderingBehavior[renderingMode].dev
                : renderingBehavior[renderingMode].prod}
            </p>
          </div>
        </div>

        {children && (
          <div className="p-3 bg-white rounded border border-blue-100">
            {children}
          </div>
        )}

        <div className="pt-3 border-t border-blue-200 text-xs text-blue-700">
          <p className="font-semibold mb-2">💡 Key Differences:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              <strong>Dev:</strong> Hot reloading, detailed error messages,
              unoptimized bundles for faster rebuilds
            </li>
            <li>
              <strong>Prod:</strong> Optimized bundles, static file serving,
              CDN-ready assets, minimal error details
            </li>
            <li>
              <strong>Caching:</strong> Most caching is bypassed in dev; fully
              active in prod for performance
            </li>
          </ul>
        </div>
      </div>
    </details>
  );
}
