-- Migration: 003_applications
-- Description: Create applications table for candidate job applications
-- Requirement: 19.3 - Create applications table with job_id, candidate_id, cover_letter, resume_url, status, applied_at, updated_at
-- 
-- Run this migration in Supabase SQL Editor: https://app.supabase.com/project/_/sql
-- Prerequisites: 001_profiles.sql and 002_jobs.sql must be run first

-- Create applications table
-- This table tracks candidate applications to job listings
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cover_letter TEXT NOT NULL,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('applied', 'reviewing', 'interview', 'offer', 'rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent duplicate applications (one application per candidate per job)
  UNIQUE(job_id, candidate_id)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_applications_job ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_candidate ON applications(candidate_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- Create trigger to auto-update updated_at on row changes
-- Note: Reuses the update_updated_at_column function created in 001_profiles.sql
DROP TRIGGER IF EXISTS update_applications_updated_at ON applications;
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for applications table

-- Policy: Candidates can view their own applications
-- Policy: Employers can view applications for their job listings
DROP POLICY IF EXISTS "Users can view relevant applications" ON applications;
CREATE POLICY "Users can view relevant applications" 
  ON applications FOR SELECT 
  USING (
    candidate_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.employer_id = auth.uid()
    )
  );

-- Policy: Candidates can create applications for open jobs
DROP POLICY IF EXISTS "Candidates can create applications" ON applications;
CREATE POLICY "Candidates can create applications" 
  ON applications FOR INSERT 
  WITH CHECK (
    auth.uid() = candidate_id AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'candidate'
    ) AND
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE id = job_id 
      AND status = 'open'
    )
  );

-- Policy: Employers can update application status for their job listings
DROP POLICY IF EXISTS "Employers can update application status" ON applications;
CREATE POLICY "Employers can update application status" 
  ON applications FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.employer_id = auth.uid()
    )
  );

-- Policy: Candidates can delete their own applications (optional - for withdrawing)
DROP POLICY IF EXISTS "Candidates can delete own applications" ON applications;
CREATE POLICY "Candidates can delete own applications" 
  ON applications FOR DELETE 
  USING (candidate_id = auth.uid());

-- Grant necessary permissions
GRANT ALL ON applications TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE applications IS 'Job applications submitted by candidates to job listings';
COMMENT ON COLUMN applications.job_id IS 'Reference to the job listing being applied to';
COMMENT ON COLUMN applications.candidate_id IS 'Reference to the candidate who submitted the application';
COMMENT ON COLUMN applications.cover_letter IS 'Required cover letter text submitted by the candidate';
COMMENT ON COLUMN applications.resume_url IS 'Optional URL to candidate resume';
COMMENT ON COLUMN applications.status IS 'Application status in hiring pipeline: applied, reviewing, interview, offer, rejected';
COMMENT ON COLUMN applications.applied_at IS 'Timestamp when the application was submitted';
COMMENT ON COLUMN applications.updated_at IS 'Timestamp when the application was last updated (e.g., status change)';
