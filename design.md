# KGEC Website Rebuild — Design & Architecture Document

## 1. Overview

The KGEC Website Rebuild is a modern, high-performance web portal for Kalyani Government Engineering College — a rebuild of `kgec.edu.in` that preserves the live site's information architecture while modernizing it into a component-driven, CMS-backed structure. The project follows a **zero-cost architecture**, maximizing free-tier usage while remaining scalable enough to absorb concurrent traffic spikes during results or admission periods.

### Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, RSC by default) |
| Language | TypeScript |
| Backend/API | Next.js Route Handlers under `app/api/*` — no separate server |
| Styling | Tailwind CSS v4, shadcn/ui, Framer Motion |
| Forms | react-hook-form + Zod |
| Database | Supabase Postgres |
| ORM | Drizzle ORM |
| Authentication | Supabase Auth — admin-only, magic link / email-password (PKCE flow) |
| Storage | Supabase Storage (S3-compatible) |
| Rate Limiting | Upstash Redis |
| Hosting | Vercel |

> **Note:** the frontend prototyping docs this design was reconciled against reference Next.js 15; this document standardizes on **Next.js 16** as the target version. Confirm the App Router APIs used in the route map below (Route Handlers, `revalidateTag`) are unaffected before implementation.

## 2. Content Strategy — Static vs. Backend-Driven

Calling the API for content that almost never changes is what kills the experience — an extra network hop, loading states, and a page that's only as fast as the database, all for text that gets edited once a year. The project draws a deliberate, blunt line:

- **If content changes less than ~once a month, and no non-developer staff member needs to self-serve edit it → it's a hardcoded file in the repo** (local MDX/TSX), not a DB row, not an API call. Editing means editing a file and redeploying (~30s on Vercel) — cheaper than running a CMS for it.
- **If content changes often, or an admin genuinely needs to update it without a developer → it's backend-driven** (DB + API route).

| Static — no backend, no fetch | Backend-driven — real reason to hit the DB |
|---|---|
| About Us narrative, Mission & Vision, Principal's Desk text, Industry Relations | Notices (posted weekly, by non-dev staff) |
| Green Campus page | News |
| IIC sub-pages (National Startup Policy, IIC report, E-Cell, IIPC) | Events |
| Research overview page | Downloads (files added ad hoc by admin) |
| Admission eligibility/process text (UG/PG) | Admissions seat matrix + important dates (updated yearly by TPO/admin, not a dev) |
| IQAC / NAAC / RTI narrative text | Downloads-by-category lists feeding IQAC/NAAC/RTI/NIRF (the PDFs, not the page copy) |
| Nav config, footer links | Staff/Faculty directory (roles/photos change with hiring, not worth a redeploy) |
| — | Gallery images |
| — | Contact page address/map (if it needs runtime edits) |
| — | Placement stats (published yearly) |
| — | Contact form submissions (write-only, must hit the DB) |

This cuts the API surface roughly in half versus a naive "everything is a CMS page" design — there is no generic `pages` table. About/Research/IIC/IQAC/NAAC/RTI/Green Campus render as plain React Server Components consuming local MDX: zero data fetching, no loading skeleton, no fetch waterfall, and no dependency on Supabase being up for a page that is ~95% static text.

## 3. Architecture

### 3.1 Next.js App Router

The application uses the Next.js App Router (`src/app`) for routing and rendering:

- **`(public)`** — all public-facing pages (Home, About, Admissions, Departments, etc.), optimized for static generation and ISR (Incremental Static Regeneration).
- **`admin`** — secure dashboard for administrators to manage content, protected by session guards (`layout.tsx` redirects if no session).
- **`api`** — Next.js Route Handlers serving as the backend API layer.

### 3.2 Route Map

