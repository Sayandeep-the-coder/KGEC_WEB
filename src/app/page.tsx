export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          KGEC Website API & Service Layer
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Next.js Route Handlers powered by Drizzle ORM, Supabase Postgres & Auth, Cloudflare R2, and Upstash Redis.
        </p>
      </main>
    </div>
  );
}
