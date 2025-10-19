/** biome-ignore-all lint/suspicious/noArrayIndexKey: For demo its' ok */
"use client";

import { useEffect, useState } from "react";
import {
  formatValue,
  getMetricColor,
  type PerformanceMetric,
} from "../lib/performance-utils";

interface MetricsCardProps {
  title: string;
  metrics: PerformanceMetric[];
  loading?: boolean;
}

export default function MetricsCard({
  title,
  metrics,
  loading = false,
}: MetricsCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <MetricsCardSkeleton title={title} />;
  }

  if (loading) {
    return <MetricsCardSkeleton title={title} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">
                  {metric.name}
                </p>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>

              <div className="text-right">
                <div
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getMetricColor(metric.status)}`}
                >
                  {formatValue(metric.value, metric.unit)}
                  {metric.unit === "score" ? "" : ` ${metric.unit}`}
                </div>

                {metric.target && (
                  <p className="text-xs text-gray-400 mt-1">
                    Target: {formatValue(metric.target, metric.unit)}
                    {metric.unit === "score" ? "" : ` ${metric.unit}`}
                  </p>
                )}
              </div>
            </div>

            {/* Progress bar */}
            {metric.target && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metric.status === "good"
                      ? "bg-green-500"
                      : metric.status === "needs-improvement"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.min((metric.value / metric.target) * 100, 100)}%`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overall status */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Overall Score</span>
          <div className="flex items-center gap-2">
            {["good", "needs-improvement", "poor"].map((status) => {
              const count = metrics.filter((m) => m.status === status).length;
              return (
                <div key={status} className="flex items-center gap-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      status === "good"
                        ? "bg-green-500"
                        : status === "needs-improvement"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs text-gray-600">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricsCardSkeleton({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={`skeleton-${i}`} className="space-y-2">
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

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="flex items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={`status-${i}`} className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-4 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
