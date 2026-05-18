# 🏛️ Anatomical Archive

**A full-stack portfolio & invoice management platform for a freelance medical illustrator.**

Built with Next.js 16, TypeScript, Tailwind CSS v4, PostgreSQL, Prisma, Stripe, Resend, and NextAuth v5.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4)
![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748)
![Stripe](https://img.shields.io/badge/Stripe-22.0-635bFF)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1)

**Live site:** [medical-illustration.vercel.app](https://medical-illustration.vercel.app/)

---

## About

Anatomical Archive serves two purposes:

**Public-facing portfolio site** — A minimalist, museum-aesthetic website showcasing medical and anatomical illustration work, with a filterable gallery, about page, and contact form.

**Private admin dashboard** — A password-protected control panel for managing invoices (create, send via email, track Stripe payment status) and reviewing client inquiries.

---

## Features

### Public Site
- **Landing page** — Hero header, selected works gallery, expertise/services section
- **Portfolio gallery** — Filterable by category (Anatomy, Surgical, Pathology, Education, Research) with animated sliding filter bar
- **About page** — Biography, methodology principles, testimonial cards
- **Contact form** — Project type selector, auto-reply email via Resend, database persistence
- **Page transitions** — Smooth horizontal slide animations with Framer Motion

### Admin Dashboard
- **Overview** — Analytics stat cards: total invoices, sent (pending payment), paid, new inquiries, total revenue
- **Invoice management** — List, create, view, send, and mark invoices as paid
- **Stripe payment flow** — Generates Stripe Product + Price + Payment Link on send; webhook listener updates status on payment
- **Real-time payment polling** — Auto-polls invoice status every 3 seconds after sending (up to 30 seconds)
- **Inquiry management** — Table list with new/read/replied status tracking

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 + shadcn/ui (Base UI primitives) |
| **Database** | PostgreSQL (Neon serverless) |
| **ORM** | Prisma 6 |
| **Auth** | NextAuth v5 (Credentials provider, JWT) |
| **Payments** | Stripe SDK 22 (Products, Prices, Payment Links, Webhooks) |
| **Email** | Resend |
| **Animations** | Framer Motion |
| **Validation** | Zod |
| **Hosting** | Vercel |

---

## Architecture Highlights

- **App Router route groups** — `(main)` for public pages, separate routes for dashboard with auth guard
- **Server/Client component split** — Page shells as server components, interactive islands (buttons, polling, sidebar) as client components
- **Prisma singleton** — Global instance prevents multiple database clients in development
- **Integer amounts** — All monetary values stored as pence — standard financial best practice
- **Stripe Payment Links** — Simplifies payment collection without building a custom checkout UI
- **Webhook-driven state** — Payment status updated asynchronously via Stripe webhook with signature verification
- **Single-admin auth** — Credentials-based login with environment variable configuration

---

## Database Schema

```
User (id, name, email, emailVerified, image, createdAt, updatedAt)
  └─ Account (id, userId, provider, providerAccountId, ...)
  └─ Session (id, sessionToken, userId, expires)
  └─ VerificationToken (identifier, token, expires)

Invoice (id, number, clientName, clientEmail, clientAddress, description,
         amount, currency, status, stripePaymentLinkId, stripePaymentLinkUrl,
         sentAt, paidAt, createdAt, updatedAt)

Inquiry (id, name, email, projectType, message, status, createdAt)
```

---

## API Routes

| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/[...nextauth]` | — | NextAuth auth handlers |
| POST | `/api/contact` | — | Submit contact form → save inquiry + send auto-reply |
| GET | `/api/invoices` | Session | List all invoices |
| POST | `/api/invoices` | Session | Create new invoice |
| GET | `/api/invoices/[id]` | Session | Get single invoice |
| PATCH | `/api/invoices/[id]` | Session | Update invoice (mark paid, deactivate Stripe link) |
| POST | `/api/invoices/[id]/send` | Session | Create Stripe product/price/link + email invoice |
| POST | `/api/stripe/webhook` | Signature | Handle `checkout.session.completed` |

---

## Payment Flow

1. Admin creates invoice (status: `draft`)
2. Admin clicks "Send Invoice" → server creates Stripe Product, Price, and Payment Link → emails invoice link → status becomes `sent`
3. Client pays via Stripe hosted payment page
4. Stripe sends `checkout.session.completed` webhook → server marks invoice `paid` and deactivates payment link
5. Client redirected to `/payment-confirmed` → success page shows invoice number
6. Dashboard polls and auto-refreshes when payment is confirmed

---

## Getting Started

**Prerequisites:** Node.js 20+, pnpm, PostgreSQL instance, Stripe account, Resend account

```bash
# Clone and install
git clone <repo>
cd medical-i
pnpm install

# Set up environment variables (see .env.example)
cp .env.example .env.local

# Run database migrations
npx prisma db push

# Start development server
pnpm dev
```

**Environment Variables:**

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth encryption key |
| `AUTH_URL` | Application base URL |
| `STRIPE_SECRET_KEY` | Stripe secret key (test mode) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM` | Sender email address |

---

## Project Structure

```
src/
├── app/
│   ├── (main)/              # Public site (home, about, portfolio, contact)
│   ├── dashboard/            # Admin area (invoices, inquiries, overview)
│   ├── login/                # Auth page
│   ├── payment-confirmed/    # Stripe redirect thank-you page
│   └── api/                  # API routes (auth, contact, invoices, stripe)
├── components/               # UI components (navbar, cards, filters, sidebar)
├── lib/                      # Utilities, auth config, Prisma/Stripe/Resend clients
├── data/                     # Portfolio data
└── types/                    # TypeScript type definitions
```

---

## What This Project Demonstrates

- **Full-stack development** — Database design, API routes, server-rendered pages, client-side interactivity
- **Payment integration** — Stripe product/price/payment-link creation, webhook handling
- **Authentication & authorization** — NextAuth v5 with credentials provider, route protection (middleware + server-side checks)
- **Email automation** — Transactional emails via Resend (invoice sending, contact auto-reply)
- **Real-time features** — Client-side polling for payment status updates
- **Modern CSS** — Tailwind CSS v4, dark theme, responsive design, animations
- **TypeScript** — Full type safety across the entire codebase
