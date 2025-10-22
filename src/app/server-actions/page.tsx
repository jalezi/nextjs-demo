import { NextJSInfo } from "../components/nextjs-info";
import { getContacts, getTodos } from "./actions";
import ContactForm from "./components/contact-form";
import TodoForm from "./components/todo-form";
import UploadForm from "./components/upload-form";

export default async function ServerActionsPage() {
  // Fetch initial data for components
  const todos = await getTodos();
  const contacts = await getContacts();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Server Actions Demo
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore Next.js Server Actions for form handling, data mutations, and
          progressive enhancement. All forms work without JavaScript and provide
          enhanced experiences when enabled.
        </p>
      </div>

      {/* Key Concepts */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">
          🚀 Server Actions Key Concepts
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Core Features:</h3>
            <ul className="space-y-1 text-blue-700">
              <li>• Server-side form processing</li>
              <li>• Progressive enhancement</li>
              <li>• Automatic revalidation</li>
              <li>• Type-safe mutations</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Benefits:</h3>
            <ul className="space-y-1 text-blue-700">
              <li>• Works without JavaScript</li>
              <li>• Reduced bundle size</li>
              <li>• Better SEO and accessibility</li>
              <li>• Optimistic UI updates</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Demo Components */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <ContactForm />

        {/* Todo List */}
        <TodoForm initialTodos={todos} />
      </div>

      {/* File Upload */}
      <div className="max-w-2xl mx-auto">
        <UploadForm />
      </div>

      {/* Current Data Display */}
      {contacts.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Recent Contact Submissions
          </h3>
          <div className="space-y-3">
            {contacts
              .slice(-3)
              .reverse()
              .map((contact) => (
                <div key={contact.id} className="bg-white p-4 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{contact.name}</h4>
                    <span className="text-sm text-gray-500">
                      {contact.timestamp.toLocaleDateString()}{" "}
                      {contact.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
                  <p className="text-sm">{contact.message}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Technical Details */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          🔧 Technical Implementation
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Server Actions</h3>
            <ul className="space-y-1 text-gray-700">
              <li>
                • <code>"use server"</code> directive
              </li>
              <li>• FormData handling</li>
              <li>• Server-side validation</li>
              <li>• Automatic serialization</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Client Enhancement</h3>
            <ul className="space-y-1 text-gray-700">
              <li>
                • <code>useOptimistic</code> hook
              </li>
              <li>• Loading states</li>
              <li>• Error boundaries</li>
              <li>• Form validation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Data Flow</h3>
            <ul className="space-y-1 text-gray-700">
              <li>
                • <code>revalidatePath()</code>
              </li>
              <li>• Cache invalidation</li>
              <li>• Optimistic updates</li>
              <li>• State synchronization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Info */}
      <div className="text-center text-sm text-gray-600">
        <p>
          ⏱️ Page rendered at: {new Date().toLocaleString()}
          <span className="ml-4">
            📊 {todos.length} todos, {contacts.length} contacts
          </span>
        </p>
      </div>

      <NextJSInfo renderingMode="SSR">
        <p>
          <strong>Server Actions Note:</strong> This page demonstrates Next.js
          Server Actions with progressive enhancement. Forms work without
          JavaScript and are enhanced when it's available. Server Actions run on
          every request and provide type-safe mutations.
        </p>
      </NextJSInfo>
    </div>
  );
}
