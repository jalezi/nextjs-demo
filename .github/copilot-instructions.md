# Next.js Demo - AI Coding Agent Instructions

## Project Overview

This is a **comprehensive Next.js 16.0.0 App Router demonstration** showcasing different rendering strategies, advanced routing patterns, Server Actions, API Routes with background processing, streaming patterns, error handling, and modern React 19 features. The codebase is educational and demonstrates patterns rather than implementing business logic.

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

**Server Actions (`/server-actions/`)**: Form submissions and mutations using `"use server"`:
- `actions.ts` exports server functions with `revalidatePath()` for cache invalidation
- Client components use `useFormState` and `useFormStatus` for progressive enhancement
- Demonstrates validation, error handling, and optimistic updates

**Streaming (`/streaming/`)**: Progressive loading with Suspense boundaries:
- Nested `<Suspense>` components with custom `LoadingSkeleton` fallbacks
- `FastComponent` vs `SlowComponent` demonstrate loading prioritization
- Progressive form loading shows incremental UI updates

**Error Handling (`/error-handling/`)**: Comprehensive error management patterns:
- Global and route-level `error.tsx` boundaries with retry functionality
- Client-side error reporting and user feedback systems
- Network, server, and validation error examples with fallback UI

**Performance Monitoring (`/performance/`)**: Web Vitals and metrics tracking:
- Mock performance data generation with realistic patterns
- Core Web Vitals visualization with charts and metrics cards
- Client-side monitoring components for real performance tracking

**API Routes with Background Tasks (`/api-routes/`)**: Next.js `after` API demo:
- `/api/contact-with-after/route.ts` shows immediate response + background processing
- Form submissions trigger background tasks without blocking user experience

### Next.js 16 Compatibility Requirements

**Critical**: All dynamic routes must properly handle async `params`:

```typescript
// ✅ Correct (Next.js 16+)
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
- **Turbopack** - Default bundler for dev mode (not Webpack)
- **pnpm** - Package manager (not npm/yarn)
- **Lefthook** - Git hooks management via `lefthook.yml`
- **TypeScript 5.9** - Strict mode with Next.js typed routes enabled

### Commit Message Standards

**All commits must follow Conventional Commits format** with optional Gitmojis as a senior developer would write:

**Format**: `[emoji] <type>(<scope>): <description>` or `<type>(<scope>): <emoji> <description>`

**Common Types**:
- `feat`: ✨ New features or enhancements
- `fix`: 🐛 Bug fixes  
- `chore`: 🔧 Maintenance tasks (deps, tooling, etc.)
- `build`: 📦 Build system or external dependencies
- `docs`: 📝 Documentation changes
- `refactor`: ♻️ Code restructuring without functionality changes
- `style`: 💄 Code formatting, no logic changes
- `test`: ✅ Adding or updating tests
- `perf`: ⚡️ Performance improvements
- `ci`: 👷 CI/CD pipeline changes
- `revert`: ⏪️ Revert previous changes

**Scope Examples**:
- `deps`: Dependencies (`chore(deps): ⬆️ update react to 19.2.0`)
- `deps-dev`: Dev dependencies (`chore(deps-dev): ⬆️ update biome to 2.2.7`)
- `api`: API-related changes
- `ui`: User interface changes
- `routing`: Next.js routing changes
- `components`: React component changes
- `types`: TypeScript type definitions

**Examples with Gitmojis**:
```
feat(routing): ✨ add parallel routes demo with analytics dashboard
fix(ssg): 🐛 handle async params in dynamic routes for Next.js 15
chore(deps-dev): ⬆️ update development dependencies
build: 📦 update Next.js build configuration for production
docs: 📝 update setup guide with new deployment instructions
refactor(components): ♻️ extract reusable header navigation
perf(images): ⚡️ optimize photo gallery with lazy loading
test(api): ✅ add unit tests for server actions
ci: 👷 update GitHub Actions workflow
revert: ⏪️ revert breaking changes in navigation
```

**Multi-line Format** for complex changes:
```
feat(streaming): ✨ implement progressive data loading

- Add streaming components with Suspense boundaries
- Create slow/fast component examples
- Include nested streaming patterns
- Update documentation with performance notes
```

**Key Gitmoji References**:
- ✨ `:sparkles:` - New features
- 🐛 `:bug:` - Bug fixes
- 📝 `:memo:` - Documentation
- ⬆️ `:arrow_up:` - Upgrade dependencies
- ⬇️ `:arrow_down:` - Downgrade dependencies
- 🔧 `:wrench:` - Configuration files
- 📦 `:package:` - Build system/packages
- ♻️ `:recycle:` - Refactor code
- ⚡️ `:zap:` - Performance improvements
- 💄 `:lipstick:` - UI/styling
- ✅ `:white_check_mark:` - Tests
- 👷 `:construction_worker:` - CI/CD
- ⏪️ `:rewind:` - Revert changes

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
- Error boundaries (`error.tsx` files)
- Form state management (`useFormState`, `useFormStatus`)

Server components (default) for:
- Data fetching with native `fetch()`
- SEO metadata
- Static content rendering
- Server Actions execution

### Navigation Structure

The `src/app/components/header.tsx` organizes routes into logical groups:
- **Primary**: Home, Static, Dynamic, ISR (core rendering patterns)
- **Features**: SSG Params, Posts, Parallel, Photos (advanced routing)
- **Advanced**: Server Actions, API Routes, Performance, Streaming, Error Handling

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

All demo code is located in `src/app/` following Next.js 16 best practices:

```
src/app/
├── layout.tsx                 # Root layout with navigation
├── page.tsx                   # Home page (Static)
├── globals.css                # Global styles
├── error.tsx                  # Root error boundary
├── not-found.tsx              # Root 404 page
├── components/                # Shared components (Header, NextJSInfo)
├── api/                       # API routes with background processing
├── api-routes/                # API routes demo page + components
├── dynamic/                   # SSR examples
├── error-handling/            # Error boundaries and fallback patterns
├── isr/                       # ISR examples
├── parallel/                  # Parallel routes demo (@team, @analytics)
├── performance/               # Web Vitals monitoring dashboard
├── photos/                    # Intercepting routes modal pattern
├── posts/                     # ISR with dynamic routes
├── server-actions/            # Server Actions with forms
├── ssg/                       # SSG with params
├── static/                    # Static generation demo
└── streaming/                 # Suspense and progressive loading
```

## Planning and Tasks

Future improvements are documented in `/docs/tasks/IMPROVEMENT_TASKS.md` including:
- Next.js 16 Cache Components and enhanced caching APIs
- Proxy architecture patterns
- React 19.2 features and React Compiler integration
- Security best practices and authentication
- PWA capabilities and advanced middleware patterns