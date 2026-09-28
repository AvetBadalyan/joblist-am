import { featuresData } from '../../../data/landingData';
import FeatureCard from './FeatureCard';
import { FeatureWrapper } from './FeatureShowcase.styles';

/**
 * FeatureShowcase
 *
 * Displays exactly 6 feature cards organised into two groups:
 *   - "For Job Seekers"  (3 cards)
 *   - "For Employers"   (3 cards)
 *
 * Requirements: 3.1, 3.3
 *
 * Staggered entrance animations and interactive card hover effects are
 * added in tasks 8.2 and 8.3.
 */
function FeatureShowcase() {
  return (
    <FeatureWrapper aria-labelledby="features-heading">
      <div className="container">
        {/* ── Section header ── */}
        <header className="section-header">
          <span className="section-label">Features</span>
          <h2 className="section-title" id="features-heading">
            Why Choose JobList.am
          </h2>
          <p className="section-subtitle">
            Everything you need — whether you're launching your career or building your team.
          </p>
        </header>

        {/* ── For Job Seekers ── */}
        <div className="feature-group">
          <h3 className="group-title">For Job Seekers</h3>
          <div className="feature-grid">
            {featuresData.seekers.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* ── For Employers ── */}
        <div className="feature-group">
          <h3 className="group-title">For Employers</h3>
          <div className="feature-grid">
            {featuresData.employers.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </FeatureWrapper>
  );
}

export default FeatureShowcase;
