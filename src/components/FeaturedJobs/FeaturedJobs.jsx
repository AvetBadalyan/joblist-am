import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import JobCard from "../JobCard/JobCard";
import Loading from "../Loading/Loading";
import { supabase } from "../../utils/supabase";
import { mapJobFromDB } from "../../utils/mappers";

// Number of featured jobs to display (Requirement 18.2)
const FEATURED_JOBS_COUNT = 6;

/**
 * FeaturedJobs Component
 * Displays up to 6 most recent open jobs on the landing page
 *
 * Requirements implemented:
 * - 18.2: Display featured Job_Listings (up to 6 most recent open jobs)
 *
 * @param {Object} props
 * @param {boolean} [props.showBookmark=false] - Whether to show bookmark buttons (disabled for landing page)
 */
const FeaturedJobs = ({ showBookmark = false }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch most recent open jobs, sorted by created_at descending
        const { data, error: fetchError } = await supabase
          .from("jobs")
          .select("*")
          .eq("status", "open")
          .order("created_at", { ascending: false })
          .limit(FEATURED_JOBS_COUNT);

        if (fetchError) {
          throw fetchError;
        }

        // Map database records to app state shape
        const mappedJobs = (data || []).map(mapJobFromDB);
        setJobs(mappedJobs);
      } catch (err) {
        console.error("Error fetching featured jobs:", err);
        setError("Failed to load featured jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <Wrapper>
        <div className="section-header">
          <h2>Featured Jobs</h2>
        </div>
        <div className="loading-container">
          <Loading center />
        </div>
      </Wrapper>
    );
  }

  // Error state
  if (error) {
    return (
      <Wrapper>
        <div className="section-header">
          <h2>Featured Jobs</h2>
        </div>
        <div className="empty-state">
          <p>{error}</p>
        </div>
      </Wrapper>
    );
  }

  // Empty state - no jobs available
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <div className="section-header">
          <h2>Featured Jobs</h2>
        </div>
        <div className="empty-state">
          <p>No jobs available at the moment. Check back soon!</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="section-header">
        <h2>Featured Jobs</h2>
        <p className="section-description">
          Explore the latest opportunities from top companies
        </p>
      </div>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            showBookmark={showBookmark}
            isSaved={false}
          />
        ))}
      </div>

      <div className="view-all-container">
        <Link to="/jobs" className="btn view-all-btn">
          View All Jobs
        </Link>
      </div>
    </Wrapper>
  );
};

// Styled wrapper for the FeaturedJobs component
const Wrapper = styled.section`
  padding: 4rem 0;

  .section-header {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--grey-800);
      margin-bottom: 0.5rem;
      letter-spacing: var(--letterSpacing);
    }

    .section-description {
      color: var(--grey-500);
      font-size: 1.1rem;
      max-width: 500px;
      margin: 0 auto;
    }
  }

  .loading-container {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    background: var(--grey-50);
    border-radius: var(--borderRadius);

    p {
      color: var(--grey-500);
      font-size: 1.1rem;
      margin: 0;
    }
  }

  .jobs-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1120px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .view-all-container {
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
  }

  .view-all-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 2rem;
    background: var(--primary-500);
    color: var(--white);
    border-radius: var(--borderRadius);
    font-weight: 500;
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      background: var(--primary-700);
      box-shadow: var(--shadow-2);
    }
  }
`;

export default FeaturedJobs;
