"use client";

import { useState } from "react";

interface SubmissionResponse {
  success: boolean;
  submissionId?: string;
  message?: string;
  error?: string;
}

export default function ContactWithAfterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<SubmissionResponse | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResponse(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const startTime = Date.now();

      const res = await fetch("/api/contact-with-after", {
        method: "POST",
        body: formData,
      });

      const data: SubmissionResponse = await res.json();
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (res.ok) {
        setResponse({
          ...data,
          message: `${data.message} (Response time: ${responseTime}ms)`,
        });
        form.reset();

        // Show background processing message after a delay
        setTimeout(() => {
          setResponse((prev) =>
            prev
              ? {
                  ...prev,
                  message: `${prev.message} - Background tasks are running asynchronously!`,
                }
              : null,
          );
        }, 1000);
      } else {
        setResponse(data);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setResponse({
        success: false,
        error: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Brief subject line"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            disabled={isSubmitting}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical"
            placeholder="Your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit with Background Processing"
          )}
        </button>
      </form>

      {/* Response Display */}
      {response && (
        <div
          className={`mt-6 p-4 rounded-md ${
            response.success
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-start">
            <div className="shrink-0">
              {response.success ? (
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h3
                className={`text-sm font-medium ${
                  response.success ? "text-green-800" : "text-red-800"
                }`}
              >
                {response.success ? "Success!" : "Error"}
              </h3>
              <div
                className={`mt-2 text-sm ${
                  response.success ? "text-green-700" : "text-red-700"
                }`}
              >
                <p>{response.message || response.error}</p>
                {response.success && response.submissionId && (
                  <p className="mt-1 text-xs opacity-75">
                    Submission ID: {response.submissionId}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Information */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          🔍 What happens when you submit:
        </h4>
        <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
          <li>
            Form data is sent to{" "}
            <code className="bg-gray-200 px-1 rounded">
              /api/contact-with-after
            </code>
          </li>
          <li>API responds immediately with success message</li>
          <li>Background tasks start running asynchronously:</li>
          <li className="ml-4">📊 Analytics logging</li>
          <li className="ml-4">📧 Email notification to admin</li>
          <li className="ml-4">📈 Database statistics update</li>
          <li>Check the server console to see background task logs!</li>
        </ol>
      </div>
    </div>
  );
}
