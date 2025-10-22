"use client";

import Link from "next/link";
import { useState } from "react";
import { NextJSInfo } from "../components/nextjs-info";
import ErrorReporter from "./components/error-reporter";
import FallbackUI from "./components/fallback-ui";
import PageTimestamp from "./components/page-timestamp";
import RetryButton from "./components/retry-button";

export default function ErrorHandlingPage() {
  const [demoRetryCount, setDemoRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);

  async function handleDemoRetry() {
    setIsRetrying(true);
    setDemoRetryCount((prev) => prev + 1);

    // Simulate retry delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsRetrying(false);

    // Show success message after 3 retries
    if (demoRetryCount >= 2) {
      alert(`✅ Demo retry successful after ${demoRetryCount + 1} attempts!`);
      setDemoRetryCount(0);
    }
  }

  function handleDemoRetryButton() {
    handleDemoRetry();
  }

  function handleDismiss() {
    setErrorDismissed(true);
    setTimeout(() => setErrorDismissed(false), 3000); // Reset after 3 seconds
  }
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Enhanced Error Handling System
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive error handling patterns with recovery mechanisms, user
          feedback, and graceful degradation strategies for robust application
          experiences.
        </p>
      </div>

      {/* Key Concepts */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-900 mb-3">
          🛡️ Error Handling Key Concepts
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-red-800 mb-2">Error Types:</h3>
            <ul className="space-y-1 text-red-700">
              <li>• Network connectivity errors</li>
              <li>• Validation & input errors</li>
              <li>• Server & API errors</li>
              <li>• Authentication failures</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-800 mb-2">
              Recovery Strategies:
            </h3>
            <ul className="space-y-1 text-red-700">
              <li>• Automatic retry with backoff</li>
              <li>• Manual retry mechanisms</li>
              <li>• Fallback content display</li>
              <li>• Graceful degradation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-800 mb-2">
              User Experience:
            </h3>
            <ul className="space-y-1 text-red-700">
              <li>• Clear error messaging</li>
              <li>• Progress indicators</li>
              <li>• Error reporting tools</li>
              <li>• Accessibility support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error Type Examples */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Error Scenarios
          </h3>

          <div className="space-y-4">
            <Link
              href="/error-handling/network"
              className="block bg-white p-4 rounded-lg border hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌐</span>
                <h4 className="font-semibold text-gray-900">Network Errors</h4>
              </div>
              <p className="text-sm text-gray-600">
                Connection timeouts, server unavailable, DNS failures
              </p>
            </Link>

            <Link
              href="/error-handling/validation"
              className="block bg-white p-4 rounded-lg border hover:border-yellow-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚠️</span>
                <h4 className="font-semibold text-gray-900">
                  Validation Errors
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                Form validation, input formatting, data constraints
              </p>
            </Link>

            <Link
              href="/error-handling/server"
              className="block bg-white p-4 rounded-lg border hover:border-red-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔧</span>
                <h4 className="font-semibold text-gray-900">Server Errors</h4>
              </div>
              <p className="text-sm text-gray-600">
                Internal server errors, API failures, database issues
              </p>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Component Demos
          </h3>

          {/* Error Reporter Demo */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">
              Error Reporter Component
            </h4>
            {errorDismissed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  ✅ Error dismissed! Resetting in 3 seconds...
                </p>
              </div>
            ) : (
              <ErrorReporter
                error={{
                  name: "DemoError",
                  message: "This is a demonstration error message",
                  type: "network",
                  code: "DEMO_ERROR",
                  retryable: true,
                  details: {
                    endpoint: "/api/demo",
                    status: 503,
                    timestamp: "2025-10-19T20:30:00.000Z",
                  },
                }}
                onRetry={handleDemoRetry}
                onDismiss={handleDismiss}
              />
            )}
          </div>

          {/* Retry Button Demo */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">
              Retry Button Component
            </h4>
            <div className="bg-white p-4 rounded-lg border">
              <div className="mb-3">
                <p className="text-sm text-gray-600">
                  Retry attempts: {demoRetryCount}/3
                  {demoRetryCount >= 3 && (
                    <span className="text-green-600 ml-2">
                      ✅ Max retries reached
                    </span>
                  )}
                </p>
              </div>
              <RetryButton
                onRetry={handleDemoRetryButton}
                isRetrying={isRetrying}
                retryCount={demoRetryCount}
                maxRetries={3}
              />
            </div>
          </div>

          {/* Fallback UI Demo */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Fallback UI Component</h4>
            <FallbackUI
              type="error"
              title="Example Error State"
              description="This shows how errors are displayed to users with clear messaging and actions."
              action={
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Try Again
                </button>
              }
            />
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          📋 Error Handling Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-3">Implementation Guidelines:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Use Error Boundaries for unhandled exceptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Implement retry logic with exponential backoff</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Provide clear, actionable error messages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Log errors for monitoring and debugging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Show loading states during recovery</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">User Experience:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Never show technical error details to users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Offer multiple recovery options when possible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Maintain application state during errors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Provide offline mode for critical features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Use progressive disclosure for error details</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Implementation */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          ⚡ Technical Implementation
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">React Patterns</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Error Boundaries</li>
              <li>
                • <code>useErrorHandler</code> hook
              </li>
              <li>• Error context providers</li>
              <li>• Suspense fallbacks</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Error Types</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Custom error classes</li>
              <li>• Error categorization</li>
              <li>• Retry policies</li>
              <li>• Error serialization</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Monitoring</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Error tracking services</li>
              <li>• Performance monitoring</li>
              <li>• User session recording</li>
              <li>• Real-time alerts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Info */}
      <div className="text-center text-sm text-gray-600">
        <p>
          <PageTimestamp />
          <span className="ml-4">🛡️ Error handling system ready</span>
        </p>
      </div>

      <NextJSInfo renderingMode="SSR">
        <p>
          <strong>Error Handling Note:</strong> This page uses client-side
          rendering to demonstrate interactive error handling patterns. Error
          boundaries, retry mechanisms, and user feedback systems work the same
          way in both dev and production, but production provides more
          user-friendly error messages.
        </p>
      </NextJSInfo>
    </div>
  );
}
