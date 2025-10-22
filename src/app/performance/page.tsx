import { NextJSInfo } from "../components/nextjs-info";
import MetricsCard from "./components/metrics-card";
import PerformanceChart from "./components/performance-chart";
import VitalsMonitor from "./components/vitals-monitor";
import { generateMockMetrics } from "./lib/performance-utils";

export default async function PerformancePage() {
  // Generate mock metrics for demo
  const coreWebVitals = generateMockMetrics().slice(0, 3);
  const loadingMetrics = generateMockMetrics().slice(3, 6);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Performance Monitoring Dashboard
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Monitor Core Web Vitals, analyze bundle sizes, and track performance
          metrics to optimize your Next.js application for the best user
          experience.
        </p>
      </div>

      {/* Key Concepts */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-900 mb-3">
          📊 Performance Monitoring Key Concepts
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-green-800 mb-2">
              Core Web Vitals:
            </h3>
            <ul className="space-y-1 text-green-700">
              <li>• Largest Contentful Paint (LCP)</li>
              <li>• First Input Delay (FID)</li>
              <li>• Cumulative Layout Shift (CLS)</li>
              <li>• First Contentful Paint (FCP)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-800 mb-2">
              Loading Metrics:
            </h3>
            <ul className="space-y-1 text-green-700">
              <li>• Time to First Byte (TTFB)</li>
              <li>• Time to Interactive (TTI)</li>
              <li>• Total Blocking Time (TBT)</li>
              <li>• Speed Index</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-800 mb-2">
              Monitoring Tools:
            </h3>
            <ul className="space-y-1 text-green-700">
              <li>• Performance Observer API</li>
              <li>• Bundle analysis</li>
              <li>• Real User Monitoring (RUM)</li>
              <li>• Synthetic testing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real-time Vitals Monitor */}
      <VitalsMonitor />

      {/* Metrics Cards */}
      <div className="grid lg:grid-cols-2 gap-8">
        <MetricsCard title="Core Web Vitals" metrics={coreWebVitals} />
        <MetricsCard title="Loading Performance" metrics={loadingMetrics} />
      </div>

      {/* Bundle Analysis Chart */}
      <PerformanceChart />

      {/* Performance Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          🚀 Performance Optimization Recommendations
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-blue-800 mb-3">
              Loading Optimizations
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Next.js Image optimization enabled</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Automatic code splitting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Static generation for optimal caching</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Consider implementing Service Worker</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Optimize third-party script loading</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-blue-800 mb-3">
              Runtime Optimizations
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>React 19 concurrent features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Streaming SSR implementation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Optimistic UI updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Implement virtual scrolling for long lists</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Add performance monitoring alerts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Implementation */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          🔧 Technical Implementation
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Web Vitals API</h3>
            <ul className="space-y-1 text-gray-700">
              <li>
                • <code>PerformanceObserver</code>
              </li>
              <li>
                • <code>largest-contentful-paint</code>
              </li>
              <li>
                • <code>first-input</code> timing
              </li>
              <li>
                • <code>layout-shift</code> tracking
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bundle Analysis</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Webpack bundle analyzer</li>
              <li>• Chunk size monitoring</li>
              <li>• Compression analysis</li>
              <li>• Asset optimization</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Next.js Features</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Built-in performance metrics</li>
              <li>• Automatic optimizations</li>
              <li>• Edge runtime support</li>
              <li>• ISR for dynamic content</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Info */}
      <div className="text-center text-sm text-gray-600">
        <p>
          ⏱️ Dashboard rendered at: {new Date().toLocaleString()}
          <span className="ml-4">
            📈 Monitoring {coreWebVitals.length + loadingMetrics.length} metrics
          </span>
        </p>
      </div>

      <NextJSInfo renderingMode="SSR">
        <p>
          <strong>Performance Monitoring Note:</strong> This dashboard uses
          server-side rendering to ensure performance metrics are available
          immediately. In production, this data would typically come from real
          analytics services like Vercel Analytics or custom monitoring
          solutions.
        </p>
      </NextJSInfo>
    </div>
  );
}
