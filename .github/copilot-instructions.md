# Next.js Demo - AI Coding Agent Instructions

## Project Overview

This is a **comprehensive Next.js 15.5.6 App Router demonstration** showcasing different rendering strategies, advanced routing patterns, and modern React 19 features. The codebase is educational and demonstrates patterns rather than implementing business logic.

**Important**: All application code is located in `src/app/` directory following Next.js best practices.

## Key Architecture Patterns

### Rendering Strategy Architecture

The app demonstrates 4 distinct rendering patterns with specific use cases:

- **Static (`/static`)**: Default Next.js caching, pre-rendered at build time
- **Dynamic (`/dynamic`)**: `export const dynamic = "force-dynamic"` + `cache: "no-store"`
- **ISR (`/isr`, `/posts`)**: `export const revalidate = 60` for time-based regeneration  
- **SSG with Params (`/ssg/[id]`)**: `generateStaticParams()` for pre-rendered dynamic routes

### Advanced Routing Patterns

**Parallel Routes (`/parallel/`)**: Layout accepts multiple slot props (`team`, `analytics`) rendered simultaneously using `@team/` and `@analytics/` directories.

**Intercepting Routes (`/photos/`)**: Modal pattern where:
- `@modal/(.)[id]/page.tsx` intercepts navigation to show modal overlay
- `[id]/page.tsx` handles direct URL access/refresh as full page
- Layout renders `{children}` and `{modal}` together

### Next.js 15 Compatibility Requirements

**Critical**: All dynamic routes must properly handle async `params`:

```typescript
// ✅ Correct (Next.js 15+)
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Use id here
}

// ❌ Incorrect (will cause errors)
export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id; // Error: params must be awaited
}
```

### Data Fetching Conventions

Always handle API failures gracefully with fallback data:

```typescript
try {
  const res = await fetch(url, { next: { revalidate: 60 } });
  data = await res.json();
} catch (e) {
  // Fallback data for demo reliability
  data = { /* static fallback */ };
}
```

## Development Workflow

### Essential Commands

- `pnpm dev` - Development with **Turbopack** (faster than Webpack)
- `pnpm dev:safe` - Clean development start (removes `.next/` cache)  
- `pnpm lint` - **Biome** linting (replaces ESLint + Prettier)
- `pnpm format` - Biome formatting
- `pnpm type-check` - TypeScript validation without build

### Technology Stack Specifics

- **Biome** replaces ESLint/Prettier - use `biome.json` for configuration
- **Tailwind CSS v4** - No config file needed, uses PostCSS only
- **Turbopack** - Enabled by default for dev and build
- **pnpm** - Package manager (not npm/yarn)

## File Conventions

### Special File Patterns

- `loading.tsx` - Suspense boundaries with skeleton UI
- `error.tsx` - Error boundaries with retry functionality ("use client" required)
- `not-found.tsx` - Custom 404 pages
- `default.tsx` - Default content for parallel route slots

### Component Patterns

Client components use `"use client"` for:
- Router hooks (`useParams`, `useRouter`)
- Event handlers and interactivity
- Error boundaries

Server components (default) for:
- Data fetching with native `fetch()`
- SEO metadata
- Static content rendering

## External Dependencies

### Images and APIs

- **Picsum Photos**: `https://picsum.photos/seed/{name}/{width}/{height}` for placeholder images
- **GitHub API**: `https://api.github.com/repos/vercel/next.js` for live data demos
- **JSONPlaceholder**: `https://jsonplaceholder.typicode.com/posts/{id}` for SSG examples

### Configuration Notes

- `next.config.ts` allows `picsum.photos` domain for Next.js Image optimization
- All external API calls include error handling with fallback data
- Time-based revalidation set to 60 seconds for demo visibility

## Critical Code Patterns

When adding new routes, maintain the educational structure:
1. Include timestamp rendering to show caching behavior
2. Add explanatory text about the rendering strategy
3. Provide navigation links in root layout
4. Include error states and loading UI where appropriate
5. Use consistent styling with Tailwind utility classes

The root `layout.tsx` navigation should be updated when adding new demo routes to maintain the educational flow.

## Project Structure

All demo code is located in `src/app/` following Next.js 15 best practices:

```
src/app/
├── layout.tsx                 # Root layout with navigation
├── page.tsx                   # Home page (Static)
├── globals.css                # Global styles
├── error.tsx                  # Root error boundary
├── not-found.tsx              # Root 404 page
├── dynamic/                   # SSR examples
├── isr/                       # ISR examples
├── parallel/                  # Parallel routes demo
├── photos/                    # Intercepting routes demo
├── posts/                     # ISR with dynamic routes
├── ssg/                       # SSG with params
└── static/                    # Static generation demo
```

## Planning and Tasks

Future improvements are documented in `/docs/tasks/IMPROVEMENT_TASKS.md` including:
- Server Actions implementation
- Performance monitoring dashboard
- Advanced streaming patterns
- Security best practices
- PWA capabilities