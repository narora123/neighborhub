import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
export const supabaseBrowser = () => createPagesBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
