# KGEC Website Rebuild — Full Route Map & System Blueprint

> **Companion to README.md & design.md**  
> Complete mapping of all 44 pages (34 public, 10 admin) to the 32 versioned API route handlers (`/api/v1/*`), static rendering strategy, and shared component architecture.

---

## 1. Stack & Architecture Summary

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 16 (App Router, RSC by default) |
| **Backend / API** | Route Handlers under `app/api/v1/*` (versioned from day one) |
| **Database** | Supabase (PostgreSQL) via pooled `DATABASE_URL` |
| **ORM** | Drizzle ORM + `drizzle-kit` |
| **Auth** | NextAuth.js v5 (Auth.js) direct Google OAuth + `admin_allowlist` gating |
| **Storage** | Supabase Storage (S3 API via `@aws-sdk/client-s3`) |
| **Styling** | Tailwind CSS v4 |
| **Deployment** | Vercel |

---

## 2. Static vs Backend-Driven Rule

- **Static Content**: Anything changing less than once a month and not needing non-dev staff editing is a local file (`.tsx` / `.mdx`). No DB queries, no network hops.
- **Backend-Driven Content**: Frequently updated data or content requiring non-dev admin self-service editing lives in Supabase Postgres and is served via `/api/v1/*`.

| Static (Local Repo File) | Backend-Driven (DB + API Route) |
| --- | --- |
| About Us narrative, Mission & Vision, Principal's Desk, Industry Relations | Notices |
| Green Campus page | News & Events |
| IIC sub-pages (National Startup Policy, IIC Report, E-Cell, IIPC) | Downloads repository |
| Research overview | Gallery images |
| Admission eligibility & process text | Admissions seat matrix & important dates |
| IQAC / NAAC / RTI narrative text | Downloads-by-category lists feeding IQAC/NAAC/RTI/NIRF |
| Nav config (`nav-config.ts`), footer links | Staff / Faculty directory |
| Contact page static address & map | Placement statistics & recruiter logos (CSV uploaded) |
| — | Student enrollment stats & gender ratio (CSV uploaded) |
| — | Contact form submissions (write-only) |

---

## 3. Directory Layout (`src/app/`)

```
src/app/
├── (public)/
│   ├── page.tsx                           # Home (uses Hero, Highlights, Impact, Facilities, Achievements, Gallery, Footer)
│   ├── about/
│   │   ├── page.tsx                       # About Us
│   │   └── green-campus/page.tsx
│   ├── administration/
│   │   ├── principal/page.tsx
│   │   ├── registrar/page.tsx
│   │   ├── accounts-officer/page.tsx
│   │   ├── hods/page.tsx
│   │   ├── hostel-super/page.tsx
│   │   └── caretaker/page.tsx
│   ├── departments/
│   │   ├── page.tsx                       # Department grid
│   │   └── [slug]/page.tsx                # cse, it, ece, ee, me, mca, mtech
│   ├── admission/
│   │   ├── ug-btech/page.tsx
│   │   ├── pg-mtech/page.tsx
│   │   └── pg-mca/page.tsx
│   ├── iic/
│   │   ├── page.tsx
│   │   ├── national-startup-policy/page.tsx
│   │   ├── institute-innovation-council/page.tsx
│   │   ├── e-cell/page.tsx
│   │   └── iipc/page.tsx
│   ├── research/page.tsx
│   ├── training-and-placement/
│   │   ├── page.tsx                       # TPO's Desk
│   │   ├── statistics/page.tsx            # Placement analytics dashboard
│   │   └── notices/page.tsx
│   ├── student-strength/page.tsx          # Enrollment & gender ratio dashboard
│   ├── iqac/page.tsx
│   ├── naac/page.tsx
│   ├── rti/page.tsx
│   ├── nirf/page.tsx
│   ├── contact/page.tsx
│   ├── gallery/page.tsx
│   ├── downloads/page.tsx
│   ├── notices/[id]/page.tsx
│   └── news/[slug]/page.tsx
├── admin/                                 # Auth-gated via NextAuth session + admin_allowlist
│   ├── layout.tsx
│   ├── page.tsx                           # Dashboard metrics & active notices
│   ├── access-denied/page.tsx
│   ├── notices/page.tsx
│   ├── notices/new/page.tsx
│   ├── news/page.tsx
│   ├── events/page.tsx
│   ├── downloads/page.tsx
│   ├── gallery/page.tsx
│   ├── staff/page.tsx
│   └── placements/page.tsx                # CSV upload UI (Placements & Enrollment)
└── api/
    └── v1/
        ├── auth/[...nextauth]/route.ts
        ├── auth/status/route.ts
        ├── admin/dashboard/route.ts
        ├── admin/audit-log/route.ts
        ├── admin/allowlist/route.ts
        ├── admin/allowlist/[id]/route.ts
        ├── notices/route.ts
        ├── notices/[id]/route.ts
        ├── notices/search/route.ts
        ├── news/route.ts
        ├── news/[slug]/route.ts
        ├── events/route.ts
        ├── events/[id]/route.ts
        ├── downloads/route.ts
        ├── downloads/[id]/route.ts
        ├── gallery/route.ts
        ├── gallery/[id]/route.ts
        ├── admissions/[program]/route.ts
        ├── placements/stats/route.ts
        ├── placements/departments/route.ts
        ├── placements/departments/upload/route.ts
        ├── placements/recruiters/route.ts
        ├── placements/recruiters/[id]/route.ts
        ├── placements/recruiters/upload/route.ts
        ├── enrollment/stats/route.ts
        ├── enrollment/departments/route.ts
        ├── enrollment/departments/upload/route.ts
        ├── staff/route.ts
        ├── staff/[id]/route.ts
        ├── contact/route.ts
        ├── storage/signed-url/route.ts
        └── health/route.ts
```

