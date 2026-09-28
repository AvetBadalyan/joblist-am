import { howItWorksData } from "../../../data/landingData";
import { HowItWorksWrapper, TrackWrapper } from "./HowItWorks.styles";
import StepTrack from "./StepTrack";

/**
 * HowItWorks
 *
 * Displays two parallel step tracks — one for Job Seekers and one for
 * Employers — showing how the platform works in three simple steps each.
 *
 * Desktop: side-by-side two-column grid.
 * Mobile:  stacked vertically, Job Seekers track first.
 *
 */
function HowItWorks() {
  return (
    <HowItWorksWrapper aria-labelledby="how-it-works-title">
      <div className="container">
        {/* ── Section header ── */}
        <header className="section-header">
          <span className="section-label">Simple Process</span>
          <h2 className="section-title" id="how-it-works-title">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtitle">
            Get started in minutes — whether you're looking for your next
            opportunity or searching for the perfect hire.
          </p>
        </header>

        {/* ── Two tracks: seekers first (mobile order preserved by DOM order) ── */}
        <div className="tracks-container">
          <TrackWrapper>
            <StepTrack
              title="For Job Seekers"
              trackIcon="👤"
              steps={howItWorksData.seekers}
            />
          </TrackWrapper>

          <TrackWrapper>
            <StepTrack
              title="For Employers"
              trackIcon="🏢"
              steps={howItWorksData.employers}
            />
          </TrackWrapper>
        </div>
      </div>
    </HowItWorksWrapper>
  );
}

export default HowItWorks;
