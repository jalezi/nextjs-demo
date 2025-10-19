"use server";

import { revalidatePath } from "next/cache";

// Simulated database (in memory for demo)
let todoItems: Array<{ id: number; text: string; completed: boolean }> = [
  { id: 1, text: "Learn Server Actions", completed: false },
  { id: 2, text: "Build demo app", completed: true },
];

const contacts: Array<{
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
}> = [];

let nextTodoId = 3;
let nextContactId = 1;

// Contact form action
export async function submitContact(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Validate inputs
  if (!name || !email || !message) {
    throw new Error("All fields are required");
  }

  if (!email.includes("@")) {
    throw new Error("Please enter a valid email address");
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Add to simulated database
  contacts.push({
    id: nextContactId++,
    name,
    email,
    message,
    timestamp: new Date(),
  });

  // Revalidate the page to show updated data
  revalidatePath("/server-actions");

  // Redirect to success page (optional)
  // redirect("/server-actions?success=true");
}

// Todo CRUD actions
export async function addTodo(formData: FormData) {
  const text = formData.get("text") as string;

  if (!text || text.trim().length === 0) {
    throw new Error("Todo text is required");
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  todoItems.push({
    id: nextTodoId++,
    text: text.trim(),
    completed: false,
  });

  revalidatePath("/server-actions");
}

export async function toggleTodo(formData: FormData) {
  const id = parseInt(formData.get("id") as string, 10);

  const todo = todoItems.find((item) => item.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }

  revalidatePath("/server-actions");
}

export async function deleteTodo(formData: FormData) {
  const id = parseInt(formData.get("id") as string, 10);

  todoItems = todoItems.filter((item) => item.id !== id);

  revalidatePath("/server-actions");
}

// File upload action
export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file provided");
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size must be less than 5MB");
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "text/plain"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("File type not supported");
  }

  // Simulate file processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // In a real app, you would save the file to storage
  console.log(`File uploaded: ${file.name}, Size: ${file.size} bytes`);

  revalidatePath("/server-actions");

  return {
    success: true,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  };
}

// Data fetchers for displaying current state
export async function getTodos() {
  return todoItems;
}

export async function getContacts() {
  return contacts;
}
