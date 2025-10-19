/** biome-ignore-all lint/suspicious/noArrayIndexKey: For demo its' ok */
export default function PerformanceLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center">
        <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-[500px] mx-auto animate-pulse" />
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

      {/* Real-time Monitor Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-8 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={`vital-${i}`} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-8 mt-1 animate-pulse" />
                </div>
                <div className="text-right">
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-12 mt-1 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Cards Skeleton */}
      <div className="grid lg:grid-cols-2 gap-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={`card-${i}`} className="bg-white rounded-lg shadow-md p-6">
            <div className="h-5 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={`metric-${j}`} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-64 mt-1 animate-pulse" />
                    </div>
                    <div className="text-right">
                      <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-20 mt-1 animate-pulse" />
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-16 ml-1 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`summary-${i}`}
              className="text-center p-3 bg-gray-50 rounded-lg"
            >
              <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-12 mx-auto animate-pulse" />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`bar-${i}`} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Skeleton */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-64 mb-4 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={`rec-${i}`} className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={`rec-item-${j}`} className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-48 animate-pulse" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
