import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useReducedMotion from "../../../hooks/useReducedMotion";
import { HeroWrapper } from "./HeroSection.styles";

// Headline copy split into words so each gets a staggered reveal.
// Delay budget: 800ms total → first word at 0ms, each subsequent word
// adds ~133ms (6 words × 133ms ≈ 800ms).
const HEADLINE_WORDS = ["Find", "Your", "Next", "Career", "Move"];
const WORD_STAGGER_MS = 120; // delay between words

/**
 * Splits the headline into individually-animatable word spans.
 * Each word uses a .word-wrapper (overflow hidden) + .word child so the
 * textReveal keyframe creates an upward "wipe" effect.
 *
 * @param {string[]} words
 * @param {boolean}  animate - whether to apply animation classes
 */
function AnimatedHeadline({ words, animate }) {
  return (
    <h1 className="hero-headline" aria-label={words.join(" ")}>
      {words.map((word, i) => (
        <span key={word + i} className="word-wrapper">
          <span
            className={`word${animate ? " animate" : ""}`}
            style={
              animate
                ? { animationDelay: `${i * WORD_STAGGER_MS}ms` }
                : undefined
            }
            aria-hidden="true"
          >
            {word}
          </span>
        </span>
      ))}
    </h1>
  );
}

/**
 * FloatingElements
 *
 * Four absolutely-positioned decorative geometric shapes that use the
 * `float` CSS keyframe (index.css) for a gentle, continuous floating
 * motion.  Each shape fades in with a staggered delay so they don't all
 * appear at once.
 *
 * @param {boolean} animate - true once the entrance animation should start
 */
function FloatingElements({ animate }) {
  if (!animate) return null;

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
 * The hero: staggered headline, gradient tagline, CTA buttons, and
 * decorative floating shapes. Entrance animations respect reduced motion.
 */
function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [started, setStarted] = useState(false);

  // Kick off entrance animations on mount (hero is always above the fold,
  // so we don't need IntersectionObserver here — just a single rAF trigger).
  useEffect(() => {
    if (prefersReducedMotion) {
      // Show content immediately, skip animation
      setStarted(true);
      return;
    }

    // One frame delay ensures the browser has painted the initial hidden state
    // before applying the animation class (avoids flash-of-unanimated content).
    const id = requestAnimationFrame(() => {
      setStarted(true);
    });

    return () => cancelAnimationFrame(id);
  }, [prefersReducedMotion]);

  return (
    <HeroWrapper aria-label="Hero section">
      <FloatingElements animate={started} />

      <div className="hero-blob" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-content">
          <AnimatedHeadline words={HEADLINE_WORDS} animate={started} />

          <p className={`hero-tagline${started ? " animate" : ""}`}>
            Armenia&rsquo;s job platform for{" "}
            <span className="gradient-text">ambitious professionals</span> and{" "}
            <span className="gradient-text">growing companies</span>
          </p>

          {/* CTA buttons */}
          <div className={`hero-cta${started ? " animate" : ""}`}>
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
