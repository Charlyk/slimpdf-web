# SlimPDF Frontend - Claude Code Instructions

## Overview

This is the **SlimPDF** frontend, a Next.js application for the SlimPDF PDF processing service. It provides the landing page, tool interfaces, user dashboard, and integrates with the Python backend API.

**Domain:** slimpdf.io
**Stack:** Next.js 15, TypeScript, Tailwind CSS, Auth.js v5
**Backend:** Separate Python/FastAPI repo (Railway)
**Hosting:** Vercel

---

## CRITICAL: Use Beads for Task Management

**STOP using markdown files for TODO lists. Use Beads (`bd`) instead.**

### First Steps Every Session

```bash
# 1. Check beads health
bd doctor

# 2. See what's ready to work on
bd ready --json

# 3. Review current task list
bd list --status open
```

### Creating Issues

```bash
# Create a task
bd create "Build landing page hero section" -t task -p 1

# Create a bug
bd create "Fix mobile layout on pricing page" -t bug -p 0

# Create an epic for larger features
bd create "User dashboard" -t epic -p 1

# Create with labels
bd create "Add file upload progress" -t task -p 2 -l ui,upload
```

### Working on Tasks

```bash
# Start working
bd update <task-id> --status in_progress

# Complete task
bd close <task-id> --reason "Implemented and tested"
```

### Session End Protocol

```bash
# 1. File issues for discovered work
bd create "Found accessibility issue" -t bug -p 2

# 2. Close completed tasks
bd close <task-id> --reason "Completed"

# 3. Sync and push
bd sync
git add .beads/
git commit -m "Update beads issues"
git push
```

---

## Project Structure

```
slimpdf-web/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Root layout
│   │   ├── compress/
│   │   │   └── page.tsx        # Compress tool
│   │   ├── merge/
│   │   │   └── page.tsx        # Merge tool
│   │   ├── image-to-pdf/
│   │   │   └── page.tsx        # Image to PDF tool
│   │   ├── pricing/
│   │   │   └── page.tsx        # Pricing page
│   │   ├── dashboard/
│   │   │   └── page.tsx        # User dashboard (protected)
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/route.ts  # Auth.js routes
│   │   │   └── webhook/
│   │   │       └── stripe/route.ts         # Stripe webhooks
│   │   └── (auth)/
│   │       ├── login/page.tsx
│   │       └── signup/page.tsx
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── landing/            # Landing page sections
│   │   ├── tools/              # Tool-specific components
│   │   │   ├── FileUpload.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── DownloadButton.tsx
│   │   │   └── QualitySelector.tsx
│   │   └── dashboard/          # Dashboard components
│   ├── lib/
│   │   ├── api.ts              # Backend API client
│   │   ├── auth.ts             # Auth.js configuration
│   │   ├── stripe.ts           # Stripe client helpers
│   │   └── utils.ts            # Utility functions
│   ├── hooks/
│   │   ├── useUpload.ts        # File upload hook
│   │   └── useSubscription.ts  # Subscription status hook
│   └── types/
│       └── index.ts            # TypeScript types
├── public/
├── .beads/                     # Beads issue tracker
├── CLAUDE.md                   # This file
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Auth.js v5 (NextAuth)
- **Payments:** Stripe Checkout + Customer Portal
- **State:** React Query for server state
- **Forms:** React Hook Form + Zod validation

---

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

---

## Environment Variables

```bash
# .env.local

# API
NEXT_PUBLIC_API_URL=https://api.slimpdf.io

# Auth.js
AUTH_SECRET=  # Generate with: openssl rand -base64 32
AUTH_URL=https://slimpdf.io
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Database (for Auth.js sessions)
DATABASE_URL=postgresql://user:pass@host:5432/slimpdf

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRO_MONTHLY_PRICE_ID=price_xxx
STRIPE_PRO_ANNUAL_PRICE_ID=price_xxx
```

---

## Code Style Guidelines

### TypeScript

Use strict types everywhere. No `any`.

```typescript
// Good
interface UploadResponse {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
}

async function uploadFile(file: File): Promise<UploadResponse> {
  // ...
}

// Bad
async function uploadFile(file: any): Promise<any> {
  // ...
}
```

### Components

Use functional components with TypeScript interfaces.

```typescript
interface FileUploadProps {
  maxSize: number;
  accept: string[];
  onUpload: (files: File[]) => void;
  disabled?: boolean;
}

export function FileUpload({ 
  maxSize, 
  accept, 
  onUpload, 
  disabled = false 
}: FileUploadProps) {
  // ...
}
```

### Server vs Client Components

- **Default to Server Components** - They're the default in App Router
- **Add 'use client'** only when you need:
    - Event handlers (onClick, onChange)
    - React hooks (useState, useEffect)
    - Browser APIs (localStorage, window)

```typescript
// Server Component (default) - no directive needed
export default function PricingPage() {
  return <div>...</div>;
}

// Client Component - needs directive
'use client';

import { useState } from 'react';

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  // ...
}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `FileUpload.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatBytes.ts`)
- Pages: `page.tsx` (Next.js convention)
- Layouts: `layout.tsx` (Next.js convention)

---

## Git Workflow

### Branch Structure

