import { statsData } from "../../../data/landingData";
import StatsCounter from "./StatsCounter";
import { StatsContainer, StatsWrapper } from "./StatsSection.styles";

/**
 * StatsSection
 *
 * Renders a dark gradient band displaying three platform metrics:
 * Jobs Posted, Successful Hires, and Companies. Each StatsCounter
 * manages its own animated count via the useStatsCounter hook,
 * triggering on viewport entry.
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6
 */
function StatsSection() {
  return (
    <StatsWrapper aria-label="Platform statistics">
      <StatsContainer>
        {statsData.map((stat) => (
          <StatsCounter
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            suffix={stat.suffix}
          />
        ))}
      </StatsContainer>
    </StatsWrapper>
  );
}

export default StatsSection;
