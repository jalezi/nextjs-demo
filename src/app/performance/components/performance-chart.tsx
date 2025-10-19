"use client";

import { useEffect, useState } from "react";
import {
  type BundleAsset,
  type BundleChunk,
  type BundleData,
  generateBundleData,
} from "../lib/performance-utils";

export default function PerformanceChart() {
  const [bundleData, setBundleData] = useState<BundleData | null>(null);
  const [selectedView, setSelectedView] = useState<"chunks" | "assets">(
    "chunks",
  );

  useEffect(() => {
    // Simulate loading bundle data
    const timer = setTimeout(() => {
      setBundleData(generateBundleData());
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!bundleData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
        <div className="h-64 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  const data =
    selectedView === "chunks" ? bundleData.chunks : bundleData.assets;
  const maxSize = Math.max(
    ...data.map((item: BundleChunk | BundleAsset) => item.size),
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Bundle Analysis</h3>

        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setSelectedView("chunks")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              selectedView === "chunks"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Chunks
          </button>
          <button
            type="button"
            onClick={() => setSelectedView("assets")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              selectedView === "assets"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Assets
          </button>
        </div>
      </div>

      {/* Bundle size summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">
            {bundleData.totalSize}
          </p>
          <p className="text-sm text-blue-600">KB Total</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">
            {bundleData.gzippedSize}
          </p>
          <p className="text-sm text-green-600">KB Gzipped</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">
            {((bundleData.gzippedSize / bundleData.totalSize) * 100).toFixed(1)}
            %
          </p>
          <p className="text-sm text-purple-600">Compression</p>
        </div>
      </div>

      {/* Visual chart */}
      <div className="space-y-3">
        {data.map((item: BundleChunk | BundleAsset, index: number) => {
          const percentage = (item.size / maxSize) * 100;
          const colors = [
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
          ];

          // Type guard to check if item is a BundleChunk
          const isChunk = (
            item: BundleChunk | BundleAsset,
          ): item is BundleChunk => {
            return "gzipped" in item;
          };

          return (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded ${colors[index % colors.length]}`}
                  />
                  <span className="font-medium">{item.name}</span>
                  {selectedView === "chunks" && item.type && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {item.type}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-medium">{item.size} KB</span>
                  {isChunk(item) && item.gzipped && (
                    <span className="text-gray-500 ml-2">
                      ({item.gzipped} KB gzipped)
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${colors[index % colors.length]}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">📈 Performance Tips</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Keep initial bundle size under 200KB for better performance</li>
          <li>• Use code splitting to load only necessary chunks</li>
          <li>• Enable gzip compression on your server</li>
          <li>• Consider lazy loading for non-critical assets</li>
        </ul>
      </div>
    </div>
  );
}
