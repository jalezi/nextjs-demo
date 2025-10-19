export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  target?: number;
  status: "good" | "needs-improvement" | "poor";
  description: string;
}

export interface WebVital {
  id: string;
  name: string;
  value: number;
  delta: number;
  rating: "good" | "needs-improvement" | "poor";
  navigationType: string;
}

export interface BundleChunk {
  name: string;
  size: number;
  gzipped: number;
  type: string;
}

export interface BundleAsset {
  name: string;
  size: number;
  type: string;
}

export interface BundleData {
  totalSize: number;
  gzippedSize: number;
  chunks: BundleChunk[];
  assets: BundleAsset[];
}

// Core Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTI: { good: 3800, poor: 7300 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

export function getRating(
  name: string,
  value: number,
): "good" | "needs-improvement" | "poor" {
  const thresholds =
    WEB_VITALS_THRESHOLDS[name as keyof typeof WEB_VITALS_THRESHOLDS];
  if (!thresholds) return "good";

  if (value <= thresholds.good) return "good";
  if (value <= thresholds.poor) return "needs-improvement";
  return "poor";
}

export function formatValue(value: number, unit: string): string {
  if (unit === "ms") {
    return value < 1000
      ? `${Math.round(value)}ms`
      : `${(value / 1000).toFixed(1)}s`;
  }
  if (unit === "score") {
    return (value * 100).toFixed(1);
  }
  return value.toFixed(2);
}

export function getMetricColor(
  status: "good" | "needs-improvement" | "poor",
): string {
  switch (status) {
    case "good":
      return "text-green-600 bg-green-50 border-green-200";
    case "needs-improvement":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "poor":
      return "text-red-600 bg-red-50 border-red-200";
  }
}

// Simulated performance data for demo
export function generateMockMetrics(): PerformanceMetric[] {
  return [
    {
      name: "Largest Contentful Paint",
      value: 1200 + Math.random() * 800,
      unit: "ms",
      target: 2500,
      status: "good",
      description: "Time until the largest content element is rendered",
    },
    {
      name: "First Input Delay",
      value: 50 + Math.random() * 100,
      unit: "ms",
      target: 100,
      status: "good",
      description: "Time from first user interaction to browser response",
    },
    {
      name: "Cumulative Layout Shift",
      value: 0.05 + Math.random() * 0.1,
      unit: "score",
      target: 0.1,
      status: "good",
      description: "Measure of visual stability during page load",
    },
    {
      name: "Time to First Byte",
      value: 200 + Math.random() * 400,
      unit: "ms",
      target: 800,
      status: "good",
      description: "Time until first byte of response is received",
    },
    {
      name: "First Contentful Paint",
      value: 800 + Math.random() * 600,
      unit: "ms",
      target: 1800,
      status: "good",
      description: "Time until first content is painted",
    },
    {
      name: "Time to Interactive",
      value: 2000 + Math.random() * 1500,
      unit: "ms",
      target: 3800,
      status: "needs-improvement",
      description: "Time until page is fully interactive",
    },
  ].map((metric) => ({
    ...metric,
    status: getRating(
      metric.name
        .split(" ")
        .map((w) => w[0])
        .join(""),
      metric.value,
    ),
  }));
}

export function generateBundleData(): BundleData {
  return {
    totalSize: 245.6,
    gzippedSize: 78.2,
    chunks: [
      { name: "main", size: 125.4, gzipped: 35.2, type: "initial" },
      { name: "vendor", size: 89.3, gzipped: 28.7, type: "initial" },
      { name: "runtime", size: 12.8, gzipped: 4.1, type: "runtime" },
      { name: "polyfills", size: 18.1, gzipped: 10.2, type: "initial" },
    ],
    assets: [
      { name: "images", size: 45.7, type: "static" },
      { name: "fonts", size: 23.4, type: "static" },
      { name: "css", size: 15.8, type: "stylesheet" },
    ],
  };
}
