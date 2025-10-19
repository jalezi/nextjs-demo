export default async function Analytics() {
  // Simulate API call with different timing
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const stats = {
    views: 12847,
    clicks: 4567,
    conversions: 892,
    revenue: 45230,
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-green-700">
        Analytics (@analytics slot)
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">👁️ Page Views</span>
          <span className="font-semibold text-lg">
            {stats.views.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">🖱️ Clicks</span>
          <span className="font-semibold text-lg">
            {stats.clicks.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">✅ Conversions</span>
          <span className="font-semibold text-lg">
            {stats.conversions.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center border-t pt-2">
          <span className="text-gray-700">💰 Revenue</span>
          <span className="font-semibold text-lg text-green-600">
            ${stats.revenue.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
