/** biome-ignore-all lint/suspicious/noArrayIndexKey: For demo its' ok */
export default function ServerActionsLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
      </div>

      {/* Key Concepts Skeleton */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-48 mb-3 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-3 bg-gray-200 rounded w-40 animate-pulse"
              />
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-3 bg-gray-200 rounded w-44 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Demo Components Skeleton */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form Skeleton */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-5 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
          <div className="space-y-4">
            <div>
              <div className="h-4 bg-gray-200 rounded w-16 mb-1 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-12 mb-1 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-1 animate-pulse" />
              <div className="h-24 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Todo Form Skeleton */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-5 bg-gray-200 rounded w-56 mb-4 animate-pulse" />
          <div className="flex gap-2 mb-6">
            <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded w-16 animate-pulse" />
          </div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Upload Form Skeleton */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-5 bg-gray-200 rounded w-64 mb-4 animate-pulse" />
          <div className="space-y-4">
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Technical Details Skeleton */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="h-3 bg-gray-200 rounded w-40 animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
