/** biome-ignore-all lint/suspicious/noArrayIndexKey: For demo it's ok */
import Image from "next/image";
import { Suspense } from "react";
import { fetchComments, fetchUserProfile } from "../lib/data";

async function UserProfile() {
  const profile = await fetchUserProfile(1000);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={profile.avatar}
          alt={profile.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {profile.name}
          </h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600">
            {profile.stats.posts}
          </div>
          <div className="text-sm text-gray-600">Posts</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">
            {profile.stats.followers}
          </div>
          <div className="text-sm text-gray-600">Followers</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600">
            {profile.stats.following}
          </div>
          <div className="text-sm text-gray-600">Following</div>
        </div>
      </div>
    </div>
  );
}

async function PostComments() {
  const comments = await fetchComments(1, 2000);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Comments
      </h3>
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="border-l-4 border-blue-200 pl-4">
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-gray-900">
                {comment.author}
              </span>
              <span className="text-xs text-gray-500">{comment.timestamp}</span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
        <div>
          <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {[...Array(3)].map((_, i) => (
          <div key={`stat-${i}`}>
            <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-1 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-16 mx-auto animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CommentsSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-5 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={`comment-${i}`} className="border-l-4 border-gray-200 pl-4">
            <div className="flex justify-between items-start mb-1">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NestedPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Nested Suspense Boundaries
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Demonstration of nested Suspense boundaries where different components
          load at different speeds, each with their own loading states.
        </p>
      </div>

      {/* Nested Suspense Demo */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* User Profile - loads in 1s */}
        <Suspense fallback={<ProfileSkeleton />}>
          <UserProfile />
        </Suspense>

        {/* Comments - loads in 2s */}
        <Suspense fallback={<CommentsSkeleton />}>
          <PostComments />
        </Suspense>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">
          🔄 Loading Sequence
        </h2>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>
              <strong>Step 1:</strong> Page shell loads immediately
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>
              <strong>Step 2:</strong> User Profile loads (1 second)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full" />
            <span>
              <strong>Step 3:</strong> Comments load (2 seconds)
            </span>
          </div>
        </div>

        <div className="mt-4 text-sm text-blue-700">
          <p>
            Each component has its own Suspense boundary, so they load
            independently. The user sees content progressively without waiting
            for the slowest component.
          </p>
        </div>
      </div>

      {/* Performance Info */}
      <div className="text-center text-sm text-gray-600">
        <p>⏱️ Page rendered at: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
