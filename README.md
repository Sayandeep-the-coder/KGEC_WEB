# KGEC Website Rebuild

Official portal for **Kalyani Government Engineering College** — rebuilt on a modern, zero-cost stack designed to handle concurrent traffic without paid upgrades.

## Stack (all free tier)

| Layer | Choice | Free limit |
| --- | --- | --- |
| Runtime / Hosting | Next.js 16 on **Vercel Hobby** | 100 GB bandwidth/mo, 10 s function limit |
| Database | **Supabase Postgres Free** (Supavisor pooler, port 6543) | 500 MB storage |
| ORM | **Drizzle ORM** + `drizzle-kit` migrations | — |
| Auth | **Supabase Auth** (admin-only, magic link) | 50 k MAU |
| File Storage | **Supabase Storage** (S3-compatible API) | 1 GB storage (free tier) |
| Rate Limiting | **Upstash Redis** | 10 k commands/day |
| CSV Parsing | **papaparse** (server-side) | — |
| Validation | **zod** on every route handler | — |
| Email | **Gmail API** on GCP (OAuth2 refresh token) | Free with any Gmail account |

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public-facing web pages
│   ├── admin/             # Secure admin dashboard pages
│   └── api/               # Next.js 16 Route Handlers (API Layer)
│       ├── health/
│       ├── auth/
│       ├── notices/
│       └── ...
└── lib/
    ├── config/            # Constants and environment configuration
    │   ├── env.ts         # Zod validated process.env
    │   └── supabase/      # Supabase clients (server, client, admin)
    ├── db/                # Drizzle ORM Setup
    │   ├── schema.ts      # Table & enum definitions
    │   ├── index.ts       # Pooled Postgres client
    │   └── migrations/
    ├── middlewares/       # Cross-cutting API protections
    │   ├── auth.ts        # requireAdmin() session guard
    │   └── ratelimit.ts   # Upstash Redis Sliding Window / Backoff
    ├── services/          # External API integrations
    │   ├── email.ts       # Gmail API (OAuth2)
    │   └── storage.ts     # Supabase Storage S3 Presigned URLs
    ├── utils/             # Generic helpers (formatting, styling)
    │   └── index.ts
    └── validators/        # Zod request payload schemas
        └── index.ts
```

## API Conventions

- **Public GET** routes require no authentication.
- **Mutating routes** (`POST`, `PATCH`, `DELETE`) are gated behind `requireAdmin()` — except `/api/contact` which is public but rate-limited.
- **Response shape**: `{ data: T }` or `{ data: T[], count: number }` on success; `{ error: string }` on failure.
- **Zod validation** on every request body; failures return `400 { error: "Validation failed", issues }`.
- **Cache revalidation**: mutating handlers call `revalidatePath()` / `revalidateTag()` so ISR pages update immediately after writes.

## API Endpoint Reference

### Health

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Returns `{ status: "ok", timestamp }`. Use with a daily cron to prevent Supabase free-tier pausing. |

### Auth

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET\|POST` | `/api/auth/[...supabase]` | Public | Supabase Auth PKCE callback — exchanges `?code=` for an httpOnly session cookie. |

#### Forgot Password Flow

| Method | Path | Auth | Body | Response |
| --- | --- | --- | --- | --- |
| `POST` | `/api/auth/forgot-password` | Public | `{ email }` | `{ data: { message } }` — sends 6-digit OTP to the email (10 min expiry). Returns generic message regardless of user existence to prevent email enumeration. |
| `POST` | `/api/auth/verify-otp` | Public | `{ email, otp }` | `{ data: { verified: true } }` on success. Max 5 attempts per OTP; returns `429` if exceeded. |
| `POST` | `/api/auth/reset-password` | Public | `{ email, otp, newPassword (min 8 chars) }` | `{ data: { success: true, redirectTo: "/admin/login" } }` — updates password via Supabase Admin API, cleans up OTP records. |

