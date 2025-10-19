"use client";

import { useState } from "react";
import type { AppError } from "../lib/errors";

interface ErrorReporterProps {
  error: AppError;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export default function ErrorReporter({
  error,
  onRetry,
  onDismiss,
}: ErrorReporterProps) {
  const [isReporting, setIsReporting] = useState(false);
  const [reported, setReported] = useState(false);

  async function handleReport() {
    setIsReporting(true);

    // Simulate error reporting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Error reported:", {
      type: error.type,
      message: error.message,
      code: error.code,
      details: error.details,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });

    setReported(true);
    setIsReporting(false);
  }

  function getErrorIcon(type: string) {
    switch (type) {
      case "network":
        return "🌐";
      case "validation":
        return "⚠️";
      case "server":
        return "🔧";
      case "timeout":
        return "⏰";
      case "auth":
        return "🔒";
      default:
        return "❌";
    }
  }

  function getErrorColor(type: string) {
    switch (type) {
      case "network":
        return "border-blue-200 bg-blue-50 text-blue-800";
      case "validation":
        return "border-yellow-200 bg-yellow-50 text-yellow-800";
      case "server":
        return "border-red-200 bg-red-50 text-red-800";
      case "timeout":
        return "border-orange-200 bg-orange-50 text-orange-800";
      case "auth":
        return "border-purple-200 bg-purple-50 text-purple-800";
      default:
        return "border-gray-200 bg-gray-50 text-gray-800";
    }
  }

  return (
    <div className={`border rounded-lg p-6 ${getErrorColor(error.type)}`}>
      <div className="flex items-start gap-4">
        <div className="text-2xl">{getErrorIcon(error.type)}</div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold capitalize">
              {error.type} Error
            </h3>
            {error.code && (
              <code className="text-xs bg-white px-2 py-1 rounded border">
                {error.code}
              </code>
            )}
          </div>

          <p className="text-sm mb-4">{error.message}</p>

          {error.details && (
            <details className="mb-4">
              <summary className="text-sm font-medium cursor-pointer hover:underline">
                Technical Details
              </summary>
              <pre className="text-xs bg-white p-3 rounded border mt-2 overflow-x-auto">
                {JSON.stringify(error.details, null, 2)}
              </pre>
            </details>
          )}

          <div className="flex flex-wrap gap-2">
            {error.retryable && onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="bg-white text-gray-700 px-4 py-2 rounded border hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                🔄 Try Again
              </button>
            )}

            <button
              type="button"
              onClick={handleReport}
              disabled={isReporting || reported}
              className="bg-white text-gray-700 px-4 py-2 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {isReporting
                ? "📤 Reporting..."
                : reported
                  ? "✅ Reported"
                  : "📤 Report Issue"}
            </button>

            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="bg-white text-gray-700 px-4 py-2 rounded border hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                ✕ Dismiss
              </button>
            )}
          </div>
        </div>
      </div>

      {reported && (
        <div className="mt-4 p-3 bg-white rounded border">
          <p className="text-sm">
            <span className="font-medium">Thank you!</span> This error has been
            reported to our team. We'll investigate and work on a fix.
          </p>
        </div>
      )}
    </div>
  );
}
