export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      </div>
      <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}
