import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mapJobFromDB } from "../../utils/mappers";
import { supabase } from "../../utils/supabase";
import JobCard from "../JobCard/JobCard";
import AnimatedElement from "../landing/AnimatedElement/AnimatedElement";
import Loading from "../Loading/Loading";

// Number of featured jobs to display (Requirement 18.2)
const FEATURED_JOBS_COUNT = 6;

/**
 * FeaturedJobs Component
 * Displays up to 6 most recent open jobs on the landing page.
 *
 * Requirements implemented:
 * - 7.1: Enhanced section styling integration
 * - 7.2: Animated section header with gradient text heading
 * - 7.3: Staggered fade-and-slide animation for job cards on viewport entry
 * - 7.4: Subtle decorative background pattern / gradient
 * - 7.5: "View All Jobs" button matches Hero CTA hover animation
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
          <span className="section-label">Opportunities</span>
          <h2 className="section-title">Featured Jobs</h2>
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
          <span className="section-label">Opportunities</span>
          <h2 className="section-title">Featured Jobs</h2>
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
          <span className="section-label">Opportunities</span>
          <h2 className="section-title">Featured Jobs</h2>
        </div>
        <div className="empty-state">
          <p>No jobs available at the moment. Check back soon!</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* Section header — animated on scroll entry (Req 7.2) */}
      <AnimatedElement animation="slide-up" threshold={0.15}>
        <div className="section-header">
          <span className="section-label">Opportunities</span>
          <h2 className="section-title">Featured Jobs</h2>
          <p className="section-description">
            Explore the latest opportunities from top companies
          </p>
        </div>
      </AnimatedElement>

      {/* Job cards — staggered slide-up animation (Req 7.3) */}
      <div className="jobs-grid">
        {jobs.map((job, index) => (
          <AnimatedElement
            key={job.id}
            animation="slide-up"
            delay={index * 80}
            threshold={0.1}
          >
            <JobCard job={job} showBookmark={showBookmark} isSaved={false} />
          </AnimatedElement>
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
  padding: var(--space-20) 0;
  background: var(--white);
  position: relative;
  overflow: hidden;

  /* Subtle dot pattern overlay for texture (Req 7.4) */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.04) 1px,
      transparent 1px
    );
    background-size: 28px 28px;
    pointer-events: none;
    z-index: 0;
  }

  /* All direct children sit above the dot overlay */
  > * {
    position: relative;
    z-index: 1;
  }

  /* ── Section header ── */
  .section-header {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  .section-label {
    display: inline-block;
    font-size: var(--fs-sm);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--primary-500);
    margin-bottom: var(--space-3);
  }

  .section-title {
    font-family: var(--font-heading);
    font-size: var(--fs-3xl);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: var(--letterSpacing);
    /* Gradient text (Req 7.2) */
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 auto var(--space-4);
  }

  .section-description {
    color: var(--grey-500);
    font-size: var(--fs-md);
    max-width: 52ch;
    margin: 0 auto;
  }

  /* ── Loading ── */
  .loading-container {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Empty / error ── */
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    background: var(--grey-50);
    border-radius: var(--borderRadius);

    p {
      color: var(--grey-500);
      font-size: var(--fs-md);
      margin: 0;
    }
  }

  /* ── Jobs grid ── */
  .jobs-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--space-4);

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* ── View All CTA ── */
  .view-all-container {
    display: flex;
    justify-content: center;
    margin-top: var(--space-10);
  }

  /* Req 7.5: matches Hero CTA hover animation */
  .view-all-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: 0.75rem 2rem;
    min-height: 44px; /* Req 10.6: minimum touch target on mobile */
    background: var(--gradient-accent);
    color: var(--white);
    border-radius: var(--borderRadius);
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition:
      transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: scale(1.05);
      box-shadow: var(--shadow-glow);
      color: var(--white);
    }

    &:active {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 2px solid var(--white);
      outline-offset: 2px;
      box-shadow: 0 0 0 4px var(--primary-500);
    }
  }

  /* ── Responsive ── */
  @media (max-width: 767px) {
    padding: var(--space-16) 0;

    .section-title {
      font-size: var(--fs-2xl);
    }
  }
`;

export default FeaturedJobs;
