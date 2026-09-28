import styled from "styled-components";

export const HowItWorksWrapper = styled.section`
  padding: var(--space-16) 0;
  background: var(--grey-50);
  position: relative;
  overflow: hidden;

  .container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  /* ── Section header ── */
  .section-header {
    text-align: center;
    margin-bottom: var(--space-16);
  }

  .section-label {
    display: inline-block;
    font-size: var(--fs-sm);
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--primary-600);
    margin-bottom: var(--space-3);
  }

  .section-title {
    font-size: clamp(var(--fs-2xl), 4vw, var(--fs-3xl));
    font-family: var(--font-heading);
    font-weight: 800;
    color: var(--grey-900);
    letter-spacing: -0.02em;
    margin-bottom: var(--space-4);
  }

  .gradient-text {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: var(--primary-600); /* fallback */
  }

  .section-subtitle {
    font-size: var(--fs-md);
    color: var(--grey-500);
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* ── Tracks container: 2-col on desktop, 1-col on mobile ── */
  .tracks-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }

  @media (min-width: 1024px) {
    .tracks-container {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-8);
      position: relative;
    }

    /* Vertical divider between the two tracks for clear visual separation (Req 5.6) */
    .tracks-container::after {
      content: "";
      position: absolute;
      top: var(--space-8);
      bottom: var(--space-8);
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      background: linear-gradient(
        to bottom,
        transparent,
        var(--grey-200) 20%,
        var(--grey-200) 80%,
        transparent
      );
      pointer-events: none;
    }
  }
`;

export const TrackWrapper = styled.div`
  background: var(--white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  border: 1px solid var(--grey-100);
  box-shadow: var(--shadow-sm);

  /* ── Track heading ── */
  .track-title {
    font-size: var(--fs-xl);
    font-weight: 700;
    color: var(--grey-900);
    margin-bottom: var(--space-8);
    padding-bottom: var(--space-4);
    border-bottom: 2px solid var(--grey-100);
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .track-title-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-lg);
    background: var(--gradient-accent);
    color: var(--white);
    font-size: var(--fs-md);
    flex-shrink: 0;
  }

  /* ── Step list ── */
  .steps-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    /* Gap handled by the connector between items */
  }

  /* ── Individual step ──
     Starts hidden; .animate class drives the slideUp entrance.
     Inline style prop provides the per-step delay. */
  .step-item {
    display: flex;
    gap: var(--space-4);
    position: relative;
    opacity: 0;
    transform: translateY(20px);
  }

  .step-item.animate {
    animation: slideUp var(--duration-entrance) var(--ease) forwards;
  }

  /* ── Left column: badge + connector ── */
  .step-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  /* ── Circular step badge ── */
  .step-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--gradient-accent);
    color: var(--white);
    font-size: var(--fs-sm);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
    box-shadow: var(--shadow-2);
    z-index: 1;
    position: relative;
  }

  /* Sequential badge pulse — fires once the step becomes visible.
     Delay matches the step's slideUp delay so the pulse kicks in
     just as the badge lands in its final position. */
  .step-badge.animate {
    animation: badgePulse 800ms var(--ease) forwards;
  }

  /* ── Gradient connector line between steps ── */
  .step-connector {
    flex: 1;
    width: 2px;
    margin: var(--space-2) 0;
    background: linear-gradient(
      to bottom,
      var(--primary-300),
      var(--accent-400)
    );
    border: none;
    border-radius: var(--radius-full);
    opacity: 0.4;
    transition: opacity var(--transition-base);
  }

  /* Hide connector after the last step */
  .step-item:last-child .step-connector {
    display: none;
  }

  /* ── Step content (right column) ── */
  .step-content {
    padding-bottom: var(--space-8);
    flex: 1;
  }

  /* Remove bottom padding from last step to keep consistent spacing */
  .step-item:last-child .step-content {
    padding-bottom: 0;
  }

  .step-icon-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-2);
  }

  .step-icon {
    font-size: var(--fs-2xl);
    line-height: 1;
  }

  .step-title {
    font-size: var(--fs-md);
    font-weight: 700;
    color: var(--grey-900);
  }

  .step-description {
    font-size: var(--fs-sm);
    color: var(--grey-500);
    line-height: 1.6;
    margin: 0;
  }

  /* ── Responsive: tighter padding on small screens ── */
  @media (max-width: 767px) {
    padding: var(--space-6);

    .track-title {
      font-size: var(--fs-lg);
    }
  }
`;
