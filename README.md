# NeighborHub — Launch-Minimum Starter

A minimal **Next.js 14 + Supabase + Stripe** template that implements the core flows:
- Email magic-link auth (Supabase)
- Profiles, communities (HOA-ready), jobs, offers, messages, reviews
- Dashboard list + Create Job
- Stripe webhook stub (ready for Connect later)
- Tailwind styling

> Goal: **least work to launch** a private beta in one afternoon.

## 1) One-time setup (Supabase + Stripe)

1. Create a Supabase project → Settings → API: copy **URL** and **anon key**.
2. SQL Editor → run `supabase/schema.sql` from this repo.
3. Auth → Providers → Email: enable "Magic Link".
4. (Optional now) Create a Stripe account → copy **Secret key** and **Publishable key**.

## 2) Local dev

```bash
pnpm i  # or npm i
cp .env.example .env
# Fill SUPABASE_URL & SUPABASE_ANON_KEY; Stripe keys optional for now
pnpm dev
```

Open http://localhost:3000

## 3) Deploy (Vercel)

1. Push this folder to GitHub.
2. Import to Vercel → set env vars from `.env`.
3. Add a webhook in Stripe (if using): `https://your-domain.com/api/stripe/webhook`.

## 4) What’s included

- `/app/login`: email OTP login
- `/app/dashboard`: jobs feed (from `jobs_view`)
- `/app/jobs/new`: create job
- Supabase RLS for basic safety
- Minimal, clean UI with Tailwind

## 5) What to add next (checklist)

- [ ] Profiles page: edit name/phone/address + community join
- [ ] Offers: allow providers to propose amount / accept
- [ ] Messaging UI per job
- [ ] Reviews UI and moderation actions
- [ ] Admin: community approvals, suspensions, analytics
- [ ] File uploads (Supabase Storage) for before/after photos
- [ ] Optional payments: Stripe Connect accounts for providers
- [ ] Push notifications (OneSignal or FCM) + email

This starter is intentionally small so you can extend quickly.
