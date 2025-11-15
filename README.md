# Nethunt URL Extractor

A Next.js web app with email/password auth (Gmail-only), 1-day free trial, premium via Flutterwave, and an admin panel to manage users.

- Framework: Next.js (App Router) + TypeScript
- Storage: JSON file (no native dependencies)
- Auth: JWT cookies (httpOnly)
- Payment: External link to Flutterwave, unlock on redirect to /payment/success

## Quick start

1. Install dependencies

```bash
npm i
```

2. Run dev

```bash
npm run dev
```

3. Build

```bash
npm run build && npm start
```

No environment variables are required. Data is stored in `data/db.json`. If the filesystem is read-only, the app will still run, but data resets on restart.

## Admin

- URL: /admin/login
- Username: `nethunter`
- Password: `cbtpratice@nethunter`

## Payment

- Upgrade link goes to your Flutterwave page.
- Set Flutterwave redirect URL to: `/payment/success`
- On successful redirect while logged in, the app unlocks premium for 1 month.