### Notices

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/notices` | Public | `?limit=20&page=1&category=general\|admission\|placement\|academic\|exam` | `{ data: Notice[], count: number }` |
| `POST` | `/api/notices` | Admin | `{ title, pdfUrl, category?, isNew? }` | `201 { data: Notice }` |
| `GET` | `/api/notices/[id]` | Public | — | `{ data: Notice }` or `404` |
| `PATCH` | `/api/notices/[id]` | Admin | Partial `{ title?, pdfUrl?, category?, isNew? }` | `{ data: Notice }` |
| `DELETE` | `/api/notices/[id]` | Admin | — | `{ data: { success: true } }` |

### News

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/news` | Public | `?limit=20` | `{ data: NewsItem[] }` |
| `POST` | `/api/news` | Admin | `{ slug, title, imageUrl?, body: RichtextJSON }` | `201 { data: NewsItem }` |
| `GET` | `/api/news/[slug]` | Public | — | `{ data: NewsItem }` or `404` |
| `PATCH` | `/api/news/[slug]` | Admin | Partial `{ slug?, title?, imageUrl?, body? }` | `{ data: NewsItem }` |
| `DELETE` | `/api/news/[slug]` | Admin | — | `{ data: { success: true } }` |

### Events

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/events` | Public | `?upcoming=true` (optional, filters future events) | `{ data: Event[] }` |
| `POST` | `/api/events` | Admin | `{ title, description?, eventDate, externalLink? }` | `201 { data: Event }` |
| `GET` | `/api/events/[id]` | Public | — | `{ data: Event }` or `404` |
| `PATCH` | `/api/events/[id]` | Admin | Partial `{ title?, description?, eventDate?, externalLink? }` | `{ data: Event }` |
| `DELETE` | `/api/events/[id]` | Admin | — | `{ data: { success: true } }` |

### Downloads

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/downloads` | Public | `?category=general\|mandatory_disclosure\|nirf\|iqac\|naac\|notices` | `{ data: Download[] }` |
| `POST` | `/api/downloads` | Admin | `{ title, fileUrl, category? }` | `201 { data: Download }` |
| `DELETE` | `/api/downloads/[id]` | Admin | — | `{ data: { success: true } }` |

### Gallery

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/gallery` | Public | `?album=<name>` (optional) | `{ data: GalleryImage[] }` |
| `POST` | `/api/gallery` | Admin | `{ album, imageUrl, caption? }` | `201 { data: GalleryImage }` |
| `DELETE` | `/api/gallery/[id]` | Admin | — | `{ data: { success: true } }` |

### Admissions

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/admissions/[program]` | Public | `program`: `ug_btech \| pg_mtech \| pg_mca` | `{ data: { program, seatMatrix, importantDates } }` |
| `PATCH` | `/api/admissions/[program]` | Admin | `{ seatMatrix?, importantDates? }` (upserts) | `{ data: Admission }` |

### Placements

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/placements/stats` | Public | `?year=2024` (optional, returns all years if omitted) | `{ data: PlacementStat[] }` or `{ data: PlacementStat }` |
| `GET` | `/api/placements/departments` | Public | `?year=2024` (required for per-dept breakdown) | `{ data: PlacementDepartment[] }` |
| `GET` | `/api/placements/recruiters` | Public | `?year=2024` (required for recruiter list) | `{ data: PlacementRecruiter[] }` |
| `POST` | `/api/placements/departments/upload` | Admin | `multipart/form-data` with `file` (CSV). Columns: `year, department, students_placed, median_salary, highest_salary` | `{ inserted: number, errors: [{ row, message }] }` |
| `POST` | `/api/placements/recruiters/upload` | Admin | `multipart/form-data` with `file` (CSV). Columns: `year, company, offers` | `{ inserted: number, errors: [{ row, message }] }` |

> CSV uploads enforce a strict `< 5MB` file size and `text/csv` MIME type before memory ingestion. They use `onConflictDoUpdate` (upsert on composite unique keys). Department uploads also recompute the aggregate `placement_stats` row for each affected year.

### Contact

| Method | Path | Auth | Body | Response |
| --- | --- | --- | --- | --- |
| `POST` | `/api/contact` | Public (rate-limited: 10 req/hr per IP) | `{ name, email, message (min 10 chars) }` | `201 { data: { id, success: true } }` or `429` if rate-limited |

### Storage (Supabase Storage S3 Signed URLs)

| Method | Path | Auth | Body | Response |
| --- | --- | --- | --- | --- |
| `POST` | `/api/storage/signed-url` | Admin | `{ bucket: "notices"\|"downloads"\|"gallery"\|"news", filename, contentType }` | `{ data: { uploadUrl, publicUrl, key } }` |

> The admin UI calls this endpoint first to get a presigned PUT URL. The `contentType` must be one of `image/jpeg`, `image/png`, `image/webp`, or `application/pdf`. The returned `uploadUrl` contains a cryptographic signature locking the upload to this exact MIME type, preventing arbitrary file execution. The UI then uploads the file directly to Supabase Storage and creates the DB record with the returned `publicUrl`.

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (free tier)
- A Supabase project with Storage buckets configured (free tier)
- An Upstash Redis database (free tier)
- A Google Cloud Platform (GCP) project — for Gmail API OAuth2 (free)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables (see `.env.example` for the full list):

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only) |
| `DATABASE_URL` | Supavisor pooled connection string (port 6543) |
| `SUPABASE_S3_ACCESS_KEY` | Supabase Storage S3 access key (Dashboard → Settings → S3 Access Keys) |
| `SUPABASE_S3_SECRET_KEY` | Supabase Storage S3 secret key |
| `SUPABASE_S3_REGION` | Supabase project region (e.g. `us-east-1`) |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `RATE_LIMIT_PUBLIC_MAX_REQUESTS` | Max requests per window for public endpoints |
| `RATE_LIMIT_PUBLIC_WINDOW_SECS` | Time window for public rate limit in seconds |
| `RATE_LIMIT_ADMIN_MAX_REQUESTS` | Max requests per window for authenticated endpoints |
| `RATE_LIMIT_ADMIN_WINDOW_SECS` | Time window for admin rate limit in seconds |
| `RATE_LIMIT_AUTH_BASE_DELAY_MS` | Base delay for Auth Exponential Backoff (ms) |
| `RATE_LIMIT_AUTH_MAX_DELAY_MS` | Max delay for Auth Exponential Backoff (ms) |
| `GMAIL_CLIENT_ID` | GCP OAuth2 client ID |
| `GMAIL_CLIENT_SECRET` | GCP OAuth2 client secret |
| `GMAIL_REFRESH_TOKEN` | Gmail OAuth2 refresh token (one-time consent) |
| `GMAIL_SENDER_EMAIL` | Gmail address used to send notifications |
| `ADMIN_EMAIL` | Recipient email for contact form notifications |

### 3. Push schema to database

```bash
npx drizzle-kit push
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). API endpoints are available at `/api/*`.

