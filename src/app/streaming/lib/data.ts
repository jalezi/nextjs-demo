// Simulated slow data fetching functions for demonstration

export async function fetchSlowData(
  delay: number = 2000,
): Promise<{ id: number; title: string; description: string }[]> {
  await new Promise((resolve) => setTimeout(resolve, delay));

  return [
    {
      id: 1,
      title: "Slow Loading Content",
      description:
        "This content took a while to load, demonstrating streaming behavior.",
    },
    {
      id: 2,
      title: "Async Data Fetch",
      description: "Simulated network request with artificial delay.",
    },
    {
      id: 3,
      title: "Progressive Loading",
      description: "Content appears progressively as data becomes available.",
    },
  ];
}

export async function fetchFastData(
  delay: number = 500,
): Promise<{ id: number; content: string }[]> {
  await new Promise((resolve) => setTimeout(resolve, delay));

  return [
    { id: 1, content: "Quick loading item 1" },
    { id: 2, content: "Quick loading item 2" },
    { id: 3, content: "Quick loading item 3" },
    { id: 4, content: "Quick loading item 4" },
  ];
}

export async function fetchUserProfile(delay: number = 1500): Promise<{
  name: string;
  email: string;
  avatar: string;
  stats: { posts: number; followers: number; following: number };
}> {
  await new Promise((resolve) => setTimeout(resolve, delay));

  return {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://picsum.photos/seed/user/100/100",
    stats: {
      posts: 42,
      followers: 1234,
      following: 567,
    },
  };
}

export async function fetchPosts(delay: number = 3000): Promise<
  Array<{
    id: number;
    title: string;
    excerpt: string;
    author: string;
    publishedAt: string;
  }>
> {
  await new Promise((resolve) => setTimeout(resolve, delay));

  return [
    {
      id: 1,
      title: "Understanding React Suspense",
      excerpt: "Learn how React Suspense works with streaming SSR...",
      author: "Jane Smith",
      publishedAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Next.js 15 New Features",
      excerpt: "Exploring the latest features in Next.js 15...",
      author: "Mike Johnson",
      publishedAt: "2024-01-10",
    },
    {
      id: 3,
      title: "Performance Optimization Tips",
      excerpt: "Best practices for optimizing React applications...",
      author: "Sarah Wilson",
      publishedAt: "2024-01-05",
    },
  ];
}

export async function fetchComments(
  _postId: number,
  delay: number = 2500,
): Promise<
  Array<{
    id: number;
    author: string;
    content: string;
    timestamp: string;
  }>
> {
  await new Promise((resolve) => setTimeout(resolve, delay));

  return [
    {
      id: 1,
      author: "Alice",
      content: "Great article! Very informative.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Bob",
      content: "Thanks for sharing these insights.",
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      author: "Charlie",
      content: "Looking forward to trying these techniques.",
      timestamp: "6 hours ago",
    },
  ];
}
