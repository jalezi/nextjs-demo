export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="text-center">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
      </div>

      {/* Key concepts skeleton */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>

      {/* Comparison skeleton */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded border">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded border">
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact form skeleton */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-6"></div>

        <div className="max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-24 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>

      {/* Technical implementation skeleton */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="space-y-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* NextJS info skeleton */}
      <div className="h-20 bg-gray-200 rounded"></div>
    </div>
  );
}
