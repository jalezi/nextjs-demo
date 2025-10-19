/** biome-ignore-all lint/suspicious/noArrayIndexKey: For demo it's ok*/
import { Suspense } from "react";
import FastComponent from "./components/fast-component";
import ProgressiveForm from "./components/progressive-form";
import SlowComponent from "./components/slow-component";
import StreamingList from "./components/streaming-list";

function LoadingSkeleton({ title, delay }: { title: string; delay: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600" />
        <h3 className="text-lg font-semibold text-gray-600">
          Loading {title} ({delay})...
        </h3>
      </div>

      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={`skeleton-${i}`} className="bg-white p-4 rounded border">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StreamingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Streaming & Suspense Patterns
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Demonstrate advanced React Suspense patterns with streaming SSR,
          nested boundaries, and progressive data loading for optimal user
          experience.
        </p>
      </div>

      {/* Key Concepts */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-indigo-900 mb-3">
          🌊 Streaming & Suspense Key Concepts
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-indigo-800 mb-2">
              Streaming Benefits:
            </h3>
            <ul className="space-y-1 text-indigo-700">
              <li>• Faster Time to First Byte</li>
              <li>• Progressive page loading</li>
              <li>• Better perceived performance</li>
              <li>• Reduced blocking time</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-800 mb-2">
              Suspense Features:
            </h3>
            <ul className="space-y-1 text-indigo-700">
              <li>• Nested boundaries</li>
              <li>• Fallback UI components</li>
              <li>• Concurrent rendering</li>
              <li>• Error boundary integration</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-800 mb-2">Use Cases:</h3>
            <ul className="space-y-1 text-indigo-700">
              <li>• Data-heavy dashboards</li>
              <li>• Multi-section pages</li>
              <li>• Progressive forms</li>
              <li>• Lazy-loaded content</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real-time Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">
              Streaming Active
            </span>
          </div>
          <span className="text-xs text-gray-500">
            Page loaded at: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Independent Suspense Boundaries */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Fast loading component */}
        <Suspense
          fallback={<LoadingSkeleton title="Fast Component" delay="0.5s" />}
        >
          <FastComponent />
        </Suspense>

        {/* Progressive form (no suspense needed - client component) */}
        <ProgressiveForm />
      </div>

      {/* Streaming list with its own boundary */}
      <Suspense fallback={<LoadingSkeleton title="Blog Posts" delay="2s" />}>
        <StreamingList />
      </Suspense>

      {/* Slow component with separate boundary */}
      <Suspense
        fallback={<LoadingSkeleton title="Slow Component" delay="3s" />}
      >
        <SlowComponent />
      </Suspense>

      {/* Loading Strategy Explanation */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          🔧 Loading Strategy Implementation
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Component Loading Order:</h3>
            <ol className="space-y-1 text-gray-700 list-decimal list-inside">
              <li>
                <strong>Fast Component</strong> - Loads first (0.5s)
              </li>
              <li>
                <strong>Progressive Form</strong> - Immediate (client-side)
              </li>
              <li>
                <strong>Streaming List</strong> - Loads second (2s)
              </li>
              <li>
                <strong>Slow Component</strong> - Loads last (3s)
              </li>
            </ol>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Suspense Strategy:</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Independent boundaries prevent blocking</li>
              <li>• Granular loading states</li>
              <li>• Each component streams independently</li>
              <li>• User sees content as it becomes available</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          ⚡ Technical Implementation
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">React Features</h3>
            <ul className="space-y-1 text-gray-700">
              <li>
                • <code>Suspense</code> boundaries
              </li>
              <li>
                • <code>useTransition</code> hook
              </li>
              <li>• Concurrent rendering</li>
              <li>• Streaming SSR</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Next.js Integration</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Server Components</li>
              <li>• Automatic code splitting</li>
              <li>• Progressive hydration</li>
              <li>• Edge runtime support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Performance Benefits</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Reduced Time to Interactive</li>
              <li>• Better Core Web Vitals</li>
              <li>• Improved user experience</li>
              <li>• Efficient resource usage</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Info */}
      <div className="text-center text-sm text-gray-600">
        <p>
          ⏱️ Page shell rendered at: {new Date().toLocaleString()}
          <span className="ml-4">
            🌊 Components stream in as data becomes available
          </span>
        </p>
      </div>
    </div>
  );
}
