import AnimatedElement from "../AnimatedElement/AnimatedElement";
import {
  AvatarCircle,
  TestimonialCardWrapper,
} from "./TestimonialSection.styles";

/**
 * Derives initials from an author name, e.g. "Job Seeker" → "JS".
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
 * A single testimonial (quote, avatar initials, author, role) that scales in
 * when it scrolls into view. Entrance animation is delegated to AnimatedElement
 * (rendered as the styled card via `as`, so no extra DOM wrapper is added).
 *
 * @param {object} props
 * @param {{ quote: string, author: string, role: string }} props.testimonial
 * @param {number} [props.delay=0] - Animation delay in milliseconds for stagger effect
 */
function TestimonialCard({ testimonial, delay = 0 }) {
  const { quote, author, role } = testimonial;
  const initials = getInitials(author);

  return (
    <AnimatedElement
      as={TestimonialCardWrapper}
      animation="scale-up"
      delay={delay}
      threshold={0.1}
    >
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
    </AnimatedElement>
  );
}

export default TestimonialCard;
