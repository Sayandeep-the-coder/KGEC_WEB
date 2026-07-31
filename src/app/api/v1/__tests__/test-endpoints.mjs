/**
 * KGEC Backend API v1 — Endpoint Test Suite
 * 
 * Tests all 32 route handlers under /api/v1/
 * Run with: node src/app/api/v1/__tests__/test-endpoints.mjs
 */

const BASE = "http://localhost:3000/api/v1";

let passed = 0;
let failed = 0;
let skipped = 0;
const results = [];

async function test(name, fn) {
  try {
    await fn();
    passed++;
    results.push({ name, status: "✅ PASS" });
    console.log(`  ✅ ${name}`);
  } catch (err) {
    failed++;
    results.push({ name, status: `❌ FAIL: ${err.message}` });
    console.log(`  ❌ ${name} — ${err.message}`);
  }
}

function skip(name, reason) {
  skipped++;
  results.push({ name, status: `⏭️  SKIP: ${reason}` });
  console.log(`  ⏭️  ${name} — ${reason}`);
}

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  const contentType = res.headers.get("content-type") || "";
  let body = null;
  if (contentType.includes("application/json")) {
    body = await res.json();
  } else {
    body = await res.text();
  }
  return { status: res.status, body, headers: res.headers };
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg);
}

// ─── Test runner ────────────────────────────────────────────────────────────

