-- Migration: 002_jobs
-- Description: Create jobs table with employer posting support
-- Requirement: 19.2 - Modify jobs table to include employer_id, title, company_name, 
--              location, job_type enum, salary fields, description, requirements, status
-- 
-- Run this migration in Supabase SQL Editor: https://app.supabase.com/project/_/sql
-- Note: Run this AFTER 001_profiles.sql as jobs references profiles table

-- Create jobs table
-- This table stores job listings posted by employers
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,  -- Denormalized from employer profile at creation time
  location TEXT NOT NULL,
  job_type TEXT NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'remote', 'internship')),
  salary_min INTEGER,
  salary_max INTEGER,
  description TEXT NOT NULL,
  requirements TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraint: salary_max >= salary_min if both are provided
  -- Allows: both null, only min, only max, or both with max >= min
  CONSTRAINT valid_salary CHECK (
    salary_max IS NULL OR salary_min IS NULL OR salary_max >= salary_min
  )
);

-- Indexes for optimized queries
-- Index for filtering jobs by employer (employer dashboard)
CREATE INDEX IF NOT EXISTS idx_jobs_employer ON jobs(employer_id);

-- Index for filtering jobs by status (public browse shows only open jobs)
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);

-- Index for sorting by creation date (newest first default ordering)
CREATE INDEX IF NOT EXISTS idx_jobs_created ON jobs(created_at DESC);

-- Full-text search index for searching job title, company name, and location
CREATE INDEX IF NOT EXISTS idx_jobs_search ON jobs 
  USING gin(to_tsvector('english', title || ' ' || company_name || ' ' || location));

-- Create trigger to auto-update updated_at on row changes
-- Reuses the update_updated_at_column function created in 001_profiles.sql
DROP TRIGGER IF EXISTS update_jobs_updated_at ON jobs;
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for jobs table

-- Policy: Anyone can read open jobs (for public browse page)
-- Also allows employers to see their own closed jobs
DROP POLICY IF EXISTS "Open jobs are viewable" ON jobs;
CREATE POLICY "Open jobs are viewable" 
  ON jobs FOR SELECT 
  USING (status = 'open' OR employer_id = auth.uid());

-- Policy: Only employers can create jobs
-- Validates that the user is authenticated and has employer role
DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;
CREATE POLICY "Employers can create jobs" 
  ON jobs FOR INSERT 
  WITH CHECK (
    auth.uid() = employer_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'employer')
  );

-- Policy: Employers can only update their own jobs
DROP POLICY IF EXISTS "Employers can update own jobs" ON jobs;
CREATE POLICY "Employers can update own jobs" 
  ON jobs FOR UPDATE 
  USING (employer_id = auth.uid());

-- Policy: Employers can only delete their own jobs
DROP POLICY IF EXISTS "Employers can delete own jobs" ON jobs;
CREATE POLICY "Employers can delete own jobs" 
  ON jobs FOR DELETE 
  USING (employer_id = auth.uid());

-- Grant necessary permissions
GRANT ALL ON jobs TO authenticated;
GRANT SELECT ON jobs TO anon;

-- Add comments for documentation
COMMENT ON TABLE jobs IS 'Job listings posted by employers, visible to candidates and visitors';
COMMENT ON COLUMN jobs.employer_id IS 'Reference to the employer (profiles table) who posted this job';
COMMENT ON COLUMN jobs.title IS 'Job title (e.g., Senior React Developer)';
COMMENT ON COLUMN jobs.company_name IS 'Company name denormalized at posting time for display consistency';
COMMENT ON COLUMN jobs.location IS 'Job location (e.g., Yerevan, Remote)';
COMMENT ON COLUMN jobs.job_type IS 'Employment type: full-time, part-time, remote, or internship';
COMMENT ON COLUMN jobs.salary_min IS 'Minimum salary (optional), used with salary_max for salary range display';
COMMENT ON COLUMN jobs.salary_max IS 'Maximum salary (optional), must be >= salary_min if both provided';
COMMENT ON COLUMN jobs.description IS 'Full job description with responsibilities and details';
COMMENT ON COLUMN jobs.requirements IS 'Optional job requirements and qualifications';
COMMENT ON COLUMN jobs.status IS 'Job status: open (accepting applications) or closed';
