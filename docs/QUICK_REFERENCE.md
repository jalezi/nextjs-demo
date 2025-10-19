# Quick Reference Guide

## Rendering Methods Comparison

| Method | When Generated | Cache | Revalidation | Use Case | Example Route |
|--------|---------------|-------|--------------|----------|---------------|
| **SSG** | Build time | ∞ | Never | Rarely changes | `/static` |
| **SSR** | Every request | None | N/A | Always fresh | `/dynamic` |
| **ISR** | Build + interval | Yes | Time-based | Periodic updates | `/isr`, `/posts` |
| **SSG + Params** | Build time | ∞ | Never | Known paths | `/ssg/[id]` |

## Data Fetching Strategies

### Default (Static)

```typescript
// Cached indefinitely
fetch('https://api.example.com/data')
```

### No Cache (Dynamic)

```typescript
// Fresh on every request
fetch('https://api.example.com/data', { 
  cache: 'no-store' 
})
```

### ISR (Time-based)

```typescript
// Revalidate after N seconds
fetch('https://api.example.com/data', { 
  next: { revalidate: 60 } 
})

// OR at page level
export const revalidate = 60
```

### Force Dynamic

```typescript
// Make entire page dynamic
export const dynamic = 'force-dynamic'
```

## Special Files

| File | Purpose | Must be Client? | Example |
|------|---------|----------------|---------|
| `layout.tsx` | Shared UI wrapper | No | Navigation, footer |
| `page.tsx` | Route content | No | Main page content |
| `loading.tsx` | Loading UI | No | Skeleton screens |
| `error.tsx` | Error boundary | **Yes** | Error messages |
| `not-found.tsx` | 404 page | No | Custom 404 |

## Route Types

### Regular Route

```text
app/about/page.tsx → /about
```

### Dynamic Route

```text
app/posts/[id]/page.tsx → /posts/1, /posts/2, etc.
```

### Parallel Routes

```text
app/dashboard/
  layout.tsx          ← Accepts slots as props
  @analytics/page.tsx ← Slot 1
  @users/page.tsx     ← Slot 2
```

### Intercepting Routes

```text
app/photos/
  [id]/page.tsx                    ← Full page
  @modal/(.)photos/[id]/page.tsx   ← Modal (intercepts)
```

## Intercepting Route Patterns

| Pattern | Matches | Example |
|---------|---------|---------|
| `(.)` | Same level | `@modal/(.)photo` |
| `(..)` | One up | `@modal/(../photo` |
| `(..)(..)` | Two up | `@modal/(..)(..)photo` |
| `(...)` | Root | `@modal/(...)photo` |

## Common Patterns

### Loading State

```typescript
// app/posts/loading.tsx
export default function Loading() {
  return <div>Loading...</div>
}
```

### Error Boundary

```typescript
// app/posts/error.tsx
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Error: {error.message}</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Not Found

```typescript
// app/posts/[id]/not-found.tsx
export default function NotFound() {
  return <div>Post not found</div>
}

// Trigger it in page
import { notFound } from 'next/navigation'

if (!data) notFound()
```

### Static Params Generation

```typescript
// app/posts/[id]/page.tsx
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}
```

## Navigation

### Link Component

```typescript
import Link from 'next/link'

<Link href="/about">About</Link>
```

### useRouter (Client)

```typescript
'use client'
import { useRouter } from 'next/navigation'

const router = useRouter()
router.push('/dashboard')
router.back()
```

### redirect (Server)

```typescript
import { redirect } from 'next/navigation'

redirect('/login')
```

## Metadata

### Static Metadata

```typescript
export const metadata = {
  title: 'My Page',
  description: 'Page description',
}
```

### Dynamic Metadata

```typescript
export async function generateMetadata({ params }) {
  return {
    title: `Post ${params.id}`,
  }
}
```

## Cache Control

### Revalidate Path

```typescript
// app/actions.ts
'use server'
import { revalidatePath } from 'next/cache'

export async function updatePost() {
  // ... update logic
  revalidatePath('/posts')
}
```

### Revalidate Tag

```typescript
// Fetch with tag
fetch('url', { next: { tags: ['posts'] } })

// Revalidate later
import { revalidateTag } from 'next/cache'
revalidateTag('posts')
```

## Testing Checklist

- [ ] Static pages don't change on refresh
- [ ] Dynamic pages update on every request
- [ ] ISR pages update after revalidation period
- [ ] Loading states appear during navigation
- [ ] Error boundaries catch and display errors
- [ ] Not-found pages show for invalid routes
- [ ] Parallel routes render simultaneously
- [ ] Intercepting routes show modals
- [ ] Modal closes on back button
- [ ] Refresh on modal shows full page

## Performance Tips

1. **Use Static when possible** - Fastest, cheapest
2. **ISR for semi-static** - Good balance
3. **Dynamic only when needed** - Most expensive
4. **Loading states improve UX** - Show feedback
5. **Error boundaries prevent crashes** - Graceful degradation

## Debugging

### Check Cache Behavior

```bash
# Build and inspect
npm run build
npm run start

# Check .next/server/app for generated files
```

### Clear Cache

```bash
# Delete build artifacts
rm -rf .next

# Restart dev server
npm run dev
```

### Console Logs

```typescript
// Server component logs appear in terminal
console.log('Server:', data)

// Client component logs appear in browser
'use client'
console.log('Client:', data)
```

## Environment Variables

### Create .env.local

```bash
# .env.local
API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://mysite.com
```

### Use in Server Components

```typescript
const apiUrl = process.env.API_URL
```

### Use in Client Components

```typescript
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Self-Hosted

```bash
npm run build
npm run start
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Quick Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Clean cache
rm -rf .next node_modules
npm install
```

## Resources

- **Next.js Docs**: <https://nextjs.org/docs>
- **App Router Guide**: <https://nextjs.org/docs/app>
- **Data Fetching**: <https://nextjs.org/docs/app/building-your-application/data-fetching>
- **Caching**: <https://nextjs.org/docs/app/building-your-application/caching>
- **Routing**: <https://nextjs.org/docs/app/building-your-application/routing>
