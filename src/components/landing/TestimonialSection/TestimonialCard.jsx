import useScrollAnimation from "../../../hooks/useScrollAnimation";
import {
  AvatarCircle,
  TestimonialCardWrapper,
} from "./TestimonialSection.styles";

/**
 * Derives initials from an author name, e.g. "Sarah M." → "SM".
 */
function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * TestimonialCard
 *
 * Renders a single testimonial with:
 *  - Decorative quote icon (aria-hidden)
 *  - Quote text
 *  - Avatar circle with author initials
 *  - Author name and role badge
 *
 * Accepts an optional `delay` (ms) for staggered entrance animation.
 *
 * Requirements: 6.1, 6.2, 6.3, 6.5, 6.6
 *
 * @param {object} props
 * @param {{ quote: string, author: string, role: string }} props.testimonial
 * @param {number} [props.delay=0] - Animation delay in milliseconds for stagger effect
 */
function TestimonialCard({ testimonial, delay = 0 }) {
  const { quote, author, role } = testimonial;
  const initials = getInitials(author);

  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animationStyle = isVisible
    ? {
        animation: `scaleUp 600ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms both`,
      }
    : {
        opacity: 0,
        transform: "scale(0.9)",
      };

  return (
    <TestimonialCardWrapper ref={ref} style={animationStyle}>
      {/* Decorative large quote mark — purely visual */}
      <span className="quote-icon" aria-hidden="true">
        ❝
      </span>

      {/* Quote text */}
      <p className="quote-text">{quote}</p>

      {/* Author row */}
      <div className="author-row">
        {/* Avatar: colored circle with initials */}
        <AvatarCircle aria-hidden="true">{initials}</AvatarCircle>

        <div className="author-info">
          <span className="author-name">{author}</span>
          <span className="author-role">{role}</span>
        </div>
      </div>
    </TestimonialCardWrapper>
  );
}

export default TestimonialCard;
