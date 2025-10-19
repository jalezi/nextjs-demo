"use client";

import { useState } from "react";
import ErrorReporter from "../components/error-reporter";
import FallbackUI from "../components/fallback-ui";
import RetryButton from "../components/retry-button";
import { type AppError, fetchWithNetworkError, withRetry } from "../lib/errors";

export default function NetworkErrorsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [data, setData] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  async function handleFetch(useRetry: boolean = false) {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      // biome-ignore lint/suspicious/noImplicitAnyLet: For demo it's ok
      let result;
      if (useRetry) {
        result = await withRetry(() => fetchWithNetworkError(), 2, 1000);
      } else {
        result = await fetchWithNetworkError();
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
    handleFetch(false);
  }

  function handleDismiss() {
    setError(null);
    setRetryCount(0);
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Network Error Handling
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Demonstrates how to handle network-related errors with retry
          mechanisms, user feedback, and graceful degradation.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Test Network Errors</h3>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleFetch(false)}
            disabled={isLoading}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trigger Network Error
          </button>

          <button
            type="button"
            onClick={() => handleFetch(true)}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Fetch with Auto Retry
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <FallbackUI
          type="loading"
          title="Connecting to server..."
          description="This will fail with a network error for demonstration purposes."
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
              <RetryButton
                onRetry={handleRetry}
                isRetrying={isLoading}
                retryCount={retryCount}
                maxRetries={3}
              />
            </div>
          )}
        </div>
      )}

      {/* Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          🌐 Network Error Features
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Error Detection:</h4>
            <ul className="space-y-1">
              <li>• Connection timeouts</li>
              <li>• Server unavailable (503)</li>
              <li>• DNS resolution failures</li>
              <li>• CORS errors</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Recovery Strategies:</h4>
            <ul className="space-y-1">
              <li>• Exponential backoff retry</li>
              <li>• Circuit breaker pattern</li>
              <li>• Offline mode fallback</li>
              <li>• Error reporting & analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