```
app/
├── (public)/
│   ├── page.tsx                              // Home
│   ├── about/page.tsx                        // static (MDX)
│   ├── about/green-campus/page.tsx           // static (MDX)
│   ├── administration/
│   │   ├── principal/page.tsx
│   │   ├── registrar/page.tsx
│   │   ├── accounts-officer/page.tsx
│   │   ├── hods/page.tsx
│   │   ├── hostel-super/page.tsx
│   │   └── caretaker/page.tsx
│   ├── departments/
│   │   ├── page.tsx                          // grid of all departments
│   │   └── [slug]/page.tsx                   // cse, ee, ece, it, me, ca, ph, ch, math, hmnt
│   ├── admission/
│   │   ├── ug-btech/page.tsx
│   │   ├── pg-mtech/page.tsx
│   │   └── pg-mca/page.tsx
│   ├── iic/
│   │   ├── page.tsx                          // static (MDX)
│   │   ├── national-startup-policy/page.tsx  // static (MDX)
│   │   ├── institute-innovation-council/page.tsx
│   │   ├── e-cell/page.tsx
│   │   └── iipc/page.tsx
│   ├── research/page.tsx                     // static (MDX)
│   ├── training-and-placement/
│   │   ├── page.tsx                          // TPO's Desk
│   │   ├── statistics/page.tsx               // placement dashboard
│   │   └── notices/page.tsx
│   ├── iqac/page.tsx                         // static copy + dynamic downloads list
│   ├── naac/page.tsx
│   ├── rti/page.tsx
│   ├── nirf/page.tsx
│   ├── contact/page.tsx
│   ├── gallery/page.tsx
│   ├── downloads/page.tsx
│   ├── notices/[id]/page.tsx                 // deep link to a single notice
│   └── news/[slug]/page.tsx
├── admin/                                     // auth-gated
│   ├── layout.tsx                             // guard: redirect if no session
│   ├── page.tsx                               // dashboard
│   ├── notices/page.tsx
│   ├── notices/new/page.tsx
│   ├── news/page.tsx
│   ├── events/page.tsx
│   ├── downloads/page.tsx
│   ├── gallery/page.tsx
│   ├── departments/[slug]/faculty/page.tsx
│   └── placements/page.tsx
└── api/
    ├── notices/route.ts                       // GET list, POST create
    ├── notices/[id]/route.ts                  // GET, PATCH, DELETE
    ├── news/route.ts
    ├── news/[slug]/route.ts
    ├── events/route.ts
    ├── downloads/route.ts
    ├── gallery/route.ts
    ├── departments/route.ts
    ├── departments/[slug]/route.ts
    ├── departments/[slug]/faculty/route.ts
    ├── placements/stats/route.ts
    ├── placements/departments/route.ts
    ├── placements/departments/upload/route.ts
    ├── placements/recruiters/route.ts
    ├── placements/recruiters/upload/route.ts
    ├── admissions/[program]/route.ts          // ug-btech | pg-mtech | pg-mca (seat matrix + dates only)
    ├── staff/route.ts                         // GET ?role= — powers Administration + Faculty listings
    ├── contact/route.ts                       // POST — contact form submissions
    └── auth/[...supabase]/route.ts            // Supabase auth callback

// Deliberately absent: app/api/pages/* — About/Research/IIC/IQAC/NAAC/RTI copy is local MDX, never fetched.
```

### 3.3 Global Layout

- `app/layout.tsx` — `<Navbar>`, `<TopUtilityBar>` (Downloads / Gallery / Mandatory Disclosure / Online Payment links), `<Footer>`, toast provider.
- `<Navbar>` — mega-menu driven by a static `nav-config.ts` (About Us, Administration, Departments, Admission, IIC, Research, Training & Placement, IQAC, NAAC, RTI, NIRF Data, Contact Us). Kept static and out of the DB — it changes rarely and shouldn't cost a query on every request.
- `<Footer>` — Academics links, Explore KGEC, Weblinks (E-Cell, MAKAUT, AICTE, Anti-Ragging, Alumni), contact block.

### 3.4 API Layer & Conventions

- **Public routes:** `GET` routes are publicly accessible without authentication.
- **Mutating routes:** `POST`, `PATCH`, `DELETE` are gated behind a `requireAdmin()` middleware, except specific public-but-rate-limited endpoints like `/api/contact`.
- **Validation:** every request payload is validated with **Zod**; invalid payloads return `400` with structured error issues.
- **Cache revalidation:** mutating handlers call `revalidatePath()` or `revalidateTag()` so ISR pages update immediately after data changes (e.g. `revalidateTag('placements')` on CSV upload).
- **Pagination:** all list endpoints support `?limit=` and `?page=`.
- **Auth enforcement:** all admin-mutating endpoints require a Supabase session (checked via middleware) and return `401` otherwise.
- **Standard response shape:** `{ data: T }` or `{ error: string }`.

## 4. Page-by-Page Breakdown

