import { useCallback, useEffect, useMemo } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/JobsContainer";
import PageButtonsWrapper from "../../assets/wrappers/PageBtnContainer";
import SearchWrapper from "../../assets/wrappers/SearchContainer";
import EmptyState from "../../components/EmptyState/EmptyState.jsx";
import JobCard from "../../components/JobCard/JobCard.jsx";
import JobCardSkeleton from "../../components/LoadingSkeleton/JobCardSkeleton.jsx";
import PublicNav from "../../components/PublicNav/PublicNav.jsx";
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

const JOB_TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "remote", label: "Remote" },
  { value: "internship", label: "Internship" },
];

const BrowseJobs = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
    jobs,
    totalJobs,
    numOfPages,
    page,
    search,
    searchType,
  } = useSelector((store) => store.publicJobs);

  const { user } = useSelector((store) => store.user);
  const { savedJobIds } = useSelector((store) => store.savedJobs);

  // Only authenticated candidates can bookmark jobs
  const canBookmark = useMemo(() => user && user.role === "candidate", [user]);

  // Set for O(1) saved-job lookup
  const savedJobIdsSet = useMemo(() => new Set(savedJobIds), [savedJobIds]);

  // Re-fetch whenever filters or page change
  useEffect(() => {
    dispatch(getAllPublicJobs());
  }, [dispatch, page, search, searchType]);

  const handleSearchChange = useCallback(
    (e) => {
      dispatch(handleChange({ name: "search", value: e.target.value }));
    },
    [dispatch],
  );

  const handleJobTypeChange = useCallback(
    (e) => {
      dispatch(handleChange({ name: "searchType", value: e.target.value }));
    },
    [dispatch],
  );

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const handleBookmarkClick = useCallback(
    (jobId) => {
      if (!canBookmark) return;

      if (savedJobIdsSet.has(jobId)) {
        dispatch(optimisticUnsave(jobId));
        dispatch(unsaveJob(jobId));
      } else {
        dispatch(optimisticSave(jobId));
        dispatch(saveJob(jobId));
      }
    },
    [dispatch, canBookmark, savedJobIdsSet],
  );

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(setPage(newPage));
    },
    [dispatch],
  );

  const handlePrevPage = useCallback(() => {
    const newPage = page - 1 < 1 ? numOfPages : page - 1;
    handlePageChange(newPage);
  }, [page, numOfPages, handlePageChange]);

  const handleNextPage = useCallback(() => {
    const newPage = page + 1 > numOfPages ? 1 : page + 1;
    handlePageChange(newPage);
  }, [page, numOfPages, handlePageChange]);

  const pages = useMemo(
    () => Array.from({ length: numOfPages }, (_, i) => i + 1),
    [numOfPages],
  );

  const hasActiveFilters = search !== "" || searchType !== "all";

  return (
    <>
      <PublicNav />
      <main className="dashboard">
        <div className="dashboard-page">
          <SearchWrapper>
            <form className="form">
              <h5>Search Jobs</h5>
              <div className="form-center">
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

          <Wrapper>
            <h5>
              {totalJobs} job{totalJobs !== 1 ? "s" : ""} found
            </h5>

            {isLoading && (
              <div className="jobs">
                <JobCardSkeleton count={6} />
              </div>
            )}

            {!isLoading && isError && (
              <EmptyState
                message="We couldn't load jobs right now. Please try again."
                actionText="Retry"
                onAction={() => dispatch(getAllPublicJobs())}
              />
            )}

            {!isLoading && !isError && jobs.length === 0 && (
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

            {!isLoading && !isError && jobs.length > 0 && (
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
    </>
  );
};

export default BrowseJobs;
