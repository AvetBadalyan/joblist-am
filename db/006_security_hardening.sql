-- Security hardening for projects that have already applied migrations 001-004.
-- Run this migration in the Supabase SQL Editor after the schema migrations.
-- It is safe to re-run and does not rewrite migration history.

BEGIN;

-- Profiles are private by default. Employers can read only candidates who
-- applied to one of their jobs; users can always read their own profile.
DROP POLICY IF EXISTS "Public profiles are viewable" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile and applicants to own jobs"
  ON profiles;
CREATE POLICY "Users can view own profile and applicants to own jobs"
  ON profiles FOR SELECT TO authenticated
  USING (
    id = auth.uid()
    OR (
      role = 'candidate'
      AND EXISTS (
        SELECT 1
        FROM applications
        JOIN jobs ON jobs.id = applications.job_id
        WHERE applications.candidate_id = profiles.id
          AND jobs.employer_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.prevent_profile_role_change()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    RAISE EXCEPTION 'Profile role cannot be changed';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_profile_role_change ON profiles;
CREATE TRIGGER prevent_profile_role_change
  BEFORE UPDATE OF role ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_profile_role_change();

REVOKE ALL ON FUNCTION public.prevent_profile_role_change() FROM PUBLIC;

-- Policy role checks must not recursively invoke profile RLS policies.
CREATE OR REPLACE FUNCTION public.current_user_has_role(required_role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = required_role
  );
$$;

REVOKE ALL ON FUNCTION public.current_user_has_role(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.current_user_has_role(text) TO authenticated;

-- Jobs remain publicly readable only while open. Employers can manage only
-- their own jobs, and ownership cannot be reassigned by an UPDATE.
DROP POLICY IF EXISTS "Open jobs are viewable" ON jobs;
CREATE POLICY "Open jobs are viewable"
  ON jobs FOR SELECT TO anon, authenticated
  USING (status = 'open' OR employer_id = auth.uid());

DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;
CREATE POLICY "Employers can create jobs"
  ON jobs FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = employer_id
    AND public.current_user_has_role('employer')
  );

DROP POLICY IF EXISTS "Employers can update own jobs" ON jobs;
CREATE POLICY "Employers can update own jobs"
  ON jobs FOR UPDATE TO authenticated
  USING (
    employer_id = auth.uid()
    AND public.current_user_has_role('employer')
  )
  WITH CHECK (
    employer_id = auth.uid()
    AND public.current_user_has_role('employer')
  );

DROP POLICY IF EXISTS "Employers can delete own jobs" ON jobs;
CREATE POLICY "Employers can delete own jobs"
  ON jobs FOR DELETE TO authenticated
  USING (
    employer_id = auth.uid()
    AND public.current_user_has_role('employer')
  );

-- Application rows are visible to the candidate and the employer who owns the
-- related job. Employers may update status only; other columns stay immutable.
DROP POLICY IF EXISTS "Users can view relevant applications" ON applications;
CREATE POLICY "Users can view relevant applications"
  ON applications FOR SELECT TO authenticated
  USING (
    candidate_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = applications.job_id
        AND jobs.employer_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Candidates can create applications" ON applications;
CREATE POLICY "Candidates can create applications"
  ON applications FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = candidate_id
    AND status = 'applied'
    AND public.current_user_has_role('candidate')
    AND EXISTS (
      SELECT 1 FROM jobs
      WHERE id = job_id AND status = 'open'
    )
  );

DROP POLICY IF EXISTS "Employers can update application status" ON applications;
CREATE POLICY "Employers can update application status"
  ON applications FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = applications.job_id
        AND jobs.employer_id = auth.uid()
    )
    AND public.current_user_has_role('employer')
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = applications.job_id
        AND jobs.employer_id = auth.uid()
    )
    AND public.current_user_has_role('employer')
  );

DROP POLICY IF EXISTS "Candidates can delete own applications" ON applications;
CREATE POLICY "Candidates can delete own applications"
  ON applications FOR DELETE TO authenticated
  USING (
    candidate_id = auth.uid()
    AND public.current_user_has_role('candidate')
  );

-- Saved jobs are candidate-owned; do not grant unused UPDATE/TRUNCATE rights.
DROP POLICY IF EXISTS "Candidates view own saved jobs" ON saved_jobs;
CREATE POLICY "Candidates view own saved jobs"
  ON saved_jobs FOR SELECT TO authenticated
  USING (
    candidate_id = auth.uid()
    AND public.current_user_has_role('candidate')
  );

DROP POLICY IF EXISTS "Candidates can save jobs" ON saved_jobs;
CREATE POLICY "Candidates can save jobs"
  ON saved_jobs FOR INSERT TO authenticated
  WITH CHECK (
    candidate_id = auth.uid()
    AND public.current_user_has_role('candidate')
  );

DROP POLICY IF EXISTS "Candidates can unsave jobs" ON saved_jobs;
CREATE POLICY "Candidates can unsave jobs"
  ON saved_jobs FOR DELETE TO authenticated
  USING (
    candidate_id = auth.uid()
    AND public.current_user_has_role('candidate')
  );

-- Remove broad table-level grants (including TRUNCATE) and grant only the
-- operations required by the client. RLS continues to constrain each row.
REVOKE ALL ON TABLE profiles FROM PUBLIC, anon, authenticated;
GRANT SELECT ON profiles TO authenticated;
GRANT INSERT (
  id, email, name, role, location, skills, resume_url,
  company_name, company_description, company_logo_url
) ON profiles TO authenticated;
REVOKE UPDATE (
  id, email, name, role, location, skills, resume_url,
  company_name, company_description, company_logo_url, created_at, updated_at
) ON profiles FROM PUBLIC, anon, authenticated;
REVOKE UPDATE ON profiles FROM authenticated;
GRANT UPDATE (
  name, location, skills, resume_url,
  company_name, company_description, company_logo_url, updated_at
) ON profiles TO authenticated;

REVOKE ALL ON TABLE jobs FROM PUBLIC, anon, authenticated;
GRANT SELECT ON jobs TO anon, authenticated;
GRANT INSERT (
  employer_id, title, company_name, location, job_type,
  salary_min, salary_max, description, requirements, status
) ON jobs TO authenticated;
GRANT UPDATE (
  title, company_name, location, job_type,
  salary_min, salary_max, description, requirements, status, updated_at
) ON jobs TO authenticated;
GRANT DELETE ON jobs TO authenticated;

REVOKE ALL ON TABLE applications FROM PUBLIC, anon, authenticated;
GRANT SELECT, DELETE ON applications TO authenticated;
GRANT INSERT (
  job_id, candidate_id, cover_letter, resume_url, status
) ON applications TO authenticated;
GRANT UPDATE (status) ON applications TO authenticated;

REVOKE ALL ON TABLE saved_jobs FROM PUBLIC, anon, authenticated;
GRANT SELECT, DELETE ON saved_jobs TO authenticated;
GRANT INSERT (job_id, candidate_id) ON saved_jobs TO authenticated;

COMMIT;
