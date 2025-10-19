/** biome-ignore-all lint/suspicious/noArrayIndexKey: Demo purpose */
export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border p-4 rounded">
          <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mt-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse mt-1"></div>
        </div>
      ))}
    </div>
  );
}
