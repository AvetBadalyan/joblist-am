import useScrollAnimation from "../../../hooks/useScrollAnimation";

/**
 * Icon mapping for the howItWorksData icon keys.
 * Emoji are used as lightweight placeholders — no icon library dependency.
 */
const ICON_MAP = {
  "user-plus": "👤",
  search: "🔍",
  send: "📤",
  building: "🏢",
  "file-plus": "📄",
  users: "👥",
};

/**
 * STEP_DELAY_MS
 *
 * Sequential delay applied to each step item's entrance animation.
 * Step 1 → 0 ms, step 2 → 300 ms, step 3 → 600 ms.
 */
const STEP_DELAY_MS = 300;

/**
 * StepTrack
 *
 * Renders a single "track" (either Job Seekers or Employers) as a vertical
 * list of numbered steps. Each step shows a gradient badge with the step
 * number, an icon, a title, and a short description.
 *
 * Animation:
 * - The whole track is observed via a single Intersection Observer.
 * - When the track enters the viewport each step item slides up sequentially
 *   (0 ms / 300 ms / 600 ms delays).
 * - The step badge fires a pulse ripple animation with the same stagger so
 *   the ripple appears just as the badge settles in place.
 *
 * @param {object}   props
 * @param {string}   props.title           - Track heading text (e.g. "For Job Seekers")
 * @param {string}   props.trackIcon       - Emoji shown alongside the track title
 * @param {{ number: number, icon: string, title: string, description: string }[]} props.steps
 */
function StepTrack({ title, trackIcon, steps }) {
  // Observe the entire track so all steps animate together once the section
  // scrolls into view (threshold 0.15 gives a slightly earlier trigger).
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <div ref={ref}>
      <div className="track-title">
        {trackIcon && (
          <span className="track-title-icon" aria-hidden="true">
            {trackIcon}
          </span>
        )}
        {title}
      </div>

      <ol className="steps-list" aria-label={`${title} steps`}>
        {steps.map((step, index) => {
          const iconEmoji = ICON_MAP[step.icon] ?? "✦";
          // Each successive step is delayed by 300 ms relative to the previous.
          const delayMs = index * STEP_DELAY_MS;

          return (
            <li
              key={step.number}
              className={`step-item${isVisible ? " animate" : ""}`}
              style={{ animationDelay: `${delayMs}ms` }}
            >
              {/* Left column: numbered badge + gradient connector */}
              <div className="step-left" aria-hidden="true">
                <div
                  className={`step-badge${isVisible ? " animate" : ""}`}
                  // The pulse starts slightly after the slide-up so it fires
                  // once the badge has arrived at its final position.
                  style={{ animationDelay: `${delayMs + 200}ms` }}
                >
                  {step.number}
                </div>
                {/* Connector shown for every step; hidden via CSS for the last */}
                <div className="step-connector" />
              </div>

              {/* Right column: icon + title + description */}
              <div className="step-content">
                <div className="step-icon-row">
                  <span className="step-icon" aria-hidden="true">
                    {iconEmoji}
                  </span>
                  <h3 className="step-title">{step.title}</h3>
                </div>
                <p className="step-description">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default StepTrack;
