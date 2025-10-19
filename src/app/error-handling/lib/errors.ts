// Error types for demonstration
/** biome-ignore-all lint/suspicious/noExplicitAny: For demo purposes */
export type ErrorType =
  | "network"
  | "validation"
  | "server"
  | "timeout"
  | "auth";

export interface AppError extends Error {
  type: ErrorType;
  code?: string;
  retryable?: boolean;
  details?: Record<string, any>;
}

export function createError(
  type: ErrorType,
  message: string,
  options?: {
    code?: string;
    retryable?: boolean;
    details?: Record<string, any>;
  },
): AppError {
  const error = new Error(message) as AppError;
  error.type = type;
  error.code = options?.code;
  error.retryable = options?.retryable ?? false;
  error.details = options?.details;
  return error;
}

// Simulated API functions that throw different types of errors
export async function fetchWithNetworkError(): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  throw createError("network", "Failed to connect to server", {
    code: "NETWORK_ERROR",
    retryable: true,
    details: { endpoint: "/api/data", status: 503 },
  });
}

export async function fetchWithValidationError(): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  throw createError("validation", "Invalid request parameters", {
    code: "VALIDATION_ERROR",
    retryable: false,
    details: { field: "email", reason: "Invalid format" },
  });
}

export async function fetchWithServerError(): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  throw createError("server", "Internal server error occurred", {
    code: "INTERNAL_ERROR",
    retryable: true,
    details: { timestamp: new Date().toISOString(), trace: "error-trace-123" },
  });
}

export async function fetchWithTimeoutError(): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  throw createError("timeout", "Request timed out", {
    code: "TIMEOUT_ERROR",
    retryable: true,
    details: { timeout: 30000, elapsed: 30001 },
  });
}

export async function fetchWithAuthError(): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  throw createError("auth", "Authentication required", {
    code: "AUTH_ERROR",
    retryable: false,
    details: { redirectTo: "/login" },
  });
}

// Successful fetch for contrast
export async function fetchSuccess(): Promise<{
  data: string;
  timestamp: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    data: "Successfully fetched data!",
    timestamp: new Date().toISOString(),
  };
}

// Retry utility
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<T> {
  let lastError: Error = new Error("Unknown error occurred");

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Don't retry if it's not retryable
      if (
        error &&
        typeof error === "object" &&
        "retryable" in error &&
        !(error as AppError).retryable
      ) {
        throw error;
      }

      // Don't retry on last attempt
      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying with exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay * 2 ** attempt));
    }
  }

  throw lastError;
}