**Home (`/`)** — `<HeroCarousel>` (static image array, `content/hero-images.ts`), `<HighlightsGrid>` (static cards), `<NoticeBoard>` (`GET /api/notices?limit=6`, ISR ~5 min), `<NewsCarousel>` (`GET /api/news?limit=5`), `<EventsList>` (`GET /api/events?upcoming=true`), `<StudentFacilities>` (static cards), `<QuickLinksFooterStrip>` (Academic Calendar, REASON Journal, Syllabus, National Digital Library).

**About Us (`/about`) — static, no backend.** Institute Information, Mission & Vision, Principal's Desk, Industry Relations as local MDX (`content/about.mdx`) rendered by a Server Component; Mission & Vision / Principal's Desk / Industry Relations as `<Accordion>` sections. `/about/green-campus` follows the same pattern (`content/green-campus.mdx`).

**Administration (`/administration/*`)** — each sub-route (Principal, Registrar, Accounts Officer, HODs, Hostel Super, Caretaker) renders a `<StaffProfileCard>` list from the `staff` table filtered by role enum; HODs page pulls one row per department via `staff.department_id`.

**Departments (`/departments`, `/departments/[slug]`)** — index uses `<DepartmentGrid>` (`GET /api/departments`); detail page shows header (name, established year, HOD, intake) with Overview / Faculty / Facilities / Syllabus tabs and `<FacultyList>` (`GET /api/departments/[slug]/faculty`). 10 departments: CSE, EE, ECE, IT, ME, CA, Physics, Chemistry, Mathematics, Humanities.

**Admission (`/admission/*`)** — three pages (UG B.Tech, PG M.Tech, PG MCA); eligibility/process copy is static, seat matrix and important dates come from the `admissions` table so TPO/admin can update yearly without a redeploy.

**IIC (`/iic/*`) — static pages + one backend piece.** 5 sub-pages of local MDX narrative (`content/iic/*.mdx`); the one dynamic piece is downloadable PDFs (National Startup Policy doc, IIC report) via `<DownloadsTable category="iic">` (`GET /api/downloads`), since PDFs get added/replaced over time.

**Research (`/research`) — static.** Local MDX (`content/research.mdx`), no fetch. A faculty-publications table is a phase-2 idea, not in the base build.

**Training & Placement (`/training-and-placement/*`)**
- TPO's Desk — static page + contact card.
- Placement Statistics — a small dashboard, driven by a shared `<YearSelector>`:
  - `<PlacementTrendChart>` (line) — `GET /api/placements/stats?year=`
  - `<PlacementDeptPieChart>` (pie) — `GET /api/placements/departments?year=`
  - `<RecruiterPieChart>` (pie) — `GET /api/placements/recruiters?year=`
  - `<PlacementSalaryBarChart>` (bar) — same departments endpoint
  - All four fetch with `next: { tags: ['placements'] }`; a CSV upload fires `revalidateTag('placements')` and every chart updates without a redeploy or manual refresh.
  - Admin side (`/admin/placements`) — a `<CsvUploadDropzone>` per data type (departments, recruiters): template download link, drag-drop upload, parsed preview table, inline per-row validation errors (e.g. "row 4: students_placed must be a number"). Confirm → `POST /api/placements/departments/upload` or `.../recruiters/upload`.
  - Placement Notices reuse `<NoticeBoard>` filtered by `category=placement`.

**IQAC / NAAC / RTI (`/iqac`, `/naac`, `/rti`) — static copy + backend-driven PDF list.** Narrative/intro text is local MDX; the PDF list is the dynamic part, via `<DownloadsTable>` filtered by category (`GET /api/downloads`).

**NIRF (`/nirf`)** — static list of yearly PDF links (`downloads` table, `category=nirf`).

**Contact (`/contact`)** — `<ContactForm>` (react-hook-form + Zod) → `POST /api/contact` → inserts into `contact_submissions`, optionally notifies admin by email; static address/phone/email plus embedded Google Map.

**Gallery (`/gallery`)** — masonry grid, `GET /api/gallery?album=`, images in the Supabase Storage `gallery` bucket.

**Downloads (`/downloads`)** — table/list UI, `GET /api/downloads?category=`, replacing the old download modal. Categories: general, mandatory-disclosure, nirf, iqac, notices.

**Notices (`/notices/[id]`)** — deep-linkable single notice with PDF preview/download, replacing the old "open PDF in new tab" pattern.

## 5. Shared Components

