import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import Link from "next/link";
import JobCard from "@/components/JobCard";

export default async function Dashboard() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: `Bearer ${cookies().get("sb-access-token")?.value || ""}` } }
  });

  const { data: jobs } = await supabase.from("jobs_view").select("*").order("created_at", { ascending: false }).limit(25);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Nearby Jobs</h2>
        <Link href="/jobs/new" className="rounded-xl bg-black px-4 py-2 text-white">Post a Job</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {jobs?.map((j:any) => <JobCard key={j.id} job={j} />) || <p>No jobs yet.</p>}
      </div>
    </div>
  );
}
