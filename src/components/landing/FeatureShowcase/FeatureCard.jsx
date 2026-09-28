import useScrollAnimation from "../../../hooks/useScrollAnimation";
import { FeatureCardWrapper } from "./FeatureShowcase.styles";

/** Maps icon string keys from landingData.js to emoji/unicode glyphs. */
const ICON_MAP = {
  search: "🔍",
  click: "👆",
  bell: "🔔",
  post: "📝",
  filter: "🎯",
  analytics: "📊",
};

const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

/**
 * FeatureCard
 *
 * Renders a single feature card with a staggered fade-and-slide-up entrance
 * animation driven by IntersectionObserver (via useScrollAnimation). The delay
 * prop is used by the parent to stagger cards 100ms apart.
 *
 * Hover effects (elevate 8px, shadow increase, icon scale + brightness) are
 * defined in FeatureShowcase.styles.js on the FeatureCardWrapper styled component.
 *
 * Requirements: 3.2, 3.4, 3.5, 3.6
 *
 * @param {object} props
 * @param {{ icon: string, title: string, description: string }} props.feature
 * @param {number} [props.delay=0]  - Entrance animation stagger delay in ms.
 */
function FeatureCard({ feature, delay = 0 }) {
  const { icon, title, description } = feature;
  const emoji = ICON_MAP[icon] ?? "✨";

  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animationStyle = isVisible
    ? {
        animation: `slideUp 600ms ${EASING} ${delay}ms both`,
      }
    : {
        opacity: 0,
        transform: "translateY(30px)",
      };

  return (
    <FeatureCardWrapper ref={ref} style={animationStyle}>
      {/* Decorative icon — hidden from screen readers since the title conveys meaning */}
      <div className="icon-wrapper" aria-hidden="true">
        {emoji}
      </div>

      <h4 className="card-title">{title}</h4>
      <p className="card-description">{description}</p>
    </FeatureCardWrapper>
  );
}

export default FeatureCard;
