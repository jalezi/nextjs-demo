# Complete Setup Guide

## Step-by-Step Installation

### Step 1: Create Next.js Project

```bash
npm create next-app@latest nextjs-demo
```

When prompted, select the following options:

- ✅ **TypeScript**: Yes
- ✅ **Biome**: Select Biome
- ✅ **Tailwind CSS**: Yes
- ✅ **`src/` directory**: Yes
- ✅ **App Router**: Yes
- ✅ **Turbopack**: Yes
- ✅ **Import alias**: Yes (use `~/*` for `./src/*`)

### Step 2: Install Additional Dependencies

```bash
cd nextjs-demo
pnpm install -D @biomejs/biome
```

> **Note:** Tailwind CSS v4 is automatically configured and doesn't require a config file!

### Step 3: Create Additional Folder Structure

Create the additional demo folders that aren't included by default:

```bash
mkdir -p app/static
mkdir -p app/dynamic
mkdir -p app/isr
mkdir -p app/ssg/[id]
mkdir -p app/posts/[id]
mkdir -p app/parallel/@team
mkdir -p app/parallel/@analytics
mkdir -p app/photos/[id]
mkdir -p app/photos/@modal/default.tsx
mkdir -p "app/photos/@modal/(.)photos/[id]"
```

### Step 4: File Checklist

Copy each file to its corresponding location:

#### Root Files

- [x] `package.json`
- [x] `tsconfig.json`
- [x] `postcss.config.mjs`
- [x] `next.config.ts`
- [x] `biome.json`
- [x] `.gitignore`
- [x] `README.md`

#### App Root Files

- [ ] `app/layout.tsx`
- [ ] `app/page.tsx`
- [ ] `app/globals.css`
- [ ] `app/error.tsx`
- [ ] `app/not-found.tsx`

#### Static Route

- [ ] `app/static/page.tsx`

#### Dynamic Route

- [ ] `app/dynamic/page.tsx`
- [ ] `app/dynamic/loading.tsx`
- [ ] `app/dynamic/error.tsx`

#### ISR Route

- [ ] `app/isr/page.tsx`

#### SSG with Params

- [ ] `app/ssg/[id]/page.tsx`

#### Posts Routes

- [ ] `app/posts/page.tsx`
- [ ] `app/posts/loading.tsx`
- [ ] `app/posts/[id]/page.tsx`
- [ ] `app/posts/[id]/loading.tsx`
- [ ] `app/posts/[id]/error.tsx`
- [ ] `app/posts/[id]/not-found.tsx`

#### Parallel Routes

- [ ] `app/parallel/layout.tsx`
- [ ] `app/parallel/page.tsx`
- [ ] `app/parallel/@team/page.tsx`
- [ ] `app/parallel/@analytics/page.tsx`

#### Photos with Intercepting Routes

- [ ] `app/photos/layout.tsx`
- [ ] `app/photos/page.tsx`
- [ ] `app/photos/[id]/page.tsx`
- [ ] `app/photos/@modal/default.tsx`
- [ ] `app/photos/@modal/(.)photos/[id]/page.tsx`

### Step 5: Update package.json Scripts

The `npm create next-app` command creates a basic `package.json`. Update the scripts to use Biome and Turbopack:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "biome check",
    "format": "biome format --write"
  }
}
```

### Step 6: Run the App

```bash
pnpm run dev
```

Visit: <http://localhost:3000>

## Verification Checklist

Test each feature to ensure everything works:

### Basic Pages

- [ ] Home page loads (`/`)
- [ ] Navigation works
- [ ] All links in navbar work

### Rendering Types

- [ ] Static page shows content (`/static`)
- [ ] Dynamic page shows GitHub stats (`/dynamic`)
- [ ] ISR page shows UTC time (`/isr`)
- [ ] SSG params work (`/ssg/1`, `/ssg/2`, `/ssg/3`)

### Posts Feature

- [ ] Posts list loads (`/posts`)
- [ ] Can click a post to view details
- [ ] Loading state appears when navigating
- [ ] Error page works (`/posts/999`)
- [ ] Not found page works (`/posts/12345`)

### Advanced Routing

- [ ] Parallel routes show team and analytics (`/parallel`)
- [ ] Photo gallery shows all photos (`/photos`)
- [ ] Clicking photo opens modal (intercepting route)
- [ ] Refreshing on photo shows full page
- [ ] Back button works from modal

### Loading States

- [ ] Loading UI appears when navigating to `/posts`
- [ ] Loading UI appears when navigating to `/dynamic`
- [ ] Loading UI appears when navigating to individual posts

### Error Handling

- [ ] Visit `/posts/999` shows error boundary
- [ ] "Try again" button works
- [ ] Visit non-existent route shows 404

## Troubleshooting

### Issue: "Module not found"

**Solution:** Make sure all dependencies are installed:

```bash
pnpm install
```

### Issue: Tailwind styles not working

**Solution:** With Tailwind CSS v4, styles are automatically configured via PostCSS. Ensure your `postcss.config.mjs` contains:

```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

No additional configuration needed!

### Issue: TypeScript errors

**Solution:** Check `tsconfig.json` is properly configured with the import alias. Run:

```bash
npx tsc --noEmit
```

Your `tsconfig.json` should include:

```json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

This allows you to import files using `~/` instead of relative paths:

```typescript
// Instead of: import { Component } from '../../components/Component'
import { Component } from '~/components/Component'
```

### Issue: Photos modal not working

**Solution:** Ensure the folder structure is exactly:

```text
app/photos/@modal/(.)photos/[id]/page.tsx
```

Note the parentheses around the dot: `(.)`

### Issue: Parallel routes not rendering

**Solution:** Check that:

1. Layout accepts both `team` and `analytics` props
2. Folder names start with `@` symbol
3. Both slot folders have `page.tsx` files

## Common Questions

**Q: Why use `(.)` in the modal route?**
A: The `(.)` syntax intercepts routes at the same level. Use `(..)` for one level up, etc.

**Q: What's the difference between SSG and ISR?**
A: SSG generates pages once at build time. ISR regenerates pages after a time interval.

**Q: Do I need to use all these features?**
A: No! This is a demo. Use only what you need for your specific use case.

**Q: Can I use this as a template?**
A: Yes! Feel free to use this as a starting point and remove features you don't need.

## Next Steps

1. **Customize the design** - Update Tailwind classes to match your brand
2. **Add real APIs** - Replace placeholder APIs with your backend
3. **Add authentication** - Implement auth for protected routes
4. **Add database** - Connect to a database like PostgreSQL or MongoDB
5. **Deploy** - Deploy to Vercel, Netlify, or your preferred host

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [React Docs](https://react.dev)

## Support

If you encounter issues:

1. Check the console for errors
2. Verify folder structure matches exactly
3. Ensure all files are in correct locations
4. Check that dependencies are installed
5. Try deleting `.next` folder and rebuilding

```bash
rm -rf .next
pnpm run dev
```
