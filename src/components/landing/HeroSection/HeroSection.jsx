import { Link } from "react-router-dom";
import { HeroWrapper } from "./HeroSection.styles";

const HEADLINE_WORDS = ["Find", "Your", "Next", "Career", "Move"];

function Headline({ words }) {
  return (
    <h1 className="hero-headline" aria-label={words.join(" ")}>
      {words.map((word, i) => (
        <span key={word + i} className="word-wrapper">
          <span className="word" aria-hidden="true">{word}</span>
        </span>
      ))}
    </h1>
  );
}

function FloatingElements() {
  return (
    <div className="floating-elements" aria-hidden="true">
      {/* Shape 1 – large circle, top-right */}
      <div className="float-el float-el-1" />
      {/* Shape 2 – rounded rectangle, bottom-right */}
      <div className="float-el float-el-2" />
      {/* Shape 3 – small circle, center-right */}
      <div className="float-el float-el-3" />
      {/* Shape 4 – accent pill, upper-center-right */}
      <div className="float-el float-el-4" />
    </div>
  );
}

/**
 * HeroSection
 *
 * The hero: headline, gradient tagline, CTA buttons, and decorative shapes.
 */
function HeroSection() {
  return (
    <HeroWrapper aria-label="Hero section">
      <FloatingElements />

      <div className="hero-blob" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-content">
          <Headline words={HEADLINE_WORDS} />

          <p className="hero-tagline">
            Armenia&rsquo;s job platform for{" "}
            <span className="gradient-text">ambitious professionals</span> and{" "}
            <span className="gradient-text">growing companies</span>
          </p>

          {/* CTA buttons */}
          <div className="hero-cta">
            <Link to="/jobs" className="btn-hero-primary">
              Browse Jobs
            </Link>
            <Link to="/register" className="btn-hero-secondary">
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </HeroWrapper>
  );
}

export default HeroSection;