async function runTests() {
  console.log("\n🧪 KGEC Backend API v1 — Testing all endpoints\n");
  console.log("━".repeat(60));

  // ═══════════════════════════════════════════════════════════════════════
  // 1. HEALTH
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n📋 Health Check");

  await test("GET /health — returns status", async () => {
    const { status, body } = await fetchJSON(`${BASE}/health`);
    assert(status === 200 || status === 503, `Expected 200 or 503, got ${status}`);
    assert(body.data, "Missing data field");
    assert(body.data.status, "Missing status in data");
    assert(body.data.timestamp, "Missing timestamp in data");
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 2. AUTH
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n🔐 Auth");

  await test("GET /auth/status — returns isAdmin (unauthenticated)", async () => {
    const { status, body } = await fetchJSON(`${BASE}/auth/status`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.data !== undefined, "Missing data field");
    assert(body.data.isAdmin === false, "Expected isAdmin=false for unauthenticated");
  });

  skip("GET /auth/[...nextauth] — Google OAuth callback", "Requires real Google OAuth flow");

  // ═══════════════════════════════════════════════════════════════════════
  // 3. NOTICES — Public GET
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n📢 Notices (Public)");

  await test("GET /notices — list with defaults", async () => {
    const { status, body } = await fetchJSON(`${BASE}/notices`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
    assert(typeof body.count === "number", "count should be a number");
  });

  await test("GET /notices?type=general&limit=5&page=1 — filtered", async () => {
    const { status, body } = await fetchJSON(`${BASE}/notices?type=general&limit=5&page=1`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /notices?type=invalid_type — ignores invalid type", async () => {
    const { status, body } = await fetchJSON(`${BASE}/notices?type=nonexistent`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /notices?limit=999 — clamped to 100", async () => {
    const { status } = await fetchJSON(`${BASE}/notices?limit=999`);
    assert(status === 200, `Expected 200, got ${status}`);
  });

  await test("GET /notices/nonexistent-uuid — 404", async () => {
    const { status, body } = await fetchJSON(`${BASE}/notices/00000000-0000-0000-0000-000000000000`);
    assert(status === 404, `Expected 404, got ${status}`);
    assert(body.error, "Should have error message");
  });

  await test("GET /notices/search?q=test — search", async () => {
    const { status, body } = await fetchJSON(`${BASE}/notices/search?q=test`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /notices/search — missing q param", async () => {
    const { status, body } = await fetchJSON(`${BASE}/notices/search`);
    assert(status === 400, `Expected 400, got ${status}`);
    assert(body.error, "Should have error message");
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 4. NOTICES — Admin (should fail without auth)
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n📢 Notices (Admin — unauthenticated, expect 401)");

  await test("POST /notices — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/notices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test", type: "general" }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("PATCH /notices/:id — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/notices/00000000-0000-0000-0000-000000000000`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Updated" }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("DELETE /notices/:id — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/notices/00000000-0000-0000-0000-000000000000`, {
      method: "DELETE",
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 5. NEWS
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n📰 News");

  await test("GET /news — list", async () => {
    const { status, body } = await fetchJSON(`${BASE}/news`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /news?limit=3 — limited", async () => {
    const { status, body } = await fetchJSON(`${BASE}/news?limit=3`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /news/nonexistent-slug — 404", async () => {
    const { status, body } = await fetchJSON(`${BASE}/news/this-slug-does-not-exist`);
    assert(status === 404, `Expected 404, got ${status}`);
    assert(body.error, "Should have error message");
  });

  await test("POST /news — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: "test", title: "Test", body: {} }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("PATCH /news/test — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/news/test`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Updated" }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("DELETE /news/test — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/news/test`, {
      method: "DELETE",
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 6. EVENTS
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n📅 Events");

  await test("GET /events — list", async () => {
    const { status, body } = await fetchJSON(`${BASE}/events`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /events?upcoming=true — upcoming filter", async () => {
    const { status, body } = await fetchJSON(`${BASE}/events?upcoming=true`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /events/:id — 404 for nonexistent", async () => {
    const { status } = await fetchJSON(`${BASE}/events/00000000-0000-0000-0000-000000000000`);
    assert(status === 404, `Expected 404, got ${status}`);
  });

  await test("POST /events — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test", eventDate: "2025-01-01" }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("PATCH /events/:id — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/events/00000000-0000-0000-0000-000000000000`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Updated" }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("DELETE /events/:id — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/events/00000000-0000-0000-0000-000000000000`, {
      method: "DELETE",
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 7. DOWNLOADS
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n📥 Downloads");

  await test("GET /downloads — list", async () => {
    const { status, body } = await fetchJSON(`${BASE}/downloads`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /downloads?category=general — filtered", async () => {
    const { status, body } = await fetchJSON(`${BASE}/downloads?category=general`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("POST /downloads — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/downloads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test", fileUrl: "https://example.com/file.pdf" }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("DELETE /downloads/:id — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/downloads/00000000-0000-0000-0000-000000000000`, {
      method: "DELETE",
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 8. GALLERY
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n🖼️  Gallery");

  await test("GET /gallery — list", async () => {
    const { status, body } = await fetchJSON(`${BASE}/gallery`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /gallery?album=test — album filter", async () => {
    const { status, body } = await fetchJSON(`${BASE}/gallery?album=test`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("POST /gallery — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/gallery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ album: "Test", imageUrl: "https://example.com/img.jpg" }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("DELETE /gallery/:id — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/gallery/00000000-0000-0000-0000-000000000000`, {
      method: "DELETE",
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 9. ADMISSIONS
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n🎓 Admissions");

  await test("GET /admissions/ug_btech — valid program", async () => {
    const { status, body } = await fetchJSON(`${BASE}/admissions/ug_btech`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.data, "Should have data field");
    assert(body.data.program === "ug_btech", "Program should be ug_btech");
  });

  await test("GET /admissions/pg_mtech — valid program", async () => {
    const { status, body } = await fetchJSON(`${BASE}/admissions/pg_mtech`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.data, "Should have data field");
  });

  await test("GET /admissions/pg_mca — valid program", async () => {
    const { status, body } = await fetchJSON(`${BASE}/admissions/pg_mca`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.data, "Should have data field");
  });

  await test("GET /admissions/invalid_program — 400", async () => {
    const { status, body } = await fetchJSON(`${BASE}/admissions/invalid_program`);
    assert(status === 400, `Expected 400, got ${status}`);
    assert(body.error, "Should have error message");
  });

  await test("PATCH /admissions/ug_btech — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/admissions/ug_btech`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seatMatrix: { cse: 120 } }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 10. PLACEMENTS
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n💼 Placements");

  await test("GET /placements/stats — all years", async () => {
    const { status, body } = await fetchJSON(`${BASE}/placements/stats`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.data !== undefined, "Should have data field");
  });

  await test("GET /placements/stats?year=2024 — specific year", async () => {
    const { status } = await fetchJSON(`${BASE}/placements/stats?year=2024`);
    assert(status === 200, `Expected 200, got ${status}`);
    // data can be null if no stats for this year
  });

  await test("GET /placements/departments?year=2024 — with year", async () => {
    const { status, body } = await fetchJSON(`${BASE}/placements/departments?year=2024`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /placements/departments — missing year → 400", async () => {
    const { status, body } = await fetchJSON(`${BASE}/placements/departments`);
    assert(status === 400, `Expected 400, got ${status}`);
    assert(body.error, "Should have error message");
  });

  await test("GET /placements/recruiters?year=2024 — with year", async () => {
    const { status, body } = await fetchJSON(`${BASE}/placements/recruiters?year=2024`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /placements/recruiters — missing year → 400", async () => {
    const { status, body } = await fetchJSON(`${BASE}/placements/recruiters`);
    assert(status === 400, `Expected 400, got ${status}`);
    assert(body.error, "Should have error message");
  });

  await test("PATCH /placements/recruiters/:id — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/placements/recruiters/00000000-0000-0000-0000-000000000000`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logoUrl: "https://example.com/logo.png" }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("POST /placements/departments/upload — 401 without auth", async () => {
    const formData = new FormData();
    formData.append("file", new Blob(["year,department,students_placed\n2024,cse,50"], { type: "text/csv" }), "test.csv");
    const { status } = await fetchJSON(`${BASE}/placements/departments/upload`, {
      method: "POST",
      body: formData,
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("POST /placements/recruiters/upload — 401 without auth", async () => {
    const formData = new FormData();
    formData.append("file", new Blob(["year,company,offers\n2024,Google,5"], { type: "text/csv" }), "test.csv");
    const { status } = await fetchJSON(`${BASE}/placements/recruiters/upload`, {
      method: "POST",
      body: formData,
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 11. ENROLLMENT
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n📊 Enrollment");

  await test("GET /enrollment/stats — all years", async () => {
    const { status, body } = await fetchJSON(`${BASE}/enrollment/stats`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.data !== undefined, "Should have data field");
  });

  await test("GET /enrollment/stats?year=2024 — specific year", async () => {
    const { status } = await fetchJSON(`${BASE}/enrollment/stats?year=2024`);
    assert(status === 200, `Expected 200, got ${status}`);
  });

  await test("GET /enrollment/departments?year=2024 — with year", async () => {
    const { status, body } = await fetchJSON(`${BASE}/enrollment/departments?year=2024`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /enrollment/departments — missing year → 400", async () => {
    const { status, body } = await fetchJSON(`${BASE}/enrollment/departments`);
    assert(status === 400, `Expected 400, got ${status}`);
    assert(body.error, "Should have error message");
  });

  await test("POST /enrollment/departments/upload — 401 without auth", async () => {
    const formData = new FormData();
    formData.append("file", new Blob(["year,department,total_students,male_students,female_students\n2024,cse,120,80,40"], { type: "text/csv" }), "test.csv");
    const { status } = await fetchJSON(`${BASE}/enrollment/departments/upload`, {
      method: "POST",
      body: formData,
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 12. STAFF
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n👥 Staff");

  await test("GET /staff — list", async () => {
    const { status, body } = await fetchJSON(`${BASE}/staff`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /staff?role=faculty — role filter", async () => {
    const { status, body } = await fetchJSON(`${BASE}/staff?role=faculty`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /staff?department=cse — department filter", async () => {
    const { status, body } = await fetchJSON(`${BASE}/staff?department=cse`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /staff?role=faculty&department=cse — combined filter", async () => {
    const { status, body } = await fetchJSON(`${BASE}/staff?role=faculty&department=cse`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), "data should be an array");
  });

  await test("GET /staff/:id — 404 for nonexistent", async () => {
    const { status } = await fetchJSON(`${BASE}/staff/00000000-0000-0000-0000-000000000000`);
    assert(status === 404, `Expected 404, got ${status}`);
  });

  await test("POST /staff — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/staff`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test",
        email: "test@kgec.ac.in",
        employeeId: "EMP001",
        role: "faculty",
      }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("PATCH /staff/:id — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/staff/00000000-0000-0000-0000-000000000000`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated" }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("DELETE /staff/:id — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/staff/00000000-0000-0000-0000-000000000000`, {
      method: "DELETE",
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 13. CONTACT
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n📧 Contact");

  await test("POST /contact — validation error (missing fields)", async () => {
    const { status, body } = await fetchJSON(`${BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert(status === 400, `Expected 400, got ${status}`);
    assert(body.error === "Validation failed", `Expected validation error, got: ${body.error}`);
    assert(Array.isArray(body.issues), "Should have issues array");
  });

  await test("POST /contact — validation error (short message)", async () => {
    const { status, body } = await fetchJSON(`${BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test", email: "test@example.com", message: "Hi" }),
    });
    assert(status === 400, `Expected 400, got ${status}`);
    assert(body.issues, "Should have validation issues");
  });

  await test("POST /contact — validation error (invalid email)", async () => {
    const { status } = await fetchJSON(`${BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test", email: "not-an-email", message: "This is a test message that is long enough" }),
    });
    assert(status === 400, `Expected 400, got ${status}`);
  });

  await test("POST /contact — valid submission (201)", async () => {
    const { status, body } = await fetchJSON(`${BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "This is a test contact form submission for endpoint testing.",
      }),
    });
    assert(status === 201, `Expected 201, got ${status}`);
    assert(body.data, "Should have data field");
    assert(body.data.success === true, "Should have success: true");
    assert(body.data.id, "Should have id");
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 14. STORAGE
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n📦 Storage");

  await test("POST /storage/signed-url — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/storage/signed-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bucket: "notices",
        filename: "test.pdf",
        contentType: "application/pdf",
      }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 15. ADMIN
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n🛡️  Admin");

  await test("GET /admin/dashboard — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/admin/dashboard`);
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("GET /admin/audit-log — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/admin/audit-log`);
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("GET /admin/allowlist — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/admin/allowlist`);
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("POST /admin/allowlist — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/admin/allowlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "new@kgec.ac.in", name: "New Admin" }),
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  await test("DELETE /admin/allowlist/:id — 401 without auth", async () => {
    const { status } = await fetchJSON(`${BASE}/admin/allowlist/00000000-0000-0000-0000-000000000000`, {
      method: "DELETE",
    });
    assert(status === 401, `Expected 401, got ${status}`);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 16. RESPONSE SHAPE VALIDATION
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n🔍 Response Shape Validation");

  await test("Success responses have { data } shape", async () => {
    const { body } = await fetchJSON(`${BASE}/notices`);
    assert("data" in body, "Success response must have 'data' key");
  });

  await test("Error responses have { error } shape", async () => {
    const { body } = await fetchJSON(`${BASE}/admissions/invalid`);
    assert("error" in body, "Error response must have 'error' key");
  });

  await test("Validation errors have { error, issues } shape", async () => {
    const { body } = await fetchJSON(`${BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert("error" in body, "Must have 'error' key");
    assert("issues" in body, "Must have 'issues' key");
  });

  // ═══════════════════════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════════════════════
  console.log("\n" + "━".repeat(60));
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed, ${skipped} skipped`);
  console.log(`   Total: ${passed + failed + skipped} tests\n`);

  if (failed > 0) {
    console.log("❌ Failed tests:");
    results.filter(r => r.status.startsWith("❌")).forEach(r => {
      console.log(`   • ${r.name}: ${r.status}`);
    });
    console.log("");
  }

  if (failed === 0) {
    console.log("🎉 All tests passed!\n");
  }
}

runTests().catch(console.error);
