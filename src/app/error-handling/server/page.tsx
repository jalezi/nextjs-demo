"use client";

import { useState } from "react";
import ErrorReporter from "../components/error-reporter";
import FallbackUI from "../components/fallback-ui";
import RetryButton from "../components/retry-button";
import {
  type AppError,
  fetchWithServerError,
  fetchWithTimeoutError,
  withRetry,
} from "../lib/errors";

export default function ServerErrorsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [data, setData] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [errorType, setErrorType] = useState<"server" | "timeout">("server");

  async function handleFetch(
    useRetry: boolean = false,
    type: "server" | "timeout" = "server",
  ) {
    setIsLoading(true);
    setError(null);
    setData(null);
    setErrorType(type);

    try {
      // biome-ignore lint/suspicious/noImplicitAnyLet: For demo it's ok
      let result;
      const fetchFunction =
        type === "server" ? fetchWithServerError : fetchWithTimeoutError;

      if (useRetry) {
        result = await withRetry(() => fetchFunction(), 3, 1000);
      } else {
        result = await fetchFunction();
      }

      setData(result.data);
      setRetryCount(0);
    } catch (err) {
      setError(err as AppError);
      if (useRetry) {
        setRetryCount((prev) => prev + 1);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleRetry() {
    setRetryCount((prev) => prev + 1);
    handleFetch(false, errorType);
  }

  function handleDismiss() {
    setError(null);
    setRetryCount(0);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Server Error Handling
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Demonstrates handling of server-side errors including internal server
          errors, API failures, database issues, and timeout scenarios with
          proper recovery mechanisms.
        </p>
      </div>

      {/* Test Server Errors */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🔧 Test Server Errors
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => handleFetch(false, "server")}
            disabled={isLoading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            Trigger Server Error (500)
          </button>

          <button
            type="button"
            onClick={() => handleFetch(false, "timeout")}
            disabled={isLoading}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
          >
            Trigger Timeout Error
          </button>

          <button
            type="button"
            onClick={() => handleFetch(true, "server")}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Server Error with Auto Retry
          </button>

          <button
            type="button"
            onClick={() => handleFetch(true, "timeout")}
            disabled={isLoading}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            Timeout with Auto Retry
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <FallbackUI
          type="loading"
          title="Processing request..."
          description="This request will simulate a server error for demonstration purposes."
        />
      )}

      {/* Success State */}
      {data && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">✅</span>
            <h3 className="text-lg font-semibold text-green-900">Success!</h3>
          </div>
          <p className="text-green-800">{data}</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="space-y-4">
          <ErrorReporter
            error={error}
            onRetry={error.retryable ? handleRetry : undefined}
            onDismiss={handleDismiss}
          />

          {error.retryable && (
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-3">Retry Controls</h4>
              <div className="flex items-center gap-4">
                <RetryButton
                  onRetry={handleRetry}
                  isRetrying={isLoading}
                  retryCount={retryCount}
                  maxRetries={5}
                />
                <span className="text-sm text-gray-600">
                  Retry attempt: {retryCount}/5
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Server Error Types */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">
          🔧 Server Error Categories
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-red-800 mb-2">
              HTTP Status Errors:
            </h4>
            <ul className="space-y-1 text-sm text-red-700">
              <li>• 500 - Internal Server Error</li>
              <li>• 502 - Bad Gateway</li>
              <li>• 503 - Service Unavailable</li>
              <li>• 504 - Gateway Timeout</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-800 mb-2">Database Errors:</h4>
            <ul className="space-y-1 text-sm text-red-700">
              <li>• Connection timeout</li>
              <li>• Query execution failure</li>
              <li>• Constraint violations</li>
              <li>• Transaction rollbacks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-800 mb-2">API Integration:</h4>
            <ul className="space-y-1 text-sm text-red-700">
              <li>• Third-party API failures</li>
              <li>• Rate limit exceeded</li>
              <li>• Authentication errors</li>
              <li>• Service dependencies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recovery Strategies */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          🔄 Recovery Strategies
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">
              Automatic Recovery:
            </h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>✓ Exponential backoff retry</li>
              <li>✓ Circuit breaker pattern</li>
              <li>✓ Fallback to cached data</li>
              <li>✓ Graceful degradation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">
              User-Initiated Recovery:
            </h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>→ Manual retry buttons</li>
              <li>→ Alternative action paths</li>
              <li>→ Offline mode activation</li>
              <li>→ Error reporting tools</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Monitoring & Alerting */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">
          📊 Monitoring & Alerting
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-yellow-800 mb-2">
              Error Tracking:
            </h4>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>• Error frequency monitoring</li>
              <li>• Performance impact tracking</li>
              <li>• User session analysis</li>
              <li>• Error trend identification</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-yellow-800 mb-2">
              Alerting Systems:
            </h4>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>• Real-time error notifications</li>
              <li>• Threshold-based alerts</li>
              <li>• Integration with monitoring tools</li>
              <li>• Escalation procedures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
