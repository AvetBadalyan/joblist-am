import { useCallback, useEffect, useMemo } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/JobsContainer";
import PageButtonsWrapper from "../../assets/wrappers/PageBtnContainer";
import SearchWrapper from "../../assets/wrappers/SearchContainer";
import EmptyState from "../../components/EmptyState/EmptyState.jsx";
import JobCard from "../../components/JobCard/JobCard.jsx";
import JobCardSkeleton from "../../components/LoadingSkeleton/JobCardSkeleton.jsx";
import {
  clearFilters,
  getAllPublicJobs,
  handleChange,
  setPage,
} from "../../features/publicJobs/publicJobsSlice";
import {
  optimisticSave,
  optimisticUnsave,
  saveJob,
  unsaveJob,
} from "../../features/savedJobs/savedJobsSlice";

/**
 * BrowseJobs Page
 *
 * Displays a paginated list of open job listings with search and filter capabilities.
 *
 * Requirements implemented:
 * - 1.1: Display paginated list of open job listings
 * - 1.2: Display title, company name, location, job type, posting date for each job
 * - 1.3: Pagination controls when more than 10 jobs
 * - 1.4: Order by created_at descending (newest first)
 * - 2.1: Search filter on title, company_name, location (case-insensitive)
 * - 2.2: Job type filter dropdown
 * - 2.3: Multiple filters use AND logic
 * - 2.4: Reset pagination when filters change
 * - 2.5: Clear filters button
 * - 22.1: Loading skeleton while fetching
 */

// Job type options for filter dropdown
const JOB_TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "remote", label: "Remote" },
  { value: "internship", label: "Internship" },
];

const BrowseJobs = () => {
  const dispatch = useDispatch();

  // Public jobs state
  const { isLoading, jobs, totalJobs, numOfPages, page, search, searchType } =
    useSelector((store) => store.publicJobs);

  // User state for bookmark functionality
  const { user } = useSelector((store) => store.user);
  const { savedJobIds } = useSelector((store) => store.savedJobs);

  // Determine if user can bookmark (authenticated candidate only)
  const canBookmark = useMemo(() => {
    return user && user.role === "candidate";
  }, [user]);

  // Create a Set for O(1) lookup of saved job IDs
  const savedJobIdsSet = useMemo(() => new Set(savedJobIds), [savedJobIds]);

  // Fetch jobs on mount and when filters/page change
  useEffect(() => {
    dispatch(getAllPublicJobs());
  }, [dispatch, page, search, searchType]);

  /**
   * Handle search input change
   * Requirement 2.4: Reset pagination when filters change
   */
  const handleSearchChange = useCallback(
    (e) => {
      dispatch(handleChange({ name: "search", value: e.target.value }));
    },
    [dispatch],
  );

  /**
   * Handle job type filter change
   * Requirement 2.2: Job type filter
   * Requirement 2.4: Reset pagination when filters change
   */
  const handleJobTypeChange = useCallback(
    (e) => {
      dispatch(handleChange({ name: "searchType", value: e.target.value }));
    },
    [dispatch],
  );

  /**
   * Clear all filters
   * Requirement 2.5: Clear filters button
   */
  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  /**
   * Handle bookmark toggle for a job
   * Only available for authenticated candidates
   * Uses optimistic updates for instant UI feedback (Requirement 8.2, 8.3)
   */
  const handleBookmarkClick = useCallback(
    (jobId) => {
      if (!canBookmark) return;

      if (savedJobIdsSet.has(jobId)) {
        // Optimistic update then dispatch API call
        dispatch(optimisticUnsave(jobId));
        dispatch(unsaveJob(jobId));
      } else {
        // Optimistic update then dispatch API call
        dispatch(optimisticSave(jobId));
        dispatch(saveJob(jobId));
      }
    },
    [dispatch, canBookmark, savedJobIdsSet],
  );

  /**
   * Handle pagination
   * Requirement 1.3: Pagination controls
   */
  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(setPage(newPage));
    },
    [dispatch],
  );

  const handlePrevPage = useCallback(() => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    handlePageChange(newPage);
  }, [page, numOfPages, handlePageChange]);

  const handleNextPage = useCallback(() => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    handlePageChange(newPage);
  }, [page, numOfPages, handlePageChange]);

  // Generate page numbers array for pagination
  const pages = useMemo(() => {
    return Array.from({ length: numOfPages }, (_, index) => index + 1);
  }, [numOfPages]);

  // Check if any filters are active
  const hasActiveFilters = search !== "" || searchType !== "all";

  return (
    <main className="dashboard">
      <div className="dashboard-page">
        {/* Search and Filter Section */}
        <SearchWrapper>
          <form className="form">
            <h5>Search Jobs</h5>
            <div className="form-center">
              {/* Search Input - Requirement 2.1 */}
              <div className="form-row">
                <label htmlFor="search" className="form-label">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search by title, company, or location"
                  className="form-input"
                />
              </div>

              {/* Job Type Filter - Requirement 2.2 */}
              <div className="form-row">
                <label htmlFor="searchType" className="form-label">
                  Job Type
                </label>
                <select
                  id="searchType"
                  name="searchType"
                  value={searchType}
                  onChange={handleJobTypeChange}
                  className="form-select"
                >
                  {JOB_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters Button - Requirement 2.5 */}
              <button
                type="button"
                className="btn btn-block btn-danger"
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
              >
                Clear Filters
              </button>
            </div>
          </form>
        </SearchWrapper>

        {/* Jobs List Section */}
        <Wrapper>
          {/* Jobs count header */}
          <h5>
            {totalJobs} job{totalJobs !== 1 ? "s" : ""} found
          </h5>

          {/* Loading State - Requirement 22.1 */}
          {isLoading && (
            <div className="jobs">
              <JobCardSkeleton count={6} />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && jobs.length === 0 && (
            <EmptyState
              message={
                hasActiveFilters
                  ? "No jobs match your search criteria"
                  : "No jobs available at the moment"
              }
              actionText={hasActiveFilters ? "Clear Filters" : undefined}
              onAction={hasActiveFilters ? handleClearFilters : undefined}
            />
          )}

          {/* Jobs Grid - Requirements 1.1, 1.2 */}
          {!isLoading && jobs.length > 0 && (
            <div className="jobs">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  showBookmark={canBookmark}
                  isSaved={savedJobIdsSet.has(job.id)}
                  onBookmarkClick={handleBookmarkClick}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls - Requirement 1.3 */}
          {!isLoading && numOfPages > 1 && (
            <PageButtonsWrapper>
              <p className="page-indicator">
                Page {page} of {numOfPages}
              </p>
              <button
                type="button"
                className="prev-btn"
                onClick={handlePrevPage}
              >
                <HiChevronDoubleLeft />
                prev
              </button>
              <div className="btn-container">
                {pages.map((pageNumber) => (
                  <button
                    type="button"
                    key={pageNumber}
                    className={
                      pageNumber === page ? "pageBtn active" : "pageBtn"
                    }
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="next-btn"
                onClick={handleNextPage}
              >
                next
                <HiChevronDoubleRight />
              </button>
            </PageButtonsWrapper>
          )}
        </Wrapper>
      </div>
    </main>
  );
};

export default BrowseJobs;
