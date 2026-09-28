import styled from "styled-components";

export const StatsWrapper = styled.section`
  position: relative;
  background: linear-gradient(135deg, var(--grey-800) 0%, var(--grey-900) 100%);
  padding: var(--space-16) 0;
  overflow: hidden;

  /* Subtle dot pattern overlay for texture */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.06) 1px,
      transparent 1px
    );
    background-size: 28px 28px;
    pointer-events: none;
  }
`;

export const StatsContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);

  /* Mobile: 2-column grid (last item centres itself via auto margins) */
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);

    /* Centre the third item when it sits alone on the second row */
    > *:last-child:nth-child(odd) {
      grid-column: 1 / -1;
      max-width: 280px;
      margin-inline: auto;
    }
  }
`;

export const StatItem = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-8) var(--space-6);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-2xl);
  color: var(--white);
  transition:
    background var(--transition-base),
    transform var(--transition-base);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-4px);
  }

  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: var(--radius-xl);
    background: var(--gradient-accent);
    margin-bottom: var(--space-4);
    flex-shrink: 0;

    svg {
      font-size: var(--fs-2xl);
      color: var(--white);
    }
  }

  .stat-value {
    font-family: var(--font-heading);
    font-size: var(--fs-stat);
    font-weight: 800;
    line-height: 1;
    margin-bottom: var(--space-2);
    /* Prevent layout shift while numbers animate */
    font-variant-numeric: tabular-nums;
    /* Gradient text */
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: var(--fs-sm);
    font-weight: 600;
    color: var(--grey-300);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0;
  }

  @media (max-width: 767px) {
    padding: var(--space-6) var(--space-4);

    .stat-icon {
      width: 48px;
      height: 48px;

      svg {
        font-size: var(--fs-xl);
      }
    }

    .stat-value {
      font-size: var(--fs-3xl);
    }
  }
`;