| Component | Used on |
|---|---|
| `<Navbar>` / `<MegaMenu>` | global |
| `<NoticeBoard>` | Home, TPO Notices |
| `<DownloadsTable>` | Downloads, IQAC, NAAC, NIRF, IIC |
| `<StaffProfileCard>` | Administration, Departments |
| `<DepartmentGrid>` / `<DepartmentCard>` | Departments index |
| `<PlacementTrendChart>` / `<PlacementDeptPieChart>` / `<RecruiterPieChart>` / `<PlacementSalaryBarChart>` | Placement Statistics |
| `<CsvUploadDropzone>` | Admin Placements |
| `<EventsList>` / `<NewsCarousel>` | Home |
| `<ContactForm>` | Contact |
| `<PdfBadge>` (the old "new" gif equivalent) | Notices, Downloads |

## 6. Data Model

The database schema is defined using Drizzle ORM in `src/lib/db/schema.ts` and managed via `drizzle-kit`.

### Key Entities

- **`notices`** — general, admission, placement, academic, and exam notices; `id, title, pdf_url, category, is_new, published_at`.
- **`news`** — `id, slug, title, image_url, body (JSONB), published_at`.
- **`events`** — `id, title, description, event_date, external_link`.
- **`downloads`** — categorized resources (NIRF, IQAC, Mandatory Disclosure, general, notices); `id, title, file_url, category, uploaded_at`.
- **`gallery_images`** — `id, album, image_url, caption`.
- **`departments`** — `id, slug, name, established_year, hod_staff_id, intake`.
- **`staff`** — `id, name, role (enum: principal, registrar, accounts_officer, hod, hostel_super, caretaker, faculty), department_id, photo_url, email, phone`; powers Administration sub-pages and department Faculty tabs.
- **`admissions`** — `id, program (enum: ug_btech, pg_mtech, pg_mca), seat_matrix (JSONB), important_dates (JSONB)`.
- **`placement_stats`** — `id, year, students_placed, median_salary, highest_salary` (year-level rollup, auto-computed on CSV upload).
- **`placement_departments`** — `id, year, department, students_placed, median_salary, highest_salary` (one row per department per year; feeds pie/bar charts).
- **`placement_recruiters`** — `id, year, company, offers` (one row per recruiting company per year; feeds the recruiter pie chart).
- **`contact_submissions`** — `id, name, email, message, submitted_at`.
- **`password_reset_otps`** — secure OTP tracking for the admin forgot-password flow.

*Static content — department overviews, staff bios (where authored in prose), About/Research/IIC/IQAC/NAAC/RTI/Green Campus page copy — is not stored in the database; it lives as local MDX/TS in `content/*`.*

## 7. Key Integrations

- **Supabase Postgres (Supavisor)** — uses the Supavisor connection pooler to prevent connection exhaustion during concurrent serverless invocations.
- **Supabase Storage** — handles file uploads (notice PDFs, gallery images, downloads). Generates S3-compatible presigned URLs for direct browser-to-storage uploads, bypassing Vercel functions to stay within execution limits.
- **Supabase Auth** — manages admin sessions via PKCE flow (magic link or email/password) and custom OTP-based password resets.
- **Upstash Redis** — powers distributed, tiered rate limiting.
- **Gmail API (GCP)** — sends transactional email (OTPs, contact form notifications) via OAuth2 refresh tokens. *(A managed provider such as Resend was considered as a lower-friction alternative for contact-form notifications; Gmail API is retained as the baseline to avoid a second email vendor, and can be swapped in a later phase if deliverability becomes an issue.)*

## 8. API Contract (`app/api/*`)

All list endpoints support `?limit=` and `?page=` for pagination. All admin-mutating endpoints require a Supabase session (checked via middleware) and return `401` otherwise.

**Notices**
- `GET /api/notices?limit=&category=&page=` → `{ data: Notice[], count: number }`
- `GET /api/notices/[id]` → `Notice`
- `POST /api/notices` (admin) → body `{ title, pdf_url, category }` → `201 { id }`
- `PATCH /api/notices/[id]` (admin) → partial update
- `DELETE /api/notices/[id]` (admin) → `204`

**News**
- `GET /api/news?limit=` → `{ data: NewsItem[] }`
- `GET /api/news/[slug]` → `NewsItem`
- `POST /api/news` (admin)

**Events**
- `GET /api/events?upcoming=true|false` → `{ data: Event[] }`
- `POST /api/events` (admin)

**Downloads**
- `GET /api/downloads?category=` → `{ data: Download[] }`
- `POST /api/downloads` (admin, multipart upload → Supabase Storage → row insert)

**Gallery**
- `GET /api/gallery?album=` → `{ data: GalleryImage[] }`
- `POST /api/gallery` (admin, multipart upload)

