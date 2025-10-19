/** biome-ignore-all lint/suspicious/noArrayIndexKey: For demo it's ok */
export default function StreamingLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center">
        <div className="h-8 bg-gray-200 rounded w-80 mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-[600px] mx-auto animate-pulse" />
      </div>

      {/* Key Concepts Skeleton */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-64 mb-3 animate-pulse" />
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`concept-${i}`} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
              {Array.from({ length: 4 }).map((_, j) => (
                <div
                  key={`item-${j}`}
                  className="h-3 bg-gray-200 rounded w-40 animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar Skeleton */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
      </div>

      {/* Components Grid Skeleton */}
      <div className="grid lg:grid-cols-2 gap-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={`component-${i}`}
            className="bg-gray-50 border rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={`item-${j}`} className="bg-white p-4 rounded border">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Large Component Skeleton */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-56 animate-pulse" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`large-item-${i}`}
              className="bg-white p-4 rounded border"
            >
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-full mb-1 animate-pulse" />
              <div className="flex justify-between items-center text-xs">
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Component Skeleton */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-64 animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`final-item-${i}`}
              className="bg-white p-4 rounded border"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Explanation Skeleton */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={`explanation-${i}`} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
              {Array.from({ length: 4 }).map((_, j) => (
                <div
                  key={`exp-item-${j}`}
                  className="h-3 bg-gray-200 rounded w-full animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
