# Next.js Demo App - Complete Features

A comprehensive demonstration of Next.js 15 App Router features including different rendering strategies, data fetching methods, parallel routes, intercepting routes, and error handling.

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

## Project Structure

```text
nextjs-demo/
├── app/
│   ├── layout.tsx                    # Root layout with navigation
│   ├── page.tsx                      # Home page (Static)
│   ├── globals.css                   # Global styles
│   ├── error.tsx                     # Root error boundary
│   ├── not-found.tsx                 # Root 404 page
│   │
│   ├── static/
│   │   └── page.tsx                  # Static page example
│   │
│   ├── dynamic/
│   │   ├── page.tsx                  # Dynamic (SSR) page
│   │   ├── loading.tsx               # Loading state
│   │   └── error.tsx                 # Error boundary
│   │
│   ├── isr/
│   │   └── page.tsx                  # ISR page (30s revalidation)
│   │
│   ├── ssg/
│   │   └── [id]/
│   │       └── page.tsx              # SSG with dynamic params
│   │
│   ├── posts/
│   │   ├── page.tsx                  # Posts list (ISR)
│   │   ├── loading.tsx               # Posts loading
│   │   └── [id]/
│   │       ├── page.tsx              # Individual post
│   │       ├── loading.tsx           # Post loading
│   │       ├── error.tsx             # Post error
│   │       └── not-found.tsx         # Post not-found
│   │
│   ├── parallel/
│   │   ├── layout.tsx                # Layout with parallel routes
│   │   ├── page.tsx                  # Main content
│   │   ├── @team/
│   │   │   └── page.tsx              # Team slot
│   │   └── @analytics/
│   │       └── page.tsx              # Analytics slot
│   │
│   └── photos/
│       ├── layout.tsx                # Photos layout with modal slot
│       ├── page.tsx                  # Photo gallery
│       ├── [id]/
│       │   └── page.tsx              # Full photo page
│       └── @modal/
│           ├── default.tsx           # Default modal (null)
│           └── (.)[id]/
│               └── page.tsx          # Intercepting route modal
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.js
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
pnpm dev        # Start development server with Turbopack
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run Biome linting and formatting
pnpm format     # Format code with Biome
```

## Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with improved features
- **TypeScript** - Type safety and better DX
- **Tailwind CSS v4** - Utility-first CSS (no config needed)
- **Biome** - Fast linting and formatting
- **Turbopack** - Fast bundler for development
- **pnpm** - Fast, disk space efficient package manager

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)

## License

MIT
