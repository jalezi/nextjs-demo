/** biome-ignore-all lint/suspicious/noArrayIndexKey: For demo purposes only */
export default function ErrorHandlingLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center">
        <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-[600px] mx-auto animate-pulse" />
      </div>

      {/* Key Concepts Skeleton */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-64 mb-3 animate-pulse" />
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`concept-${i}`} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              {Array.from({ length: 4 }).map((_, j) => (
                <div
                  key={`item-${j}`}
                  className="h-3 bg-gray-200 rounded w-48 animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Error Scenarios */}
        <div className="space-y-6">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`scenario-${i}`}
                className="bg-white p-4 rounded-lg border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Component Demos */}
        <div className="space-y-6">
          <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />

          {/* Error Reporter Demo Skeleton */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
            <div className="bg-gray-50 border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
                    <div className="h-8 bg-gray-200 rounded w-24 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Retry Button Demo Skeleton */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-44 animate-pulse" />
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="h-8 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="flex-1 h-2 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Fallback UI Demo Skeleton */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-40 animate-pulse" />
            <div className="bg-gray-50 border rounded-lg p-8 text-center">
              <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-48 mx-auto mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded w-24 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices Skeleton */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="h-6 bg-gray-200 rounded w-64 mb-4 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={`practice-${i}`} className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
              {Array.from({ length: 5 }).map((_, j) => (
                <div
                  key={`practice-item-${j}`}
                  className="flex items-start gap-2"
                >
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Technical Implementation Skeleton */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`tech-${i}`} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
              {Array.from({ length: 4 }).map((_, j) => (
                <div
                  key={`tech-item-${j}`}
                  className="h-3 bg-gray-200 rounded w-28 animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
