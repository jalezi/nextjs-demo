import { fetchFastData } from "../lib/data";

export default async function FastComponent() {
  const data = await fetchFastData(500); // 0.5 second delay

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-green-900 mb-4">
        ⚡ Fast Loading Component (0.5s delay)
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 rounded border text-center"
          >
            <p className="text-sm text-gray-700">{item.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-green-600">
        ⏱️ Loaded at: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}