**Departments**
- `GET /api/departments` → `{ data: Department[] }`
- `GET /api/departments/[slug]` → `Department & { hod: Staff }`
- `GET /api/departments/[slug]/faculty` → `{ data: Staff[] }`

**Staff / Administration**
- `GET /api/staff?role=` → `{ data: Staff[] }` — powers Administration sub-pages and department Faculty tabs
- `POST /api/staff`, `PATCH /api/staff/[id]` (admin)

**Admissions**
- `GET /api/admissions/[program]` → `{ seat_matrix, important_dates }` (eligibility/process copy is static MDX, not part of this response)
- `PATCH /api/admissions/[program]` (admin)

**Placements**
- `GET /api/placements/stats?year=` → `{ data: PlacementStat[] }` — year-level trend line data
- `GET /api/placements/departments?year=` → `{ data: DepartmentPlacementStat[] }` — pie/bar chart source
- `GET /api/placements/recruiters?year=` → `{ data: RecruiterStat[] }` — recruiter pie chart source
- `POST /api/placements/departments/upload` (admin, multipart CSV) → parses, validates, upserts department rows for that year, recomputes `placement_stats` rollup, `revalidateTag('placements')` → `200 { inserted: number, errors: RowError[] }`
- `POST /api/placements/recruiters/upload` (admin, multipart CSV) → same pattern for recruiter rows → `200 { inserted: number, errors: RowError[] }`

**Contact**
- `POST /api/contact` → body `{ name, email, message }` → `201`, triggers email notify

**Auth**
- `app/api/auth/[...supabase]/route.ts` — Supabase Auth callback handler for admin login (magic link / email-password), sets session cookie.

## 9. Rendering Strategy

| Route | Strategy |
|---|---|
| About, Green Campus, IIC copy, Research, IQAC/NAAC/RTI copy, Admission eligibility text | Fully static — no revalidation, rebuilt only on deploy (local MDX, zero fetch) |
| Home, department pages, staff/administration, admissions seat data | ISR, revalidate 300s |
| Notices, news, events, downloads, gallery | ISR, revalidate 300s, `revalidatePath` triggered on admin POST/PATCH/DELETE |
| Placement statistics | ISR via `next: { tags: ['placements'] }`, invalidated by `revalidateTag('placements')` on CSV upload |
| Contact form | Fully dynamic (form POST) |
| Admin panel | Fully dynamic, SSR + client mutations |

## 10. Security & Performance

### 10.1 Security

- **Strict role-based access** — mutating actions restricted to authenticated admins.
- **File upload security** — files uploaded directly to Supabase via cryptographically signed URLs enforcing strict MIME types (e.g. `image/jpeg`, `application/pdf`), preventing arbitrary file execution.
- **Data validation** — Zod schemas guarantee structural integrity of incoming data before processing (matches the per-row CSV validation used in placement uploads).
- **Auth hardening** — the forgot-password flow uses exponential backoff keyed by IP and email to thwart brute-force attacks.

### 10.2 Performance & Rate Limiting

- **Edge caching & ISR** — public pages are cached at Vercel's edge, so most users never hit Postgres directly; the static/backend split in Section 2 further reduces the pages that need any fetch at all.
- **Tiered rate limiting (Upstash Redis):**
  - **Public** — moderate sliding-window limits for `GET` routes and contact forms.
  - **Admin** — looser limits for authenticated data mutation.
  - **Auth** — strict exponential backoff for sensitive endpoints.

## 11. Directory Structure

```
src/
├── app/
│   ├── (public)/          # Public-facing pages — see full route map in §3.2
│   ├── admin/              # Secure admin dashboard pages
│   └── api/                # Next.js Route Handlers (API layer) — see §8
├── components/              # Reusable React components (UI, layouts, shared components — see §5)
├── content/                 # Static MDX/TSX for hardcoded pages (about, research, iic/*, green-campus, hero-images.ts, nav-config.ts)
├── lib/
│   ├── config/              # Constants and environment configuration (Zod env)
│   ├── db/                  # Drizzle ORM setup, schema, & migrations
│   ├── middlewares/         # Cross-cutting API protections (Auth, requireAdmin, Ratelimit)
│   ├── services/            # External API integrations (Gmail, Supabase Storage)
│   ├── utils/                # Generic helpers
│   └── validators/          # Zod request payload schemas
└── styles/                   # Global stylesheets (Tailwind)
```