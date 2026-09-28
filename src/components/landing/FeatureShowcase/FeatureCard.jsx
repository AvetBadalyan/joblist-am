import AnimatedElement from "../AnimatedElement/AnimatedElement";
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

/**
 * FeatureCard
 *
 * A single feature card that fades/slides up when it scrolls into view.
 * The entrance animation is delegated to AnimatedElement (rendered as the
 * styled card via `as`, so no extra DOM wrapper breaks the grid). Hover
 * effects live in FeatureShowcase.styles.js.
 *
 * @param {object} props
 * @param {{ icon: string, title: string, description: string }} props.feature
 * @param {number} [props.delay=0]  - Entrance animation stagger delay in ms.
 */
function FeatureCard({ feature, delay = 0 }) {
  const { icon, title, description } = feature;
  const emoji = ICON_MAP[icon] ?? "✨";

  return (
    <AnimatedElement
      as={FeatureCardWrapper}
      animation="slide-up"
      delay={delay}
      threshold={0.1}
    >
      {/* Decorative icon — title conveys the meaning for screen readers */}
      <div className="icon-wrapper" aria-hidden="true">
        {emoji}
      </div>

      <h4 className="card-title">{title}</h4>
      <p className="card-description">{description}</p>
    </AnimatedElement>
  );
}

export default FeatureCard;
