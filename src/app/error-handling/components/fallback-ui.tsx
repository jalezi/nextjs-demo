interface FallbackUIProps {
  type: "loading" | "error" | "empty" | "offline";
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export default function FallbackUI({
  type,
  title,
  description,
  action,
}: FallbackUIProps) {
  function getIcon(type: string) {
    switch (type) {
      case "loading":
        return (
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            viewBox="0 0 24 24"
          >
            <title>Loading</title>
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
        );
      case "error":
        return (
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Error</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case "empty":
        return (
          <svg
            className="h-8 w-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Empty</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        );
      case "offline":
        return (
          <svg
            className="h-8 w-8 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Offline</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-12.728 12.728m0 0L5.636 18.364m0 0L18.364 5.636m-12.728 12.728L18.364 5.636"
            />
          </svg>
        );
      default:
        return null;
    }
  }

  function getDefaultContent(type: string) {
    switch (type) {
      case "loading":
        return {
          title: "Loading...",
          description: "Please wait while we fetch your data.",
        };
      case "error":
        return {
          title: "Something went wrong",
          description: "We encountered an error while processing your request.",
        };
      case "empty":
        return {
          title: "No data found",
          description: "There's nothing to display at the moment.",
        };
      case "offline":
        return {
          title: "You're offline",
          description: "Please check your internet connection and try again.",
        };
      default:
        return { title: "Unknown state", description: "" };
    }
  }

  function getColorClasses(type: string) {
    switch (type) {
      case "loading":
        return "bg-blue-50 border-blue-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "empty":
        return "bg-gray-50 border-gray-200";
      case "offline":
        return "bg-orange-50 border-orange-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  }

  const defaultContent = getDefaultContent(type);
  const displayTitle = title ?? defaultContent.title;
  const displayDescription = description ?? defaultContent.description;

  return (
    <div
      className={`rounded-lg border p-8 text-center ${getColorClasses(type)}`}
    >
      <div className="flex justify-center mb-4">{getIcon(type)}</div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {displayTitle}
      </h3>

      {displayDescription && (
        <p className="text-gray-600 mb-4 max-w-md mx-auto">
          {displayDescription}
        </p>
      )}

      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}
