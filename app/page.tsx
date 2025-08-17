import Link from "next/link";

export default function Landing() {
  return (
    <main className="space-y-8">
      <header className="py-10 text-center">
        <h1 className="text-4xl font-bold">NeighborHub</h1>
        <p className="mt-2 text-gray-600">Post chores. Get help. Keep it local.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/login" className="rounded-xl px-5 py-3 bg-black text-white">Get Started</Link>
          <Link href="/dashboard" className="rounded-xl px-5 py-3 border">Live Demo</Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Post jobs fast","Create a job with title, price, time, and photos."],
          ["Trust & reviews","Profiles, ratings, verification hooks."],
          ["Built-in payments","Stripe Connect ready (optional)."],
        ].map(([t,d]) => (
          <div key={t} className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold">{t}</h3>
            <p className="text-sm text-gray-600">{d}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
