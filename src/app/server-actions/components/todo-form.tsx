"use client";

import { useOptimistic, useState, useTransition } from "react";
import { addTodo, deleteTodo, toggleTodo } from "../actions";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type OptimisticAction =
  | { type: "add"; text: string }
  | { type: "toggle"; id: number }
  | { type: "delete"; id: number };

export default function TodoForm({ initialTodos }: { initialTodos: Todo[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (state: Todo[], action: OptimisticAction) => {
      switch (action.type) {
        case "add":
          return [
            ...state,
            { id: Date.now(), text: action.text, completed: false },
          ];
        case "toggle":
          return state.map((todo) =>
            todo.id === action.id
              ? { ...todo, completed: !todo.completed }
              : todo,
          );
        case "delete":
          return state.filter((todo) => todo.id !== action.id);
        default:
          return state;
      }
    },
  );

  async function handleAddTodo(formData: FormData) {
    const text = formData.get("text") as string;
    if (!text?.trim()) return;

    setIsSubmitting(true);

    // Optimistic update wrapped in transition
    startTransition(() => {
      addOptimisticTodo({ type: "add", text });
    });

    try {
      await addTodo(formData);
      // Reset form
      const form = document.getElementById("todo-form") as HTMLFormElement;
      form?.reset();
    } catch (error) {
      console.error("Failed to add todo:", error);
      // In a real app, you might want to show an error message
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggleTodo(id: number) {
    // Optimistic update wrapped in transition
    startTransition(() => {
      addOptimisticTodo({ type: "toggle", id });
    });

    try {
      const formData = new FormData();
      formData.append("id", id.toString());
      await toggleTodo(formData);
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  }

  async function handleDeleteTodo(id: number) {
    // Optimistic update wrapped in transition
    startTransition(() => {
      addOptimisticTodo({ type: "delete", id });
    });

    try {
      const formData = new FormData();
      formData.append("id", id.toString());
      await deleteTodo(formData);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Todo List with Optimistic Updates
      </h3>

      {/* Add Todo Form */}
      <form id="todo-form" action={handleAddTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            name="text"
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting || isPending ? "Adding..." : "Add"}
          </button>
        </div>
      </form>

      {/* Todo List */}
      <div className="space-y-2">
        {optimisticTodos.length === 0 ? (
          <p className="text-gray-500 italic">No todos yet. Add one above!</p>
        ) : (
          optimisticTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 border rounded-md transition-all ${
                todo.completed
                  ? "bg-gray-50 border-gray-200"
                  : "bg-white border-gray-300"
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggleTodo(todo.id)}
                disabled={isPending}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors disabled:opacity-50 ${
                  todo.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-300 hover:border-green-500"
                }`}
              >
                {todo.completed && (
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <title>Completed</title>
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              <span
                className={`flex-1 ${
                  todo.completed
                    ? "text-gray-500 line-through"
                    : "text-gray-900"
                }`}
              >
                {todo.text}
              </span>

              <button
                type="button"
                onClick={() => handleDeleteTodo(todo.id)}
                disabled={isPending}
                className="text-red-500 hover:text-red-700 p-1 transition-colors disabled:opacity-50"
                title="Delete todo"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <title>Delete</title>
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Features demonstrated:</strong>
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Optimistic UI updates with useOptimistic</li>
          <li>Transitions with useTransition for better performance</li>
          <li>CRUD operations via Server Actions</li>
          <li>Immediate feedback for better UX</li>
          <li>Automatic state synchronization</li>
          <li>Error handling and rollback</li>
        </ul>
      </div>
    </div>
  );
}