## Database Migrations

Generate a migration after changing `src/db/schema.ts`:

```bash
npx drizzle-kit generate
```

Apply migrations:

```bash
npx drizzle-kit push
```

## Scaling & Security Strategy

Public pages use ISR (`revalidate` or tag-based). Concurrent users hit Vercel's edge CDN — not the origin or Postgres. PDFs and images are served directly from Supabase Storage's public URLs, never proxied through a serverless function. The Supavisor pooler prevents connection exhaustion under concurrent serverless invocations.

**Tiered Rate Limiting (Upstash Redis)**:
- **Public Endpoints**: Moderate sliding window limits on all `GET` routes and `/api/contact`.
- **Admin Endpoints**: Looser limits on data mutation routes (`POST`, `PATCH`, `DELETE`) protected by `requireAdmin()`.
- **Auth Flow**: Custom exponential backoff (`delay = base * (2 ^ attempts)`) keyed by both IP and Email. This secures endpoints like `/api/auth/forgot-password` against brute-forcing without permanently locking out users. Admin writes trigger `revalidatePath` / `revalidateTag` for immediate cache busting.

**File Upload Security**:
- Assets are stored completely outside the runtime on isolated **Supabase Storage**.
- CSV endpoints enforce hard `< 5MB` bounds and strict `text/csv` checks before the file ever hits memory to prevent DoS attacks.
- S3 signed URLs are strictly typed and cryptographically enforce a whitelist of MIME types (`image/jpeg`, `image/png`, `image/webp`, `application/pdf`) directly inside the `PutObjectCommand` AWS signature.

## Free-Tier Limits to Watch

- **Supabase** pauses after 7 days of zero activity → mitigate with a daily cron hitting `GET /api/health`.
- **Supabase DB** caps at 500 MB → never store file bytes in Postgres; Supabase Storage URLs only.
- **Supabase Storage** free tier is 1 GB — monitor usage if gallery/downloads grow significantly.
- **Vercel Hobby** functions have a 10 s execution limit → all handlers are quick CRUD, no heavy processing.
- **Upstash Redis** has 10 k commands/day → handles rate limiting for public, admin, and auth endpoints; monitor usage closely if traffic spikes.

## Deploy on Vercel

1. Push to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Set environment variables in the Vercel dashboard.
4. Deploy — Vercel auto-detects Next.js and builds with Turbopack.
5. Set up a daily cron (Vercel Cron or GitHub Actions) to hit `/api/health` and prevent Supabase free-tier pausing.
