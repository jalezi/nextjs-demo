"use client";

import { useState, useTransition } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ProgressiveForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) return;

    // Use transition for non-urgent updates
    startTransition(() => {
      setSubmissions((prev) => [...prev, formData]);
      setFormData({ name: "", email: "", message: "" });
    });
  }

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-purple-900 mb-4">
        🔄 Progressive Enhancement Form
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={
            isPending || !formData.name || !formData.email || !formData.message
          }
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Submissions List */}
      {submissions.length > 0 && (
        <div className="border-t border-purple-200 pt-4">
          <h4 className="font-medium text-purple-900 mb-3">
            Recent Submissions:
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {submissions
              .slice(-3)
              .reverse()
              .map((submission, index) => (
                <div
                  key={`submission-${submissions.length - index}`}
                  className="bg-white p-3 rounded border text-sm"
                >
                  <div className="font-medium">{submission.name}</div>
                  <div className="text-gray-600">{submission.email}</div>
                  <div className="text-gray-700 mt-1">{submission.message}</div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-purple-600">
        💡 Uses useTransition for non-blocking updates
      </div>
    </div>
  );
}
