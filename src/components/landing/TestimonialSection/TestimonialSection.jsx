import { useCallback, useRef, useState } from "react";
import { testimonialsData } from "../../../data/landingData";
import TestimonialCard from "./TestimonialCard";
import {
  TestimonialGrid,
  TestimonialWrapper,
} from "./TestimonialSection.styles";

/**
 * TestimonialSection
 *
 * Displays three user testimonials.
 *
 * Desktop  : 3-column grid (all cards visible at once)
 * Tablet   : 2-column grid  → hidden in favour of carousel
 * Mobile   : CSS scroll-snap horizontal carousel with dot indicators
 *
 */
function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  /* ── Sync dot indicator with scroll position ── */
  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const slideWidth = el.offsetWidth;
    const index = Math.round(el.scrollLeft / slideWidth);
    setCurrentIndex(index);
  }, []);

  /* ── Programmatic scroll to a slide ── */
  const scrollToSlide = useCallback((index) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.offsetWidth, behavior: "smooth" });
    setCurrentIndex(index);
  }, []);

  return (
    <TestimonialWrapper aria-labelledby="testimonials-heading">
      <div className="container">
        {/* ── Section header ── */}
        <header className="section-header">
          <span className="section-label">How It Feels to Use</span>
          <h2 className="section-title" id="testimonials-heading">
            Built for Both Sides of Hiring
          </h2>
          <p className="section-subtitle">
            Sample scenarios showing how candidates and employers move through
            the platform.
          </p>
        </header>

        {/* ── Desktop grid (hidden on mobile/tablet via CSS) ── */}
        <TestimonialGrid>
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              delay={index * 150}
            />
          ))}
        </TestimonialGrid>

        {/* ── Mobile / tablet carousel (hidden on desktop via CSS) ── */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="User testimonials"
          className="testimonial-carousel-wrapper"
        >
          {/* Live region announces slide changes to screen readers */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {`Slide ${currentIndex + 1} of ${testimonialsData.length}`}
          </div>

          {/* Scrollable track */}
          <div
            className="carousel-track"
            ref={carouselRef}
            onScroll={handleScroll}
          >
            {testimonialsData.map((testimonial, index) => (
              <div
                className="carousel-slide"
                key={testimonial.author}
                aria-label={`Slide ${index + 1} of ${testimonialsData.length}`}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  delay={index * 150}
                />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div
            className="carousel-dots"
            role="tablist"
            aria-label="Testimonial slides"
          >
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={currentIndex === index}
                aria-label={`Go to slide ${index + 1}`}
                className={`dot${currentIndex === index ? " active" : ""}`}
                onClick={() => scrollToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </TestimonialWrapper>
  );
}

export default TestimonialSection;
