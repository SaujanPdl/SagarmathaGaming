# Sagarmatha Gaming Backend

Modular Express + TypeScript MVP API for the Sagarmatha Gaming storefront.

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
2. Start PostgreSQL and create the `sagarmatha_gaming` database. Set the Supabase URL, service-role key, and private storage bucket for payment proofs.
3. Install and generate Prisma:

```bash
npm install
npm run db:generate
npx prisma migrate dev --name init
npm run db:seed
```

4. Start the API with `npm run dev`. It listens on `PORT` (default `5000`).

## API groups

- `GET /api/health`
- `/api/auth`: register, login, logout, current user
- `/api/products`: public catalog and admin product management
- `/api/orders`: guest order creation and authenticated order access
- `POST /api/orders/:orderNumber/payment`: payment proof submission
- `/api/admin`: order, payment verification, and delivery management
- `/api/player-ids`: authenticated saved player IDs

The frontend uses the API when `VITE_API_URL` is set, for example `VITE_API_URL=http://localhost:5000`. Only the API URL belongs in Vite environment variables; never put `JWT_SECRET` or `SUPABASE_SERVICE_ROLE_KEY` in the frontend.

## Storage

Create a private Supabase Storage bucket named `payment-proofs`, then configure `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_STORAGE_BUCKET`. The backend accepts only JPEG, PNG, WebP, and PDF proofs up to `PAYMENT_PROOF_MAX_BYTES` (5 MiB by default), checks file signatures, and stores only a private object path in PostgreSQL. Admin responses expose short-lived signed URLs.

## Deployment

Deploy the backend to Render or another Node host with `npm run build` and `npm start`. Set the host-provided `PORT`, PostgreSQL `DATABASE_URL`, a long random `JWT_SECRET`, the exact production `FRONTEND_URL`, and the Supabase storage variables. Configure the frontend build with `VITE_API_URL=https://your-api-domain.example`.