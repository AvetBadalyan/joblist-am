import styled from "styled-components";

export const FeatureWrapper = styled.section`
  padding: var(--space-16) 0;
  background: var(--grey-50);
  position: relative;

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
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--primary-500);
    margin-bottom: var(--space-3);
  }

  .section-title {
    font-family: var(--font-heading);
    font-size: var(--fs-3xl);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: var(--letterSpacing);
    /* Gradient text */
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 auto var(--space-4);
  }

  .section-subtitle {
    font-size: var(--fs-md);
    color: var(--grey-500);
    max-width: 52ch;
    margin: 0 auto;
  }

  /* ── Feature groups ── */
  .feature-group {
    margin-bottom: var(--space-12);

    &:last-child {
      margin-bottom: 0;
    }
  }

  .group-title {
    font-family: var(--font-heading);
    font-size: var(--fs-xl);
    font-weight: 700;
    color: var(--grey-800);
    margin-bottom: var(--space-8);
    padding-bottom: var(--space-3);
    border-bottom: 2px solid var(--grey-200);
    position: relative;

    /* Colored left accent */
    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 3rem;
      height: 2px;
      background: var(--gradient-accent);
    }
  }

  /* ── Feature grid ── */
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }

  /* Tablet */
  @media (max-width: 1023px) {
    .feature-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Mobile */
  @media (max-width: 767px) {
    padding: var(--space-16) 0;

    .section-title {
      font-size: var(--fs-2xl);
    }

    .feature-grid {
      grid-template-columns: 1fr;
      gap: var(--space-4);
    }

    .section-header {
      margin-bottom: var(--space-12);
    }
  }
`;

export const FeatureCardWrapper = styled.article`
  background: var(--white);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--grey-100);
  box-shadow: var(--shadow-card);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
  cursor: default;

  /* ── Icon container ── */
  .icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    background: var(--gradient-accent);
    display: grid;
    place-items: center;
    font-size: var(--fs-xl);
    flex-shrink: 0;
    /* Hint browser for GPU compositing in later hover animation task */
    will-change: transform;
    transition:
      transform var(--transition-base),
      filter var(--transition-base);
  }

  /* ── Text ── */
  .card-title {
    font-family: var(--font-heading);
    font-size: var(--fs-md);
    font-weight: 700;
    color: var(--grey-900);
    margin: 0;
    line-height: 1.3;
  }

  .card-description {
    font-size: var(--fs-sm);
    color: var(--grey-500);
    line-height: 1.6;
    margin: 0;
  }

  /* ── Hover state ── */
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-card-hover);
    border-color: var(--primary-200);

    .icon-wrapper {
      transform: scale(1.1) rotate(8deg);
      filter: brightness(1.15);
    }
  }

  @media (max-width: 767px) {
    padding: var(--space-6);
  }
`;
