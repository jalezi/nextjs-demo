import { fetchSlowData } from "../lib/data";

export default async function SlowComponent() {
  const data = await fetchSlowData(3000); // 3 second delay

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-red-900 mb-4">
        🐌 Slow Loading Component (3s delay)
      </h3>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900">{item.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-red-600">
        ⏱️ Loaded at: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}
