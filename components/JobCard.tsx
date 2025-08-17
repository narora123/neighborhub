export default function JobCard({ job }: { job: any }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <span className="rounded-full border px-2 py-1 text-xs">{job.category}</span>
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-gray-700">{job.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span>{(job.price_cents/100).toLocaleString(undefined,{style:'currency',currency:'USD'})}</span>
        <button className="rounded-xl border px-3 py-1">View</button>
      </div>
    </div>
  );
}
