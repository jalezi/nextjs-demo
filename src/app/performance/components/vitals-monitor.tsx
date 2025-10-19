/** biome-ignore-all lint/suspicious/noExplicitAny: For demo purposes only */
"use client";

import { useEffect, useState } from "react";
import type { WebVital } from "../lib/performance-utils";

export default function VitalsMonitor() {
  const [vitals, setVitals] = useState<WebVital[]>([]);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if web vitals are supported
    if (typeof window !== "undefined" && "performance" in window) {
      setIsSupported(true);

      // Mock some initial vitals data for demo
      const mockVitals: WebVital[] = [
        {
          id: "FCP",
          name: "First Contentful Paint",
          value: 1200,
          delta: 1200,
          rating: "good",
          navigationType: "navigate",
        },
        {
          id: "LCP",
          name: "Largest Contentful Paint",
          value: 1800,
          delta: 1800,
          rating: "good",
          navigationType: "navigate",
        },
      ];

      setVitals(mockVitals);

      // Try to get real performance data if available
      try {
        if ("PerformanceObserver" in window) {
          // Observe LCP
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            if (lastEntry) {
              setVitals((prev) => {
                const newVitals = prev.filter((v) => v.id !== "LCP");
                return [
                  ...newVitals,
                  {
                    id: "LCP",
                    name: "Largest Contentful Paint",
                    value: lastEntry.startTime,
                    delta: lastEntry.startTime,
                    rating:
                      lastEntry.startTime <= 2500
                        ? "good"
                        : lastEntry.startTime <= 4000
                          ? "needs-improvement"
                          : "poor",
                    navigationType: "navigate",
                  },
                ];
              });
            }
          });

          lcpObserver.observe({
            type: "largest-contentful-paint",
            buffered: true,
          });

          // Observe FCP
          const fcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry: any) => {
              if (entry.name === "first-contentful-paint") {
                setVitals((prev) => {
                  const newVitals = prev.filter((v) => v.id !== "FCP");
                  return [
                    ...newVitals,
                    {
                      id: "FCP",
                      name: "First Contentful Paint",
                      value: entry.startTime,
                      delta: entry.startTime,
                      rating:
                        entry.startTime <= 1800
                          ? "good"
                          : entry.startTime <= 3000
                            ? "needs-improvement"
                            : "poor",
                      navigationType: "navigate",
                    },
                  ];
                });
              }
            });
          });

          fcpObserver.observe({ type: "paint", buffered: true });

          return () => {
            lcpObserver.disconnect();
            fcpObserver.disconnect();
          };
        }
      } catch (error) {
        console.warn("Performance monitoring not fully supported:", error);
      }
    }
  }, []);

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <title>Warning</title>
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Performance monitoring not available
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Real-time Web Vitals monitoring requires a modern browser with
              Performance Observer support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Real-time Web Vitals
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      {vitals.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
          <p className="text-sm text-gray-600 mt-2">
            Collecting performance data...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vitals.map((vital) => (
            <div
              key={vital.id}
              className={`p-4 rounded-lg border-2 ${
                vital.rating === "good"
                  ? "border-green-200 bg-green-50"
                  : vital.rating === "needs-improvement"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{vital.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{vital.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {vital.value < 1000
                      ? `${Math.round(vital.value)}ms`
                      : `${(vital.value / 1000).toFixed(1)}s`}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      vital.rating === "good"
                        ? "text-green-600"
                        : vital.rating === "needs-improvement"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {vital.rating.replace("-", " ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>
          <strong>Note:</strong> Real-time monitoring shows actual performance
          metrics as they occur. Values may vary based on device capabilities
          and network conditions.
        </p>
      </div>
    </div>
  );
}
