# Database Migrations

This directory contains SQL migration files for setting up the Supabase database schema for the job marketplace platform.

## How to Run Migrations

1. **Open Supabase Dashboard**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run Migrations in Order**
   - Copy the contents of each migration file
   - Paste into the SQL Editor
   - Click "Run" to execute
   - **Important:** Run migrations in numerical order (001, 002, 003, etc.)

## Migration Files

| File                   | Description                              | Requirements |
| ---------------------- | ---------------------------------------- | ------------ |
| `001_profiles.sql`     | Creates profiles table with role support | Req 19.1     |
| `002_jobs.sql`         | Creates jobs table for job listings      | Req 19.2     |
| `003_applications.sql` | Creates applications table               | Req 19.3     |
| `004_saved_jobs.sql`   | Creates saved_jobs table                 | Req 19.4     |
| `005_seed.sql`         | Seed data for testing (see note below)   | Req 20       |
| `006_security_hardening.sql` | Restricts profile access and write permissions across tables | Security |

### Seeding (005_seed.sql)

The seed links profiles to real Supabase Auth users, so run it in two steps:

1. In **Authentication > Users**, create these 5 users (Add user > Create new user, with "Auto Confirm User" enabled):
   - Employers: `hr@picsart.com`, `careers@teamviewer.am`, `jobs@servicetitan.com`
   - Candidates: `armen@example.com`, `anna@example.com`
   - Password for all: `TestPassword123!`
2. Run `005_seed.sql` in the SQL Editor. It resolves each user's UUID by email automatically (no manual UUID editing) and inserts profiles, 15 jobs, 7 applications, and 5 saved jobs. The script is safe to re-run and will raise a clear error if any user is missing.

## Rollback

To rollback a migration, you'll need to manually drop the tables and associated objects. Be careful in production!

```sql
-- Example rollback for 001_profiles.sql
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP TABLE IF EXISTS profiles;
```

## Notes

- All migrations enable Row Level Security (RLS) by default
- Run `006_security_hardening.sql` after migrations `001`–`004` for least-privilege RLS and grants. It is required for existing projects too; applying the source changes alone does not update the live Supabase database.
- Timestamps (`created_at`, `updated_at`) are automatically managed
- Foreign keys reference Supabase Auth's `auth.users` table
- Make sure you have the necessary permissions before running migrations
