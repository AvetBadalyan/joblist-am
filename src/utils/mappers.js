/**
 * Job Mappers for Supabase Database
 *
 * These mappers handle the conversion between database schema (snake_case)
 * and Redux state (camelCase/snake_case as used in the new job marketplace).
 *
 * New Schema Fields:
 * - employer_id: UUID of the employer who posted the job
 * - title: Job title (was 'position')
 * - company_name: Denormalized from employer profile at creation time
 * - location: Job location
 * - job_type: full-time | part-time | remote | internship
 * - salary_min: Minimum salary (optional)
 * - salary_max: Maximum salary (optional)
 * - description: Full job description
 * - requirements: Job requirements (optional)
 * - status: open | closed
 * - created_at: Timestamp
 * - updated_at: Timestamp
 */

/**
 * Maps a job row from Supabase to the app's Redux state shape.
 * @param {Object} job - Raw job record from Supabase
 * @returns {Object} Job object for Redux store
 */
export const mapJobFromDB = (job) => ({
  id: job.id,
  employer_id: job.employer_id,
  title: job.title,
  company_name: job.company_name,
  location: job.location,
  job_type: job.job_type,
  salary_min: job.salary_min,
  salary_max: job.salary_max,
  description: job.description,
  requirements: job.requirements,
  status: job.status,
  created_at: job.created_at,
  updated_at: job.updated_at,
  // Computed fields that may be joined from queries
  application_count: job.application_count,
});

/**
 * Maps a job object from the form state to Supabase column names.
 * Excludes id, employer_id, company_name, and timestamps — those are managed separately.
 * @param {Object} job - Job object from Redux store / form state
 * @returns {Object} Job record ready for Supabase insert/update
 */
export const mapJobToDB = (job) => ({
  title: job.title,
  location: job.location,
  job_type: job.job_type,
  salary_min: job.salary_min === "" ? null : Number(job.salary_min),
  salary_max: job.salary_max === "" ? null : Number(job.salary_max),
  description: job.description,
  requirements: job.requirements || null,
  status: job.status,
});

/**
 * Maps a job for creation - includes employer_id and company_name
 * @param {Object} job - Job object from Redux store / form state
 * @param {string} employerId - The employer's user ID
 * @param {string} companyName - The employer's company name
 * @returns {Object} Job record ready for Supabase insert
 */
export const mapJobToDBForCreate = (job, employerId, companyName) => ({
  ...mapJobToDB(job),
  employer_id: employerId,
  company_name: companyName,
});

/**
 * Maps an application from Supabase to the app's state shape.
 * @param {Object} application - Raw application record from Supabase
 * @returns {Object} Application object for Redux store
 */
export const mapApplicationFromDB = (application) => ({
  id: application.id,
  job_id: application.job_id,
  candidate_id: application.candidate_id,
  cover_letter: application.cover_letter,
  resume_url: application.resume_url,
  status: application.status,
  applied_at: application.applied_at,
  updated_at: application.updated_at,
  // Joined fields for candidate view
  job_title: application.jobs?.title,
  company_name: application.jobs?.company_name,
  // Joined fields for employer view
  candidate_name: application.profiles?.name,
  candidate_email: application.profiles?.email,
});

/**
 * Maps an application for creation to Supabase format.
 * @param {Object} application - Application object from form
 * @param {string} jobId - The job ID being applied to
 * @param {string} candidateId - The candidate's user ID
 * @returns {Object} Application record ready for Supabase insert
 */
export const mapApplicationToDB = (application, jobId, candidateId) => ({
  job_id: jobId,
  candidate_id: candidateId,
  cover_letter: application.cover_letter,
  resume_url: application.resume_url || null,
  status: "applied",
});

/**
 * Maps a saved job from Supabase to the app's state shape.
 * @param {Object} savedJob - Raw saved_job record from Supabase (with joined job data)
 * @returns {Object} SavedJob object for Redux store
 */
export const mapSavedJobFromDB = (savedJob) => ({
  id: savedJob.id,
  job_id: savedJob.job_id,
  candidate_id: savedJob.candidate_id,
  saved_at: savedJob.saved_at,
  // Joined job data
  job: savedJob.jobs ? mapJobFromDB(savedJob.jobs) : null,
});

/**
 * Maps a user profile from Supabase to the app's state shape.
 * @param {Object} profile - Raw profile record from Supabase
 * @returns {Object} User object for Redux store
 */
export const mapProfileFromDB = (profile) => ({
  id: profile.id,
  email: profile.email,
  name: profile.name,
  role: profile.role,
  location: profile.location,
  // Candidate fields
  skills: profile.skills,
  resume_url: profile.resume_url,
  // Employer fields
  company_name: profile.company_name,
  company_description: profile.company_description,
  company_logo_url: profile.company_logo_url,
  created_at: profile.created_at,
  updated_at: profile.updated_at,
});
