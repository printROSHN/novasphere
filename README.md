# NovaSphere Exim / ASMI Tech

An enterprise-grade International Trade Desk, Exim Management, and Commercial Showcase web application built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**.

---

## ⚡ Quick Deployment Guide: Vercel (100% Free)

Deploying this project to Vercel costs **$0.00** and takes less than 3 minutes.

### Option 1: Deploy via GitHub & Vercel Dashboard (Recommended)

1. **Initialize Git & Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Vercel deployment"
   git branch -M main
   # Create a repository on github.com, then run:
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Import into Vercel:**
   - Go to [vercel.com](https://vercel.com) and log in (or sign up for a free Hobby account).
   - Click **"Add New..."** → **"Project"**.
   - Select your GitHub repository.
   - Vercel automatically detects **Vite**:
     - **Framework Preset:** Vite
     - **Root Directory:** `./`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

3. **Configure Environment Variables (Optional if using your own Supabase project):**
   - In the **Environment Variables** section, add:
     - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
     - `VITE_SUPABASE_ANON_KEY` = `your-supabase-anon-key`
   *(If omitted, the app will fall back to the built-in instance or local storage).*

4. **Click Deploy:**
   - Your site will be live within ~60 seconds with a free `.vercel.app` URL and free SSL certificate!

---

### Option 2: Deploy using Vercel CLI

1. **Run the Vercel CLI command in your terminal:**
   ```bash
   npx vercel
   ```
2. Follow the prompts:
   - Log in / authenticate with your free Vercel account.
   - Set up and deploy: choose `Y`.
   - Which scope: choose your personal account.
   - Link to existing project: `N`.
   - Project name: `novasphere-exim` (or your choice).
   - In which directory is your code located: `./`.
   - Want to modify settings: `N`.
3. For production release:
   ```bash
   npx vercel --prod
   ```

---

## 🗄️ Setting Up Supabase (100% Free)

Supabase offers a generous **Free Tier** ($0/month):
- 500 MB PostgreSQL Database
- 1 GB File Storage
- 50,000 Monthly Active Users (Auth)
- 500,000 Edge Function Invocations

### Step-by-Step Setup:

1. **Create an Account:**
   - Go to [supabase.com](https://supabase.com) and sign up for free.
   - Click **"New Project"**, choose an organization, choose a strong database password, and select the region closest to your audience.

2. **Run Database Initialization:**
   - In your Supabase dashboard, click on **SQL Editor** from the left sidebar.
   - Open the file [`supabase/init_schema.sql`](supabase/init_schema.sql) in this repo.
   - Copy the entire SQL content and paste it into the Supabase SQL editor.
   - Click **"Run"**.
   - *This will automatically create:*
     - The `inquiries` table (for trade inquiries and RFQs) with open insert policies.
     - The `profiles` table (for admin authorization).
     - Automated user signup triggers.
     - Row Level Security (RLS) policies and role permissions.

3. **Copy Your API Credentials:**
   - In Supabase, go to **Project Settings** (gear icon) → **API**.
   - Copy:
     - **Project URL** (`https://<project-id>.supabase.co`)
     - **Project API Key (anon / public)** (`eyJhbGci...`)

4. **Link to Vercel:**
   - In your Vercel project dashboard, navigate to **Settings** → **Environment Variables**.
   - Add:
     - `VITE_SUPABASE_URL` = your copied Project URL
     - `VITE_SUPABASE_ANON_KEY` = your copied anon/public key
   - Trigger a redeploy (or push a commit) to apply.

> [!NOTE]
> **Free Tier Inactivity:** Supabase free-tier projects pause after 7 days of complete database inactivity. If paused, you can restore them instantly with 1 click in the Supabase dashboard. To keep it active, either regular user traffic or a simple cron will keep it warm.

---

## 💻 Local Development

1. **Clone & Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Local Environment (Optional):**
   ```bash
   cp .env.example .env
   ```
   Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if testing against your custom database.

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

4. **Build & Preview Locally:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📁 Repository Structure

```
├── api/                          # Vercel Serverless Functions
│   ├── hf/v1/chat/completions.js # Hugging Face router proxy
│   └── save-translation.js      # Translation handler
├── public/                       # Static assets, logos, and icons
├── src/
│   ├── assets/                  # Images, branding assets
│   ├── components/              # Modular UI components & Admin panel
│   ├── contexts/                # ContentContext (data state & localStorage)
│   ├── data/                    # Default content, products, services, company data
│   ├── hooks/                   # Custom React hooks (useAuth, useTranslation)
│   ├── integrations/supabase/   # Supabase client and generated types
│   ├── lib/                     # Utilities and inquiry service
│   ├── pages/                   # Public showcase & Admin desk pages
│   ├── App.jsx                  # Main router configuration
│   └── main.jsx                 # Application entry point
├── supabase/
│   ├── init_schema.sql          # 1-Click Master SQL setup script for free tier
│   └── migrations/              # Database migration history
├── .env.example                 # Sample environment variables
├── vercel.json                  # Vercel routing, caching, and serverless config
├── vite.config.js               # Vite build configuration
└── package.json                 # Project dependencies & scripts
```

---

## 🔒 Security & Performance Features

- **Row Level Security (RLS):** Inquiries can be submitted by visitors anonymously, but can only be viewed or modified by authenticated administrators.
- **Vercel Edge Caching:** Static assets are cached at the edge for 1 year with `immutable` cache headers for sub-second page loads.
- **Security Headers:** Automatic `X-Content-Type-Options`, `X-Frame-Options`, and `X-XSS-Protection` headers configured in `vercel.json`.
- **Hobby Plan Compatibility:** Serverless functions adhere strictly to Vercel Free / Hobby execution duration limits (<= 15s).
