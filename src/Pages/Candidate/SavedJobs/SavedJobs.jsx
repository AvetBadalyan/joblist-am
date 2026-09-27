import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/JobsContainer";
import EmptyState from "../../../components/EmptyState/EmptyState";
import JobCard from "../../../components/JobCard/JobCard";
import Loading from "../../../components/Loading/Loading";
import {
  getSavedJobs,
  optimisticUnsave,
  unsaveJob,
} from "../../../features/savedJobs/savedJobsSlice";

/**
 * SavedJobs Page
 *
 * Displays all jobs that the candidate has saved/bookmarked.
 * Allows candidates to unsave jobs directly from this view.
 *
 * Features:
 * - Fetches saved jobs on mount using getSavedJobs thunk
 * - Displays saved jobs using JobCard component with bookmark showing saved state
 * - Allows unsaving by clicking the bookmark button
 * - Shows empty state with link to browse jobs when no saved jobs
 * - Loading state while fetching
 * - Grid layout for multiple saved jobs
 *
 * Requirements: 8.4, 8.5
 */
const SavedJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get saved jobs state from Redux
  const { isLoading, savedJobs, savedJobIds } = useSelector(
    (store) => store.savedJobs,
  );

  // Create a Set for O(1) lookup of saved job IDs
  const savedJobIdsSet = useMemo(() => new Set(savedJobIds), [savedJobIds]);

  // Fetch saved jobs on mount
  useEffect(() => {
    dispatch(getSavedJobs());
  }, [dispatch]);

  /**
   * Handle unsaving a job
   * Uses optimistic update for immediate UI feedback
   */
  const handleBookmarkClick = useCallback(
    (jobId) => {
      // Optimistically remove the job from UI
      dispatch(optimisticUnsave(jobId));
      // Trigger the actual unsave operation
      dispatch(unsaveJob(jobId));
    },
    [dispatch],
  );

  /**
   * Navigate to browse jobs page
   */
  const handleBrowseJobs = useCallback(() => {
    navigate("/jobs");
  }, [navigate]);

  // Loading state
  if (isLoading) {
    return (
      <Wrapper>
        <h2>Saved Jobs</h2>
        <Loading center />
      </Wrapper>
    );
  }

  // Empty state - Requirement 8.5
  if (savedJobs.length === 0) {
    return (
      <Wrapper>
        <h2>Saved Jobs</h2>
        <EmptyState
          message="You haven't saved any jobs yet"
          actionText="Browse Jobs"
          onAction={handleBrowseJobs}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
      </h5>

      {/* Jobs Grid - Requirement 8.4 */}
      <div className="jobs">
        {savedJobs.map((savedJob) => {
          const { id, job_id, job } = savedJob;

          // Handle case where job data might be missing (job was deleted)
          if (!job) {
            return null;
          }

          return (
            <JobCard
              key={id}
              job={job}
              showBookmark={true}
              isSaved={savedJobIdsSet.has(job_id)}
              onBookmarkClick={handleBookmarkClick}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default SavedJobs;
