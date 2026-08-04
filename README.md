<div align="center">
  <img src="public/logo.png" alt="KGEC Logo" width="100" />
  <h1>Kalyani Government Engineering College</h1>
  <p><b>Official Web Portal & Backend API System</b></p>
  <p><i>Rebuilt on a modern, zero-cost stack designed for performance & zero-trust security</i></p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://orm.drizzle.team"><img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" /></a>
    <a href="https://supabase.com"><img src="https://img.shields.io/badge/Supabase_Postgres-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>
    <a href="https://authjs.dev"><img src="https://img.shields.io/badge/NextAuth.js_v5-5A0FC8?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="NextAuth.js" /></a>
    <a href="https://upstash.com"><img src="https://img.shields.io/badge/Upstash_Redis-00E599?style=for-the-badge&logo=redis&logoColor=white" alt="Upstash Redis" /></a>
  </p>
</div>

---

## 🛠️ Stack Overview (100% Free Tier)

| Layer | Technology | Specification / Limits |
| --- | --- | --- |
| **Framework** | Next.js 16 (App Router + Turbopack) | Vercel Hobby (100 GB/mo bandwidth, 10s function execution) |
| **Database** | Supabase PostgreSQL | Free Tier (500 MB storage, `timestamptz` enabled) |
| **ORM** | Drizzle ORM + Drizzle Kit | Type-safe SQL query builder and migrations |
| **Authentication** | NextAuth.js v5 (Auth.js) | Google OAuth + `admin_allowlist` gating (Stateless 30-day JWT) |
| **File Storage** | Supabase Storage (S3 API) | `@aws-sdk/client-s3` presigned PUT uploads (1 GB free storage) |
| **Rate Limiting** | Upstash Redis | 10k commands/day (Sliding window on `/api/v1/contact` only) |
| **Email Service** | Gmail API (GCP OAuth2) | Direct notification emails on contact form submission |
| **Validation** | Zod | Request body & query parameter schema validation across all endpoints |
| **CSV Engine** | PapaParse | Stream/memory CSV parsing for placements & enrollment batch uploads |
| **Animation & UI** | GSAP, Framer Motion | Advanced scroll-linked animations, drag carousels, and page transitions |
| **Smooth Scroll** | Lenis | Hardware-accelerated smooth scrolling experience |
| **Data Visualization** | Recharts | Responsive data visualization for placement & enrollment stats |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/          # Public website pages
│   │   ├── about/         # Institutional overview, vision & mission
│   │   ├── administration/# Principal's desk, administrative bodies
│   │   ├── admission/     # UG, PG & MCA admission info
│   │   ├── alumni/        # Alumni network and registration
│   │   ├── campus-life/   # Facilities, hostels, library, student clubs
│   │   ├── departments/   # Academic departments (CSE, IT, ECE, ME, EE, etc.)
│   │   ├── downloads/     # Public document repository
│   │   ├── gallery/       # Dynamic photo gallery
│   │   ├── iic/           # Institution's Innovation Council
│   │   ├── iqac/          # Internal Quality Assurance Cell
│   │   ├── naac/          # NAAC accreditation details
│   │   ├── nirf/          # NIRF ranking data
│   │   ├── notices/       # Public notice board
│   │   ├── research/      # Research initiatives and publications
│   │   ├── rti/           # Right to Information
│   │   └── training-and-placement/ # T&P cell, stats & recruiter info
│   ├── admin/             # Secure admin dashboard pages
│   └── api/
│       └── v1/            # Versioned API Route Handlers (32 total)
│           ├── admin/     # Dashboard metrics, audit log, allowlist management
│           ├── admissions/# Seat matrix & important dates
│           ├── auth/      # Status & NextAuth Google OAuth catch-all
│           ├── contact/   # Contact form submission + email notification
│           ├── downloads/ # Document downloads repository
│           ├── enrollment/# Enrollment statistics & department breakdowns
│           ├── events/    # Campus events calendar
│           ├── gallery/   # Photo gallery albums
│           ├── health/    # Database ping & uptime monitor
│           ├── news/      # Campus news & press releases
│           ├── notices/   # Notice board & search
│           ├── placements/# Placement stats, per-dept data & recruiter logos
│           ├── staff/     # Administration & faculty directory
│           └── storage/   # Presigned S3 upload URLs
└── lib/
    ├── audit.ts           # Automatic CUD audit logging helper (writeAuditLog)
    ├── auth.ts            # NextAuth.js v5 configuration & allowlist callback
    ├── db/                # Drizzle ORM
    │   ├── schema.ts      # Enums, tables (15 total), FKs & indexes (10 total)
    │   └── migrate.mjs    # Database migration execution script
    ├── middlewares/
    │   ├── auth.ts        # requireAdmin() session guard
    │   └── ratelimit.ts   # Upstash Redis rate limiter (contact form)
    ├── services/
    │   ├── email.ts       # Gmail API (GCP OAuth2) notification service
    │   └── storage.ts     # AWS S3 SDK presigned URL generator for Supabase
    └── validators/        # Zod validation schemas
        └── index.ts
