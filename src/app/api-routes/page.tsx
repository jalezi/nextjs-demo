import { NextJSInfo } from "../components/nextjs-info";
import ContactWithAfterForm from "./components/contact-with-after-form";

export default function APIRoutesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          API Routes Demo
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore Next.js API Routes with the new{" "}
          <code className="bg-gray-100 px-2 py-1 rounded text-sm">after</code>{" "}
          API for background tasks. This demonstrates how to handle immediate
          responses while processing background operations asynchronously.
        </p>
      </div>

      {/* Key Concepts */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-900 mb-3">
          🚀 API Routes with `after` API Key Concepts
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-green-800 mb-2">
              Core Features:
            </h3>
            <ul className="space-y-1 text-green-700">
              <li>• Immediate response to user</li>
              <li>• Background task processing</li>
              <li>• Non-blocking operations</li>
              <li>• Built-in error handling</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-800 mb-2">Use Cases:</h3>
            <ul className="space-y-1 text-green-700">
              <li>• Analytics tracking</li>
              <li>• Email notifications</li>
              <li>• Database logging</li>
              <li>• Third-party integrations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison with Server Actions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">
          📊 API Routes vs Server Actions
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="bg-white p-4 rounded border">
            <h3 className="font-semibold text-blue-800 mb-2">
              🔗 API Routes (This Page)
            </h3>
            <ul className="space-y-1 text-blue-700">
              <li>• Traditional REST endpoints</li>
              <li>• Client-side fetch() calls</li>
              <li>• JSON request/response</li>
              <li>
                • Background tasks with{" "}
                <code className="bg-blue-100 px-1 rounded">after</code>
              </li>
              <li>• Requires JavaScript</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border">
            <h3 className="font-semibold text-green-800 mb-2">
              ⚡ Server Actions
            </h3>
            <ul className="space-y-1 text-green-700">
              <li>• Form-centric approach</li>
              <li>• Progressive enhancement</li>
              <li>• Works without JavaScript</li>
              <li>• Automatic revalidation</li>
              <li>• Type-safe by default</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>💡 Tip:</strong> Compare this implementation with the
            <a
              href="/server-actions"
              className="text-blue-600 hover:underline mx-1"
            >
              Server Actions demo
            </a>
            to see different approaches to form handling in Next.js.
          </p>
        </div>
      </div>

      {/* Contact Form with After API */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📧 Contact Form with Background Processing
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          This form demonstrates the{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">after</code> API. When
          you submit, you'll get an immediate response while background tasks
          (analytics, notifications, logging) run asynchronously.
        </p>

        <ContactWithAfterForm />
      </div>

      {/* Technical Implementation */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          🔧 Technical Implementation
        </h2>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              API Route Structure:
            </h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
              {`// /api/contact-with-after/route.ts
import { after } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  
  // Immediate processing
  const submissionId = \`submission_\${Date.now()}\`;
  
  // Background tasks (non-blocking)
  after(async () => {
    await logAnalytics(formData);
    await sendNotification(formData);
    await updateStats(submissionId);
  });
  
  // Immediate response
  return Response.json({ success: true, submissionId });
}`}
            </pre>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Key Benefits:</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>User gets immediate feedback (fast response)</li>
              <li>Background tasks don't block the UI</li>
              <li>Improved perceived performance</li>
              <li>Graceful error handling for background operations</li>
            </ul>
          </div>
        </div>
      </div>

      <NextJSInfo renderingMode="SSR">
        <p>
          <strong>API Routes:</strong> This page uses traditional API routes
          with client-side fetch calls. The form data is sent via POST request
          to{" "}
          <code className="bg-gray-100 px-1 rounded">
            /api/contact-with-after
          </code>{" "}
          which processes the submission immediately and handles background
          tasks using the{" "}
          <code className="bg-gray-100 px-1 rounded">after</code> API.
        </p>
        <p className="mt-2">
          <strong>Background Processing:</strong> The{" "}
          <code className="bg-gray-100 px-1 rounded">after</code> function
          allows you to run tasks after the response is sent, perfect for
          analytics, logging, or notifications that shouldn't delay user
          feedback.
        </p>
      </NextJSInfo>
    </div>
  );
}
