"use client";

import { useState } from "react";
import ErrorReporter from "../components/error-reporter";
import type { AppError } from "../lib/errors";

export default function ValidationErrorsPage() {
  const [formData, setFormData] = useState({
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, AppError>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function validateField(name: string, value: string): AppError | null {
    switch (name) {
      case "email":
        if (!value) {
          return {
            name: "ValidationError",
            message: "Email is required",
            type: "validation",
            code: "REQUIRED_FIELD",
            retryable: false,
            details: { field: "email", constraint: "required" },
          };
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return {
            name: "ValidationError",
            message: "Please enter a valid email address",
            type: "validation",
            code: "INVALID_FORMAT",
            retryable: false,
            details: { field: "email", pattern: "email" },
          };
        }
        break;

      case "age": {
        if (!value) {
          return {
            name: "ValidationError",
            message: "Age is required",
            type: "validation",
            code: "REQUIRED_FIELD",
            retryable: false,
            details: { field: "age", constraint: "required" },
          };
        }
        const ageNum = Number.parseInt(value, 10);
        if (Number.isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
          return {
            name: "ValidationError",
            message: "Age must be a number between 0 and 150",
            type: "validation",
            code: "INVALID_RANGE",
            retryable: false,
            details: { field: "age", min: 0, max: 150 },
          };
        }
        break;
      }

      case "password":
        if (!value) {
          return {
            name: "ValidationError",
            message: "Password is required",
            type: "validation",
            code: "REQUIRED_FIELD",
            retryable: false,
            details: { field: "password", constraint: "required" },
          };
        }
        if (value.length < 8) {
          return {
            name: "ValidationError",
            message: "Password must be at least 8 characters long",
            type: "validation",
            code: "MIN_LENGTH",
            retryable: false,
            details: { field: "password", minLength: 8 },
          };
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          return {
            name: "ValidationError",
            message: "Passwords do not match",
            type: "validation",
            code: "MATCH_REQUIRED",
            retryable: false,
            details: { field: "confirmPassword", matchField: "password" },
          };
        }
        break;
    }
    return null;
  }

  function handleFieldChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Validate on blur for better UX
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Validate all fields
    const newErrors: Record<string, AppError> = {};
    for (const [name, value] of Object.entries(formData)) {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ email: "", age: "", password: "", confirmPassword: "" });
    }

    setIsSubmitting(false);
  }

  function handleRetry(fieldName: string) {
    // Clear specific field error to allow retry
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Validation Error Handling
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Demonstrates form validation patterns, real-time feedback, and
          user-friendly error messaging for input validation and data
          constraints.
        </p>
      </div>

      {/* Interactive Form Demo */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          📝 Interactive Form Validation
        </h2>

        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">✅ Form submitted successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="mt-2">
                <ErrorReporter
                  error={errors.email}
                  onRetry={() => handleRetry("email")}
                />
              </div>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={(e) => handleFieldChange("age", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.age ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your age"
              min="0"
              max="150"
            />
            {errors.age && (
              <div className="mt-2">
                <ErrorReporter
                  error={errors.age}
                  onRetry={() => handleRetry("age")}
                />
              </div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter password (min 8 characters)"
            />
            {errors.password && (
              <div className="mt-2">
                <ErrorReporter
                  error={errors.password}
                  onRetry={() => handleRetry("password")}
                />
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleFieldChange("confirmPassword", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <div className="mt-2">
                <ErrorReporter
                  error={errors.confirmPassword}
                  onRetry={() => handleRetry("confirmPassword")}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Validating..." : "Submit Form"}
          </button>
        </form>
      </div>

      {/* Validation Patterns */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">
          ⚠️ Validation Error Patterns
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-yellow-800 mb-2">
              Field Validation:
            </h4>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>• Required field validation</li>
              <li>• Format validation (email, phone)</li>
              <li>• Range validation (min/max values)</li>
              <li>• Pattern matching (regex)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-yellow-800 mb-2">
              User Experience:
            </h4>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>• Real-time validation feedback</li>
              <li>• Clear error messaging</li>
              <li>• Field-specific error display</li>
              <li>• Retry mechanisms for corrections</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          💡 Validation Best Practices
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Implementation:</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>✓ Validate on both client and server</li>
              <li>✓ Provide immediate feedback</li>
              <li>✓ Use consistent error formats</li>
              <li>✓ Make errors actionable</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Error Messages:</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>→ Be specific about what's wrong</li>
              <li>→ Suggest how to fix the issue</li>
              <li>→ Use positive, helpful language</li>
              <li>→ Avoid technical jargon</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