```

---

## ⚙️ API Conventions

- **Route Versioning**: All API endpoints strictly reside under `/api/v1/*`.
- **Public Read Access**: All `GET` endpoints are public and unauthenticated.
- **Admin Mutation Guards**: `POST`, `PATCH`, `DELETE` routes require Google OAuth authentication with an email listed in the PostgreSQL `admin_allowlist` table.
- **Audit Logging**: Every admin mutation automatically records a log entry in `audit_log` with admin ID, email, action type (`create`, `update`, `delete`, `grant`, `revoke`), target resource, and metadata.
- **Consistent Response Shapes**:
  - **Success (Single)**: `{ "data": { ... } }`
  - **Success (List)**: `{ "data": [ ... ], "count": number }`
  - **Error**: `{ "error": "Description message" }`
  - **Validation Error**: `{ "error": "Validation failed", "issues": ZodIssue[] }`

---

## 📡 API Endpoint Reference (32 Handlers under `/api/v1/*`)

### 📋 System & Auth

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/api/v1/health` | Public | Real DB ping via `count(admin_allowlist)`. Use with cron to prevent Supabase auto-pausing. |
| `GET` | `/api/v1/auth/status` | Public | Returns `{ data: { isAdmin: boolean } }` for current session. |
| `GET\|POST` | `/api/v1/auth/[...nextauth]` | Public | NextAuth.js Google OAuth flow endpoints (`/signin`, `/callback/google`, `/signout`). |

---

### 📢 Notices

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/notices` | Public | `?type=general\|admission\|placement\|academic\|exam\|result&limit=20&page=1` | `{ data: Notice[], count: number }` |
| `GET` | `/api/v1/notices/search` | Public | `?q=search_query` | `{ data: Notice[] }` |
| `GET` | `/api/v1/notices/[id]` | Public | — | `{ data: Notice }` or `404` |
| `POST` | `/api/v1/notices` | Admin | `{ title, type?, fileUrl?, fileName?, fileType?, isActive? }` | `201 { data: Notice }` |
| `PATCH` | `/api/v1/notices/[id]` | Admin | Partial `{ title?, type?, fileUrl?, fileName?, fileType?, isActive? }` | `{ data: Notice }` |
| `DELETE` | `/api/v1/notices/[id]` | Admin | — | `{ data: { success: true } }` |

---

### 📰 News

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/news` | Public | `?limit=20` | `{ data: NewsItem[] }` |
| `GET` | `/api/v1/news/[slug]` | Public | — | `{ data: NewsItem }` or `404` |
| `POST` | `/api/v1/news` | Admin | `{ slug, title, imageUrl?, body: JSON }` | `201 { data: NewsItem }` |
| `PATCH` | `/api/v1/news/[slug]` | Admin | Partial `{ slug?, title?, imageUrl?, body? }` | `{ data: NewsItem }` |
| `DELETE` | `/api/v1/news/[slug]` | Admin | — | `{ data: { success: true } }` |

---

### 📅 Events

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/events` | Public | `?upcoming=true` (optional, filters future events) | `{ data: Event[] }` |
| `GET` | `/api/v1/events/[id]` | Public | — | `{ data: Event }` or `404` |
| `POST` | `/api/v1/events` | Admin | `{ title, description?, eventDate, externalLink? }` | `201 { data: Event }` |
| `PATCH` | `/api/v1/events/[id]` | Admin | Partial `{ title?, description?, eventDate?, externalLink? }` | `{ data: Event }` |
| `DELETE` | `/api/v1/events/[id]` | Admin | — | `{ data: { success: true } }` |

---

### 📥 Downloads

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/downloads` | Public | `?category=general\|mandatory_disclosure\|nirf\|iqac\|naac\|notices` | `{ data: Download[] }` |
| `POST` | `/api/v1/downloads` | Admin | `{ title, fileUrl, category? }` | `201 { data: Download }` |
| `DELETE` | `/api/v1/downloads/[id]` | Admin | — | `{ data: { success: true } }` |

---

### 🖼️ Gallery

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/gallery` | Public | `?album=<name>` (optional) | `{ data: GalleryImage[] }` |
| `POST` | `/api/v1/gallery` | Admin | `{ album, imageUrl, caption? }` | `201 { data: GalleryImage }` |
| `DELETE` | `/api/v1/gallery/[id]` | Admin | — | `{ data: { success: true } }` |

---

### 🎓 Admissions

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/admissions/[program]` | Public | `program`: `ug_btech \| pg_mtech \| pg_mca` | `{ data: { program, seatMatrix, importantDates } }` |
| `PATCH` | `/api/v1/admissions/[program]` | Admin | `{ seatMatrix?, importantDates? }` (upserts) | `{ data: Admission }` |

---

### 💼 Placements

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/placements/stats` | Public | `?year=2024` (optional) | `{ data: PlacementStat[] }` or `{ data: PlacementStat }` |
| `GET` | `/api/v1/placements/departments` | Public | `?year=2024` (required) | `{ data: PlacementDepartment[] }` |
| `GET` | `/api/v1/placements/recruiters` | Public | `?year=2024` (required) | `{ data: PlacementRecruiter[] }` |
| `PATCH` | `/api/v1/placements/recruiters/[id]` | Admin | `{ logoUrl }` | `{ data: PlacementRecruiter }` |
| `POST` | `/api/v1/placements/departments/upload` | Admin | CSV file (`year, department, students_placed, median_salary, highest_salary`) | `{ data: { inserted: number, year: number } }` |
| `POST` | `/api/v1/placements/recruiters/upload` | Admin | CSV file (`year, company, offers`) | `{ data: { inserted: number, year: number } }` |

---

### 📊 Enrollment

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/enrollment/stats` | Public | `?year=2024` (optional) | `{ data: InstituteEnrollmentStat[] }` |
| `GET` | `/api/v1/enrollment/departments` | Public | `?year=2024` (required) | `{ data: DepartmentEnrollment[] }` |
| `POST` | `/api/v1/enrollment/departments/upload` | Admin | CSV file (`year, department, total_students, male_students, female_students`) | `{ data: { inserted: number, year: number } }` |

---

### 👥 Staff Directory

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/staff` | Public | `?role=faculty\|hod...&department=cse\|it...` | `{ data: Staff[] }` |
| `GET` | `/api/v1/staff/[id]` | Public | — | `{ data: Staff }` or `404` |
| `POST` | `/api/v1/staff` | Admin | `{ name, email, employeeId, role, department?, photoUrl?, education?, researchPaperLinks? }` | `201 { data: Staff }` |
| `PATCH` | `/api/v1/staff/[id]` | Admin | Partial `{ name?, email?, employeeId?, role?, department?, photoUrl?, education?, researchPaperLinks? }` | `{ data: Staff }` |
| `DELETE` | `/api/v1/staff/[id]` | Admin | — | `{ data: { success: true } }` |

---

### 📧 Contact Form

| Method | Path | Auth | Body | Response |
| --- | --- | --- | --- | --- |
| `POST` | `/api/v1/contact` | Public (10 req/hr per IP) | `{ name, email, message (min 10 chars) }` | `201 { data: { id, success: true } }` |

---

### 📦 Storage (Supabase S3 Signed URLs)

| Method | Path | Auth | Body | Response |
| --- | --- | --- | --- | --- |
| `POST` | `/api/v1/storage/signed-url` | Admin | `{ bucket: "notices"\|"downloads"\|"gallery"\|"news"\|"staff"\|"recruiters", filename, contentType }` | `{ data: { uploadUrl, publicUrl, key } }` |

---

### 🛡️ Admin Management

| Method | Path | Auth | Query / Body | Response |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/admin/dashboard` | Admin | — | `{ data: { counts: { notices, news, events, downloads, gallery, staff }, recentAudits: AuditLog[] } }` |
| `GET` | `/api/v1/admin/audit-log` | Admin | `?limit=50&page=1` | `{ data: AuditLog[], count: number }` |
| `GET` | `/api/v1/admin/allowlist` | Admin | — | `{ data: AdminAllowlistEntry[] }` |
| `POST` | `/api/v1/admin/allowlist` | Admin | `{ email, name? }` | `201 { data: AdminAllowlistEntry }` |
| `DELETE` | `/api/v1/admin/allowlist/[id]` | Admin | — | `{ data: { success: true } }` |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Supabase Project (PostgreSQL + Storage Buckets)
- Google Cloud Platform (GCP) Project with Google OAuth 2.0 Credentials & Gmail API enabled
- Upstash Redis database instance

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Create `.env` based on `.env.example`:

```bash
cp .env.example .env
```

Fill in the required configuration:

```env
# Database & Storage
SUPABASE_URL=https://your-supabase-ref.supabase.co
DATABASE_URL=postgres://postgres.ref:password@aws-0-region.pooler.supabase.com:6543/postgres
DIRECT_URL=postgres://postgres.ref:password@aws-0-region.pooler.supabase.com:5432/postgres
SUPABASE_S3_ACCESS_KEY=your-s3-access-key
SUPABASE_S3_SECRET_KEY=your-s3-secret-key
SUPABASE_S3_REGION=us-east-1

# Google OAuth & NextAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-32-character-secret-key
NEXTAUTH_URL=http://localhost:3000

# Rate Limiting & Email
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
GMAIL_CLIENT_ID=your-gmail-client-id
GMAIL_CLIENT_SECRET=your-gmail-client-secret
GMAIL_REFRESH_TOKEN=your-gmail-refresh-token
GMAIL_SENDER_EMAIL=kgec.notifications@gmail.com
ADMIN_EMAIL=admin@kgec.ac.in
```

### 3. Database Migration & Seeding

Run the schema migration:

```bash
npx drizzle-kit push
```

Seed initial authorized admin entries:

```bash
psql $DATABASE_URL -f seed.sql
```

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🧪 Verification & Testing

Run the full endpoint test suite against the local development server:

```bash
node src/app/api/v1/__tests__/test-endpoints.mjs
```

To run TypeScript typechecking:

```bash
npx tsc --noEmit
```

---

## ✨ Key Features & Architecture Highlights

- **🔒 Zero-Trust Admin Security**: Direct Google OAuth with instant `admin_allowlist` verification — unauthorized Google accounts are immediately rejected and redirected to `/admin/access-denied`.
- **📜 Full Mutation Audit Trail**: Every `create`, `update`, `delete`, `grant`, or `revoke` action by an admin is recorded in `audit_log` with admin email, timestamp, resource target, and metadata.
- **📊 CSV Batch Data Ingestion**: Memory-efficient stream parsing for Placement records, Recruiter metrics, and Departmental Enrollment statistics with automated aggregate calculation.
- **⚡ High-Performance CDN Caching**: Public read routes utilize Next.js ISR and CDN caching; static files, logos, and PDFs serve directly via Supabase S3 storage presigned URLs.
- **🛡️ Shielded Contact Endpoint**: Upstash Redis sliding window rate limiter (10 requests/hr per IP) paired with async Gmail API notification dispatching.

---

<div align="center">
  <img src="public/logo.png" alt="KGEC Emblem" width="60" />
  <h3>Kalyani Government Engineering College</h3>
  <p>Official Web Portal — Kalyani, Nadia, West Bengal 741235<br />
  <i>Affiliated to MAKAUT, West Bengal | Approved by AICTE</i></p>
  <p>© 2026 <b>Kalyani Government Engineering College</b>. All Rights Reserved.</p>
</div>