---

## 4. Public Page Endpoint Wiring

| Page | Components | API Endpoints Called | Strategy / Cache |
| --- | --- | --- | --- |
| **Home (`/`)** | `<Header>`, `<Hero>`, `<Highlights>`, `<Impact>`, `<Facilities>`, `<Achievements>`, `<Gallery>`, `<Footer>` | `/api/v1/notices?limit=6`<br/>`/api/v1/news?limit=5`<br/>`/api/v1/events?upcoming=true` | ISR 300s |
| **About Us (`/about`, `/about/green-campus`)** | Static narrative | None (Local MDX) | Static |
| **Administration (`/administration/*`)** | `<StaffProfileCard>` list | `/api/v1/staff?role=<role>` | ISR 300s |
| **Departments (`/departments`)** | `<DepartmentGrid>` | None (Local `content/departments.ts`) | Static |
| **Department Detail (`/departments/[slug]`)** | Faculty directory, Overview | `/api/v1/staff?department=[slug]&role=faculty` | ISR 300s |
| **Admission (`/admission/*`)** | Seat matrix, dates | `/api/v1/admissions/[program]` | ISR 300s |
| **IIC (`/iic/*`)** | Narrative, Documents | `/api/v1/downloads?category=iic` | ISR 300s |
| **Research (`/research`)** | Narrative, Faculty papers | None (Faculty papers attached to staff profile) | Static |
| **Placement Statistics (`/training-and-placement/statistics`)** | Trend chart, dept breakdown, recruiter logos | `/api/v1/placements/stats?year=`<br/>`/api/v1/placements/departments?year=`<br/>`/api/v1/placements/recruiters?year=` | tag: `placements` |
| **Student Strength (`/student-strength`)** | Enrollment trends, dept breakdown, gender ratio | `/api/v1/enrollment/stats?year=`<br/>`/api/v1/enrollment/departments?year=` | tag: `enrollment` |
| **IQAC / NAAC / RTI (`/iqac`, `/naac`, `/rti`)** | Narrative, Document lists | `/api/v1/downloads?category=iqac\|naac\|notices` | ISR 300s |
| **NIRF (`/nirf`)** | Yearly NIRF reports | `/api/v1/downloads?category=nirf` | ISR 300s |
| **Contact (`/contact`)** | Address, map, `<ContactForm>` | `POST /api/v1/contact` (rate-limited) | Dynamic |
| **Gallery (`/gallery`)** | Photo masonry grid | `/api/v1/gallery?album=` | ISR 300s |
| **Downloads (`/downloads`)** | Categorized files | `/api/v1/downloads?category=` | ISR 300s |

---

## 5. Admin Dashboard Pages (`/admin/*`)

| Page | Functionality | Endpoints Called |
| --- | --- | --- |
| **`/admin`** | Metrics & recent activity feed | `GET /api/v1/admin/dashboard` |
| **`/admin/notices`** | Manage notice board attachments | `GET`, `POST`, `PATCH`, `DELETE` `/api/v1/notices` + `/api/v1/storage/signed-url` |
| **`/admin/news`** | Publish & edit news items | `GET`, `POST`, `PATCH`, `DELETE` `/api/v1/news` |
| **`/admin/events`** | Manage campus events | `GET`, `POST`, `PATCH`, `DELETE` `/api/v1/events` |
| **`/admin/downloads`** | Document management | `GET`, `POST`, `DELETE` `/api/v1/downloads` + `/api/v1/storage/signed-url` |
| **`/admin/gallery`** | Album photo uploads | `GET`, `POST`, `DELETE` `/api/v1/gallery` + `/api/v1/storage/signed-url` |
| **`/admin/staff`** | Faculty & admin profile manager | `GET`, `POST`, `PATCH`, `DELETE` `/api/v1/staff` + `/api/v1/storage/signed-url` |
| **`/admin/placements`** | CSV uploads (Placements & Enrollment) | `POST /api/v1/placements/departments/upload`<br/>`POST /api/v1/placements/recruiters/upload`<br/>`PATCH /api/v1/placements/recruiters/[id]`<br/>`POST /api/v1/enrollment/departments/upload`<br/>`PATCH /api/v1/admissions/[program]` |

---

## 6. Shared Components

| Component | Target Location |
| --- | --- |
| `<Header>` / `<Navbar>` | Global layout |
| `<Hero>` / `<HeroCarousel>` | Home |
| `<Highlights>` | Home |
| `<Impact>` | Home |
| `<Facilities>` | Home |
| `<Achievements>` | Home |
| `<Gallery>` | Home, Gallery page |
| `<Footer>` | Global layout |
| `<NoticeBoard>` | Home, Placement Notices |
| `<DownloadsTable>` | Downloads, IQAC, NAAC, NIRF, RTI, IIC |
| `<StaffProfileCard>` | Administration, Department faculty directory |
| `<PlacementTrendChart>`, `<RecruiterPieChart>` | Placement Statistics |
| `<EnrollmentTrendChart>`, `<GenderRatioChart>` | Student Strength |
| `<CsvUploadDropzone>` | Admin Placements & Enrollment |
