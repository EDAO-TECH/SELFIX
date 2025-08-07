# SELFIX — Cyber Healing & Recovery Platform

SELFIX is an advanced cybersecurity platform that heals, restores, and protects user systems when antivirus tools fail. Built for modern digital environments, SELFIX supports secure onboarding, AI healing, and tiered licensing through Stripe + Supabase integration.

---

## ⚙️ Tech Stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Supabase (DB + Auth)
- **Licensing:** Stripe Checkout (One-time & Subscription)
- **Deployment:** Netlify + GitHub (CI/CD)
- **Routing:** `react-router-dom`
- **Authentication:** Magic Link (OTP email) via Supabase

---

## 💼 License Tiers

| Tier       | Price      | Features                            |
|------------|------------|-------------------------------------|
| 🟩 Home     | Free / $5  | Basic scan, log-only, VPN           |
| 🟦 Pro      | $12/month  | CLI tools, rollback, AI healing     |
| 🟨 Team     | $39/user   | Dashboard, AI chat, vault           |
| 🟥 Enterprise | Custom Quote | Full root access, Seeder, GPG seal |

---

## 🔐 Features

- Magic Link Login with Supabase
- Pricing Page (dynamically fetched from Supabase)
- Stripe Checkout Integration (redirect to `/success` or `/cancel`)
- Dashboard-Ready Architecture
- Admin-Ready Backend with healing logs, session data

---

## 🧪 Local Dev

```bash
npm install
npm run dev
Production Build
bash
Copy
Edit
npm run build
📡 Deployment (Netlify)
Ensure the following environment variables are set in your Netlify project:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

STRIPE_SECRET_KEY

Also include a _redirects file:

bash
Copy
Edit
/*    /index.html   200
🧾 Stripe Webhook (Optional)
You can later add a webhook in netlify/functions/webhook.js to auto-sync user subscription status.

📁 File Structure
mathematica
Copy
Edit
src/
  components/
    Navbar.jsx
    Pricing.jsx
    Login.jsx
  pages/
    Home.jsx
    Success.jsx
    Cancel.jsx
supabase/
  supabaseClient.js
netlify/
  functions/
    createCheckoutSession.js


© 2025 EDAO TECH — All Rights Reserved.

pgsql
Copy
Edit
