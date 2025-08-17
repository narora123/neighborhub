"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewJob() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", price_cents: 2000, category: "General", when_text: "", location_text: "" });
  return (
    <div className="mx-auto max-w-xl space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Create Job</h2>
      {["title","description","when_text","location_text"].map((k)=>(
        <input key={k} placeholder={k.replace("_"," ")} className="w-full rounded-xl border px-3 py-2"
          value={(form as any)[k]} onChange={(e)=>setForm({ ...form, [k]: e.target.value })}/>
      ))}
      <div className="flex gap-2">
        <input type="number" className="w-1/2 rounded-xl border px-3 py-2" value={form.price_cents} onChange={(e)=>setForm({ ...form, price_cents: Number(e.target.value) })} />
        <select className="w-1/2 rounded-xl border px-3 py-2" value={form.category} onChange={(e)=>setForm({ ...form, category: e.target.value })}>
          {["General","Lawn Care","Cleaning","Pet Care","Snow Removal","Tutoring"].map(c=><option key={c}>{c}</option>)}
        </select>
      </div>
      <button
        className="w-full rounded-xl bg-black px-4 py-2 text-white"
        onClick={async ()=>{
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return alert("Please sign in.");
          const { error } = await supabase.from("jobs").insert({ 
            title: form.title, description: form.description, price_cents: form.price_cents, category: form.category,
            when_text: form.when_text, location_text: form.location_text
          });
          if (error) alert(error.message); else router.push("/dashboard");
        }}
      >Publish</button>
    </div>
  );
}
