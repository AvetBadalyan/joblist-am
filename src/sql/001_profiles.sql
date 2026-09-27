-- Migration: 001_profiles
-- Description: Create profiles table with role support for candidates and employers
-- Requirement: 19.1 - Extend users table to include role-based fields
-- 
-- Run this migration in Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Create profiles table
-- This table extends Supabase Auth users with application-specific data
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('candidate', 'employer')),
  location TEXT,
  -- Candidate-specific fields
  skills TEXT,
  resume_url TEXT,
  -- Employer-specific fields
  company_name TEXT,
  company_description TEXT,
  company_logo_url TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for role-based queries (used for filtering users by role)
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at on row changes
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
-- Policy: Anyone can read profiles (needed for displaying employer info on job listings)
DROP POLICY IF EXISTS "Public profiles are viewable" ON profiles;
CREATE POLICY "Public profiles are viewable" 
  ON profiles FOR SELECT 
  USING (true);

-- Policy: Users can only update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Policy: Users can only insert their own profile (during registration)
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Grant necessary permissions
GRANT ALL ON profiles TO authenticated;
GRANT SELECT ON profiles TO anon;

-- Add comment for documentation
COMMENT ON TABLE profiles IS 'User profiles extending Supabase Auth with role-based fields for candidates and employers';
COMMENT ON COLUMN profiles.role IS 'User role: candidate (job seeker) or employer (job poster)';
COMMENT ON COLUMN profiles.skills IS 'Candidate only: comma-separated list of skills';
COMMENT ON COLUMN profiles.resume_url IS 'Candidate only: URL to uploaded resume';
COMMENT ON COLUMN profiles.company_name IS 'Employer only: company name';
COMMENT ON COLUMN profiles.company_description IS 'Employer only: company description';
COMMENT ON COLUMN profiles.company_logo_url IS 'Employer only: URL to company logo';
