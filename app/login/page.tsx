"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function Login() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Sign in / Sign up</h2>
      <p className="text-sm text-gray-600">Enter your email to receive a magic link.</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + "/dashboard" } });
          if (!error) setOtpSent(true);
          else alert(error.message);
        }}
        className="space-y-3"
      >
        <input
          type="email"
          required
          placeholder="you@email.com"
          className="w-full rounded-xl border px-3 py-2"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button className="w-full rounded-xl bg-black px-4 py-2 font-medium text-white">Send magic link</button>
      </form>
      {otpSent && <p className="text-green-700 text-sm">Magic link sent! Check your email.</p>}
    </div>
  );
}
