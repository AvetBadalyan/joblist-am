# Joblist

A full-stack job application tracker built with React and Supabase. Log and manage your job search — add applications, track their status through the interview pipeline, and visualize your progress with charts.

> Built as a portfolio project demonstrating React + Redux Toolkit + Supabase integration.

---

## Features

- **Authentication** — Register and log in with email/password via Supabase Auth; sessions persist across page refreshes
- **Job CRUD** — Create, view, edit, and delete job applications with full Supabase backend persistence
- **Status tracking** — Each job is tagged as `pending`, `interview`, or `declined`
- **Filtering** — Filter applications by status and job type (full-time, part-time, remote, internship)
- **Search with debounce** — Live search across job titles with a 300ms debounce to minimize requests
- **Sorting** — Sort by newest, oldest, or alphabetically (A–Z / Z–A)
- **Pagination** — Browse jobs 10 per page with wrap-around navigation
- **Statistics dashboard** — View application counts by status and a monthly applications chart powered by Recharts
- **Loading skeletons** — Skeleton placeholders during data fetches for a smooth perceived performance
- **Delete confirmation modal** — Prevents accidental deletions with a confirm/cancel dialog
- **Password strength indicator** — Real-time feedback (Weak / Medium / Strong) during registration
- **Responsive design** — Works across desktop and mobile viewports

---

## Tech Stack

| Technology        | Version | Purpose                           |
| ----------------- | ------- | --------------------------------- |
| React             | 18      | UI framework                      |
| Redux Toolkit     | latest  | Global state management           |
| Supabase          | latest  | Auth + PostgreSQL database (BaaS) |
| styled-components | latest  | Component-scoped CSS-in-JS        |
| Recharts          | latest  | Statistics charts                 |
| React Router      | v6      | Client-side routing               |

---

## Local Setup

### Prerequisites

- Node.js 16+
- A free [Supabase](https://supabase.com) account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/joblist-am.git
cd joblist-am
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Open `.env` and set:

```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project under **Settings → API**.

### 4. Set up the database

In your Supabase project, open the **SQL Editor** and run the migration scripts in order:

1. `supabase/migrations/001_create_jobs_table.sql` — creates the jobs table
2. `supabase/migrations/002_rls_policies.sql` — enables Row Level Security policies

### 5. Start the development server

```bash
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

---

## Screenshots

_Screenshots coming soon. Run the app locally to see the full UI._

---

## License

MIT
