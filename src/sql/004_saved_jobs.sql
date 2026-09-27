-- Migration: 004_saved_jobs
-- Description: Create saved_jobs table for candidates to bookmark job listings
-- Requirement: 19.4 - Create saved_jobs table with job_id, candidate_id, saved_at
-- 
-- Run this migration in Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Create saved_jobs table
-- This table allows candidates to bookmark job listings for later reference
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent duplicate saves (one bookmark per job per candidate)
  UNIQUE(job_id, candidate_id)
);

-- Index for efficient lookups by candidate (used when viewing saved jobs list)
CREATE INDEX IF NOT EXISTS idx_saved_jobs_candidate ON saved_jobs(candidate_id);

-- Index for efficient lookups by job (used for checking if a job is saved)
CREATE INDEX IF NOT EXISTS idx_saved_jobs_job ON saved_jobs(job_id);

-- Enable Row Level Security
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for saved_jobs table

-- Policy: Candidates can only view their own saved jobs
DROP POLICY IF EXISTS "Candidates view own saved jobs" ON saved_jobs;
CREATE POLICY "Candidates view own saved jobs" 
  ON saved_jobs FOR SELECT 
  USING (candidate_id = auth.uid());

-- Policy: Candidates can save jobs (insert)
-- Only candidates (not employers) can save jobs
DROP POLICY IF EXISTS "Candidates can save jobs" ON saved_jobs;
CREATE POLICY "Candidates can save jobs" 
  ON saved_jobs FOR INSERT 
  WITH CHECK (
    auth.uid() = candidate_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'candidate')
  );

-- Policy: Candidates can unsave their own saved jobs (delete)
DROP POLICY IF EXISTS "Candidates can unsave jobs" ON saved_jobs;
CREATE POLICY "Candidates can unsave jobs" 
  ON saved_jobs FOR DELETE 
  USING (candidate_id = auth.uid());

-- Grant necessary permissions
GRANT ALL ON saved_jobs TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE saved_jobs IS 'Bookmarked job listings saved by candidates for later reference';
COMMENT ON COLUMN saved_jobs.job_id IS 'Reference to the bookmarked job listing';
COMMENT ON COLUMN saved_jobs.candidate_id IS 'Reference to the candidate who saved the job';
COMMENT ON COLUMN saved_jobs.saved_at IS 'Timestamp when the job was saved';
