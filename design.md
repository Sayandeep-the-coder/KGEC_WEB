# KGEC Website Rebuild - Design & Architecture Document

## 1. Overview
The KGEC Website Rebuild is a modern, high-performance web portal for Kalyani Government Engineering College. The project is designed with a zero-cost architecture focused on maximizing free-tier usage while ensuring scalability to handle concurrent traffic spikes during results or admission periods.

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Framer Motion
- **Database:** Supabase Postgres
- **ORM:** Drizzle ORM
- **Authentication:** Supabase Auth (Admin-only, Magic Link)
- **Storage:** Supabase Storage (S3-compatible)
- **Rate Limiting:** Upstash Redis
- **Hosting:** Vercel

## 2. Architecture

### 2.1 Next.js App Router
The application uses the Next.js App Router (`src/app`) for routing and rendering.
- **`(public)`**: Contains all public-facing pages (e.g., Home, About, Admissions) which are optimized for static generation and ISR (Incremental Static Regeneration).
- **`admin`**: Secure dashboard for administrators to manage content, protected by session guards.
- **`api`**: Next.js Route Handlers serving as the backend API layer.

### 2.2 API Layer & Conventions
The API layer is built using Next.js Route Handlers in `src/app/api/`.
- **Public Routes:** `GET` routes are publicly accessible without authentication.
- **Mutating Routes:** `POST`, `PATCH`, `DELETE` are gated behind a `requireAdmin()` middleware, except for specific endpoints like `/api/contact` which are public but heavily rate-limited.
- **Validation:** Every request payload is validated using **Zod**. Invalid payloads return a `400` status with structured error issues.
- **Cache Revalidation:** Mutating handlers utilize `revalidatePath()` or `revalidateTag()` to ensure ISR pages update immediately after data changes.
- **Standard Response:** `{ data: T }` or `{ error: string }`.

## 3. Data Model

The database schema is defined using Drizzle ORM in `src/lib/db/schema.ts` and managed via `drizzle-kit`. 

### Key Entities:
- **`notices`**: General, admission, placement, academic, and exam notices with PDF links.
- **`news`**: News items with rich text body (JSONB) and cover images.
- **`events`**: Upcoming and past college events.
- **`downloads`**: Downloadable resources categorized by type (e.g., NIRF, IQAC, Mandatory Disclosure).
- **`gallery_images`**: Images organized by albums.
- **`admissions`**: Seat matrices and important dates per program (UG BTech, PG MTech, PG MCA) stored as JSONB.
- **`placement_stats`, `placement_departments`, `placement_recruiters`**: Normalized tables for placement statistics, including CSV bulk upload support.
- **`contact_submissions`**: User submissions from the public contact form.
- **`password_reset_otps`**: Secure OTP tracking for the admin forgot-password flow.

*Note: Static content such as department overviews, staff bios, and static pages (About, Research) are not stored in the database but managed as static code in `content/*.ts`.*

## 4. Key Integrations

- **Supabase Postgres (Supavisor):** Uses the Supavisor connection pooler to prevent connection exhaustion during concurrent serverless invocations.
- **Supabase Storage:** Handles file uploads (images, PDFs). The system generates S3-compatible presigned URLs for direct browser-to-storage uploads, bypassing Vercel functions to stay within execution limits.
- **Supabase Auth:** Manages admin sessions using PKCE flow and custom OTP-based password resets.
- **Upstash Redis:** Powers distributed rate limiting.
- **Gmail API (GCP):** Used for sending transactional emails (like OTPs or contact form notifications) via OAuth2 refresh tokens.

## 5. Security & Performance

### 5.1 Security
- **Strict Role-based Access:** Mutating actions are restricted to authenticated admins.
- **File Upload Security:** Files are uploaded directly to Supabase via cryptographically signed URLs that enforce strict MIME types (e.g., `image/jpeg`, `application/pdf`), preventing arbitrary file execution.
- **Data Validation:** Zod schemas guarantee the structural integrity of incoming data before processing.
- **Auth Hardening:** The forgot-password flow uses exponential backoff keyed by IP and email to thwart brute-force attacks.

### 5.2 Performance & Rate Limiting
- **Edge Caching & ISR:** Public pages are cached at Vercel's edge, meaning most users never hit the Postgres database directly.
- **Tiered Rate Limiting (via Upstash Redis):**
  - **Public:** Moderate sliding window limits for `GET` routes and contact forms.
  - **Admin:** Looser limits for authenticated data mutation.
  - **Auth:** Strict exponential backoff for sensitive endpoints.

## 6. Directory Structure

\`\`\`
src/
├── app/
│   ├── (public)/          # Public-facing web pages
│   ├── admin/             # Secure admin dashboard pages
│   └── api/               # Next.js 16 Route Handlers (API Layer)
├── components/            # Reusable React components (UI, Layouts)
├── lib/
│   ├── config/            # Constants and environment configuration (Zod env)
│   ├── db/                # Drizzle ORM Setup, Schema, & Migrations
│   ├── middlewares/       # Cross-cutting API protections (Auth, Ratelimit)
│   ├── services/          # External API integrations (Gmail, Storage)
│   ├── utils/             # Generic helpers
│   └── validators/        # Zod request payload schemas
└── styles/                # Global stylesheets (Tailwind)
\`\`\`
