"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class NetworkErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Network Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌐</span>
            <h2 className="text-xl font-semibold text-red-900">
              Network Connection Error
            </h2>
          </div>

          <p className="text-red-800 mb-4">
            We're having trouble connecting to our servers. This could be due
            to:
          </p>

          <ul className="list-disc list-inside text-red-700 text-sm mb-6 space-y-1">
            <li>Poor internet connection</li>
            <li>Server maintenance</li>
            <li>Network configuration issues</li>
            <li>Firewall or proxy blocking the request</li>
          </ul>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Try Again
            </button>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50"
            >
              Reload Page
            </button>
          </div>

          {this.state.error && (
            <details className="mt-4">
              <summary className="text-sm font-medium text-red-800 cursor-pointer">
                Technical Details
              </summary>
              <pre className="text-xs bg-white p-3 rounded border mt-2 overflow-x-auto text-red-700">
                {this.state.error.message}
                {this.state.error.stack && `\n\n${this.state.error.stack}`}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
