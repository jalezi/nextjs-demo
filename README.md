# Next.js Demo App - Complete Features

[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/) [![Linted with Biome](https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/) [![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)

A comprehensive demonstration of Next.js 16 App Router features including different rendering strategies, data fetching methods, parallel routes, intercepting routes, API routes with background processing, and error handling.

## Features Demonstrated

### Rendering Strategies

- ✅ **Static Site Generation (SSG)** - Pre-rendered at build time
- ✅ **Server-Side Rendering (SSR)** - Rendered on each request
- ✅ **Incremental Static Regeneration (ISR)** - Static with time-based revalidation
- ✅ **SSG with Dynamic Params** - Static pages with dynamic routes

### Data Fetching & Caching

- ✅ Default caching behavior
- ✅ `cache: 'no-store'` for dynamic data
- ✅ `revalidate` for ISR
- ✅ Time-based revalidation strategies

### Special Files

- ✅ `loading.tsx` - Loading UI with Suspense
- ✅ `error.tsx` - Error boundaries
- ✅ `not-found.tsx` - Custom 404 pages
- ✅ `layout.tsx` - Nested layouts

### Advanced Routing

- ✅ **Parallel Routes** - Render multiple pages simultaneously
- ✅ **Intercepting Routes** - Show modals while maintaining URL structure

### API Routes & Server Actions

- ✅ **Server Actions** - Form handling with progressive enhancement
- ✅ **API Routes** - Traditional REST endpoints with modern features
- ✅ **Background Processing** - Non-blocking tasks with 'after' API
- ✅ **Progressive Enhancement** - Works without JavaScript

## Project Structure

```text
nextjs-demo/
├── src/
│   └── app/                          # Main application directory
│       ├── layout.tsx                # Root layout with navigation
│       ├── page.tsx                  # Home page (Static)
│       ├── globals.css               # Global styles
│       ├── error.tsx                 # Root error boundary
│       ├── not-found.tsx             # Root 404 page
│       │
│       ├── api/
│       │   └── contact-with-after/
│       │       └── route.ts          # API route with 'after' API demo
│       │
│       ├── api-routes/
│       │   ├── page.tsx              # API Routes demo page
│       │   ├── loading.tsx           # Loading state
│       │   └── components/
│       │       └── contact-with-after-form.tsx  # Form component
│       │
│       ├── server-actions/
│       │   ├── page.tsx              # Server Actions demo page
│       │   ├── actions.ts            # Server Action definitions
│       │   ├── loading.tsx           # Loading state
│       │   └── components/
│       │       ├── contact-form.tsx  # Contact form with Server Actions
│       │       ├── todo-form.tsx     # Todo CRUD with optimistic UI
│       │       └── upload-form.tsx   # File upload example
│       │
│       ├── static/
│       │   └── page.tsx              # Static page example
│       │
│       ├── dynamic/
│       │   ├── page.tsx              # Dynamic (SSR) page
│       │   ├── loading.tsx           # Loading state
│       │   └── error.tsx             # Error boundary
│       │
│       ├── isr/
│       │   └── page.tsx              # ISR page (60s revalidation)
│       │
│       ├── ssg/
│       │   └── [id]/
│       │       └── page.tsx          # SSG with dynamic params
│       │
│       ├── posts/
│       │   ├── page.tsx              # Posts list (ISR)
│       │   ├── loading.tsx           # Posts loading
│       │   └── [id]/
│       │       ├── page.tsx          # Individual post
│       │       ├── loading.tsx       # Post loading
│       │       ├── error.tsx         # Post error
│       │       └── not-found.tsx     # Post not-found
│       │
│       ├── parallel/
│       │   ├── layout.tsx            # Layout with parallel routes
│       │   ├── page.tsx              # Main content
│       │   ├── @team/
│       │   │   └── page.tsx          # Team slot
│       │   └── @analytics/
│       │       └── page.tsx          # Analytics slot
│       │
│       └── photos/
│           ├── layout.tsx            # Photos layout with modal slot
│           ├── page.tsx              # Photo gallery
│           ├── [id]/
│           │   └── page.tsx          # Full photo page
│           └── @modal/
│               ├── default.tsx       # Default modal (null)
│               └── (.)[id]/
│                   └── page.tsx      # Intercepting route modal
│
├── docs/                             # Documentation
│   ├── QUICK_REFERENCE.md           # Quick reference guide
│   └── SETUP_GUIDE.md               # Detailed setup guide
├── tasks/                            # Project planning and tasks
│   └── IMPROVEMENT_TASKS.md          # Future enhancement roadmap
├── package.json
├── tsconfig.json
├── biome.json                        # Biome configuration
├── postcss.config.mjs                # PostCSS configuration
└── next.config.ts                    # Next.js configuration
```

## Installation

### Quick Start (Recommended)

1. Create a new Next.js app with modern setup:

   ```bash
   npm create next-app@latest nextjs-demo
   ```

   Select these options when prompted:
   - ✅ **TypeScript**: Yes
   - ✅ **Biome**: Yes (for linting/formatting)
   - ✅ **Tailwind CSS**: Yes
   - ✅ **App Router**: Yes
   - ✅ **Turbopack**: Yes

2. Navigate to the project and install with pnpm:

   ```bash
   cd nextjs-demo
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

### Alternative: Manual Setup

If you prefer npm:

```bash
cd nextjs-demo
npm install
npm run dev
```

## Testing the Features

### Static Site Generation (SSG)

- Visit `/static` - Note the timestamp doesn't change on refresh

### Server-Side Rendering (SSR)

- Visit `/dynamic` - Timestamp updates on every refresh
- Watch the loading state when navigating

### Incremental Static Regeneration (ISR)

- Visit `/isr` - Note the timestamp
- Wait 30+ seconds and refresh twice
- First refresh shows old data (stale-while-revalidate)
- Second refresh shows updated data

### SSG with Dynamic Params

- Visit `/ssg/1`, `/ssg/2`, or `/ssg/3`
- These pages are pre-rendered at build time

### Error Boundaries

- Visit `/posts/999` to trigger an error
- See the custom error UI with "Try again" button

### Not Found Pages

- Visit `/posts/12345` to see custom 404 page
- Visit `/nonexistent` to see root 404 page

### Loading States

- Navigate to `/posts` or `/dynamic` from another page
- Watch the skeleton loading UI appear

### Parallel Routes

- Visit `/parallel` to see team and analytics render simultaneously
- Each slot loads independently

### Intercepting Routes

- Visit `/photos`
- Click any photo - opens as modal (intercepting route)
- Refresh while on photo - shows full page
- Navigate back - returns to gallery

### Server Actions

- Visit `/server-actions` to see form handling without client-side JavaScript
- Try the contact form - works with and without JavaScript enabled
- Test the todo list with optimistic UI updates
- Upload files to see progress tracking

### API Routes with Background Processing

- Visit `/api-routes` to see traditional API route patterns
- Submit the contact form and get immediate response
- Check server console to see background tasks running asynchronously
- Compare response times with Server Actions approach

## Key Concepts

### Rendering Types

| Type | When to Use | Example Route |
|------|-------------|---------------|
| **Static (SSG)** | Content rarely changes | `/static` |
| **Dynamic (SSR)** | Need fresh data every request | `/dynamic` |
| **ISR** | Balance between static and dynamic | `/isr`, `/posts` |
| **SSG + Params** | Pre-render specific pages | `/ssg/[id]` |

### Data Fetching Options

```typescript
// Static (default)
fetch('url')

// Dynamic (no cache)
fetch('url', { cache: 'no-store' })

// ISR (revalidate)
fetch('url', { next: { revalidate: 60 } })

// Or at page level
export const revalidate = 60
```

### Force Dynamic Rendering

```typescript
export const dynamic = 'force-dynamic'
```

## Scripts

```bash
pnpm dev           # Start development server with Turbopack
pnpm dev:safe      # Clean development start (removes .next cache)
pnpm build         # Build for production with Turbopack
pnpm start         # Start production server
pnpm lint          # Run Biome linting and formatting
pnpm format        # Format code with Biome
pnpm type-check    # TypeScript type checking without build
```

## Technologies

- **Next.js 16.0.0** - Latest React framework with App Router and new 'after' API
- **React 19.2.0** - Latest React with improved features
- **TypeScript 5** - Type safety and better DX
- **Tailwind CSS v4** - Utility-first CSS (no config needed)
- **Biome 2.2.6** - Fast linting and formatting (replaces ESLint + Prettier)
- **Turbopack** - Fast bundler for development and production
- **pnpm** - Fast, disk space efficient package manager

## Next.js 16 Compatibility

This demo is fully compatible with Next.js 16 and includes:

- ✅ **Async `params`**: All dynamic routes properly await `params` before usage
- ✅ **Promise-based APIs**: Correct handling of new async behavior
- ✅ **React 19**: Optimized for the latest React features
- ✅ **Turbopack**: Uses Turbopack for both dev and build
- ✅ **App Router**: Modern routing patterns
- ✅ **'after' API**: Background task processing for better performance

### Migration Notes

If upgrading from older Next.js versions:

- Dynamic route params are now `Promise<{ id: string }>` instead of `{ id: string }`
- Always `await params` before accessing properties
- Update TypeScript types accordingly
- New `after` API enables non-blocking background tasks in API routes

## Project Planning

## 🎯 Future Improvements

See `/docs/tasks/IMPROVEMENT_TASKS.md` for comprehensive enhancement roadmap including:

- Server Actions implementation
- Performance monitoring dashboard
- Advanced streaming patterns
- Security best practices
- PWA capabilities

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)

## License

MIT
