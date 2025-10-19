"use client";

interface RetryButtonProps {
  onRetry: () => void;
  isRetrying: boolean;
  disabled?: boolean;
  retryCount?: number;
  maxRetries?: number;
}

export default function RetryButton({
  onRetry,
  isRetrying,
  disabled = false,
  retryCount = 0,
  maxRetries = 3,
}: RetryButtonProps) {
  const hasRetriesLeft = retryCount < maxRetries;
  const buttonDisabled = disabled || isRetrying || !hasRetriesLeft;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onRetry}
        disabled={buttonDisabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
          buttonDisabled
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
        }`}
      >
        {isRetrying ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <title>Retrying</title>
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Retrying...
          </>
        ) : (
          <>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Retry</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {hasRetriesLeft ? "Try Again" : "Max Retries Reached"}
          </>
        )}
      </button>

      {/* Retry count indicator */}
      <div className="text-sm text-gray-600">
        {retryCount > 0 && (
          <span>
            Attempt {retryCount + 1} of {maxRetries + 1}
          </span>
        )}
      </div>

      {/* Progress indicator */}
      {maxRetries > 0 && (
        <div className="flex-1 max-w-32">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                retryCount >= maxRetries ? "bg-red-500" : "bg-blue-500"
              }`}
              style={{
                width: `${Math.min((retryCount / maxRetries) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