- **main**: Production, deployed to Vercel
- **develop**: Development branch
- **feature/***: Feature branches
- **fix/***: Bug fix branches

### Commits

Include beads issue ID:

```bash
git commit -m "feat: add file upload component (bd-abc)"
git commit -m "fix: handle upload errors gracefully (bd-xyz)"
git commit -m "style: improve mobile responsiveness (bd-123)"
```

### Workflow

```bash
# Start feature
git checkout develop
git pull
git checkout -b feature/landing-page

# Create tracking issue
bd create "Build landing page" -t feature -p 1

# Work and commit
git add .
git commit -m "feat: add hero section (bd-abc)"

# Merge when done
git checkout develop
git merge feature/landing-page
git push

# Close issue
bd close bd-abc --reason "Merged to develop"
```

---

## Key Patterns

### API Client

Use a centralized API client:

```typescript
// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function compressPdf(
  file: File,
  quality: 'low' | 'medium' | 'high',
  targetSizeMb?: number
): Promise<JobResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('quality', quality);
  if (targetSizeMb) {
    formData.append('target_size_mb', targetSizeMb.toString());
  }

  const response = await fetch(`${API_URL}/api/v1/compress`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}
```

### File Upload Hook

```typescript
// src/hooks/useUpload.ts
'use client';

import { useState } from 'react';
import { compressPdf } from '@/lib/api';

export function useUpload() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'done' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<JobResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File, options: UploadOptions) {
    setStatus('uploading');
    setProgress(0);
    setError(null);

    try {
      const response = await compressPdf(file, options.quality, options.targetSize);
      setResult(response);
      setStatus('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setStatus('error');
    }
  }

  return { status, progress, result, error, upload };
}
```

### Protected Routes

Use Auth.js middleware:

```typescript
// src/middleware.ts
import { auth } from '@/lib/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }
});

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

### Stripe Checkout

```typescript
// src/app/api/checkout/route.ts
import { auth } from '@/lib/auth';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { priceId } = await req.json();

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email!,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.AUTH_URL}/dashboard?success=true`,
    cancel_url: `${process.env.AUTH_URL}/pricing?canceled=true`,
  });

  return Response.json({ url: checkoutSession.url });
}
```

---

## Page Structure

### Landing Page Sections

1. **Hero** - Headline, subheadline, primary CTA
2. **Tool Selector** - Compress / Merge / Image to PDF tabs
3. **Features** - Free vs Pro comparison
4. **How It Works** - 3-step process
5. **Pricing** - Monthly/Annual toggle
6. **FAQ** - Common questions
7. **Footer** - Links, legal

### Tool Page Structure

1. **Header** - Tool name, description
2. **Upload Zone** - Drag and drop area
3. **Options** - Quality selector, settings
4. **File List** - Selected files with remove option
5. **Process Button** - Primary action
6. **Progress** - Upload and processing status
7. **Download** - Result with download button
8. **Upsell** - Show when limit reached

---

## SEO

### Metadata

Each page should export metadata:

```typescript
// src/app/compress/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compress PDF Online - Reduce File Size | SlimPDF',
  description: 'Compress PDF files up to 90% smaller. Fast, secure server-side compression. Target exact file sizes for email.',
  alternates: {
    canonical: 'https://slimpdf.io/compress',
  },
};
```

### JSON-LD

Add structured data for tools:

```typescript
// src/app/compress/page.tsx
export default function CompressPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SlimPDF Compress',
    description: 'Compress PDF files online',
    url: 'https://slimpdf.io/compress',
    applicationCategory: 'UtilityApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  );
}
```

---

## Common Tasks

### Adding a New Page

1. Create beads issue: `bd create "Add pricing page" -t task -p 1`
2. Create `src/app/pricing/page.tsx`
3. Add metadata for SEO
4. Add to navigation if needed
5. Close issue: `bd close <id> --reason "Implemented"`

### Adding a UI Component

1. Check if shadcn/ui has it: `npx shadcn@latest add button`
2. If custom, create in `src/components/ui/`
3. Use Tailwind for styling
4. Add TypeScript props interface

### Connecting to Backend

1. Add endpoint to `src/lib/api.ts`
2. Create hook in `src/hooks/` if needed
3. Handle loading, error, success states
4. Add proper TypeScript types

---

## Beads Quick Reference

| Command | Description |
|---------|-------------|
| `bd ready` | Show tasks ready to work on |
| `bd list` | List all issues |
| `bd create "Title" -t task -p 1` | Create task |
| `bd show <id>` | Show issue details |
| `bd update <id> --status in_progress` | Start working |
| `bd close <id> --reason "Done"` | Complete task |
| `bd sync` | Sync with git |

---

## Deployment

### Vercel Setup

1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Configure custom domain (slimpdf.io)
4. Enable automatic deployments from `main`

### Environment Variables in Vercel

Add all variables from `.env.local` to Vercel:
- Settings > Environment Variables
- Add for Production, Preview, and Development

---

## Remember

1. **Use beads** for all task tracking
2. **Server Components first** - only add 'use client' when needed
3. **Type everything** - no `any` types
4. **Mobile first** - test responsive design
5. **Sync before ending** - `bd sync && git push`
6. **Include issue IDs** - in commit messages

---

## Resources

- **PRD:** See SlimPDF_PRD.md for full requirements
- **Beads:** https://github.com/steveyegge/beads
- **Next.js 15:** https://nextjs.org/docs
- **Auth.js v5:** https://authjs.dev
- **shadcn/ui:** https://ui.shadcn.com
- **Tailwind:** https://tailwindcss.com/docs

---

*Last updated: January 12, 2026*
