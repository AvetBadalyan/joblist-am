import { FaBriefcase, FaBuilding, FaUsers } from "react-icons/fa";
import useStatsCounter from "../../../hooks/useStatsCounter";
import { StatItem } from "./StatsSection.styles";

/**
 * Maps the icon string from landingData to a react-icons component.
 * Falls back to FaBriefcase for unknown names.
 */
const ICON_MAP = {
  briefcase: FaBriefcase,
  users: FaUsers,
  building: FaBuilding,
};

/**
 * StatsCounter
 *
 * Displays a single statistic: an icon, an animated numeric value,
 * and a descriptive label.
 *
 * The component owns its animation state via useStatsCounter, which:
 *   - Starts counting from 0 when the StatItem scrolls into view
 *   - Animates to `value` over 2 seconds using easeOutExpo via rAF
 *   - Respects prefers-reduced-motion (jumps straight to the end value)
 *   - Only triggers once (triggerOnce behavior)
 *
 * @param {object} props
 * @param {string} props.icon    - Icon key matching ICON_MAP (e.g. 'briefcase')
 * @param {number} props.value   - Target value to animate toward
 * @param {string} props.label   - Descriptive label shown below the number
 * @param {string} [props.suffix=''] - Suffix appended to count (e.g. '+')
 *
 */
function StatsCounter({ icon, value, label, suffix = "" }) {
  const IconComponent = ICON_MAP[icon] ?? FaBriefcase;

  const { ref, count } = useStatsCounter({
    end: value,
    duration: 2000,
    startOnVisible: true,
  });

  return (
    <StatItem ref={ref}>
      <div className="stat-icon" aria-hidden="true">
        <IconComponent />
      </div>

      {/* font-variant-numeric: tabular-nums is set in StatsSection.styles.js
          on .stat-value to prevent layout shift while numbers animate */}
      <p className="stat-value" aria-live="off" aria-atomic="true">
        {count.toLocaleString()}
        {suffix}
      </p>

      <p className="stat-label">{label}</p>
    </StatItem>
  );
}

export default StatsCounter;
