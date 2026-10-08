import styled from "styled-components";

export const TestimonialWrapper = styled.section`
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
    color: var(--primary-700);
    margin-bottom: var(--space-3);
  }

  .section-title {
    font-family: var(--font-heading);
    font-size: var(--fs-3xl);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: var(--letterSpacing);
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

  /* ── Carousel wrapper: shown on mobile/tablet, hidden on desktop ── */
  .testimonial-carousel-wrapper {
    display: none;
  }

  /* ── Visually hidden live region ── */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* ── Scrollable track ── */
  .carousel-track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    /* Hide scrollbar across browsers */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
    -webkit-overflow-scrolling: touch;
    /* Break out past the container gutter so slides can scroll edge-to-edge,
       then re-add the gutter as padding so the first/last slide align. */
    margin: 0 calc(-1 * var(--container-padding));
    padding: 0 var(--container-padding);
  }

  .carousel-track::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }

  /* ── Individual slide ── */
  .carousel-slide {
    flex-shrink: 0;
    width: 85vw;
    scroll-snap-align: start;
    padding: 0 var(--space-2);
    /* Ensure card has breathing room at the bottom */
    padding-bottom: var(--space-2);
  }

  /* ── Dot indicators ── */
  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
    margin-top: var(--space-6);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: var(--radius-full);
    background: var(--grey-300);
    border: none;
    cursor: pointer;
    padding: 0;
    /* Ensure minimum 44×44px touch target */
    position: relative;
    transition:
      background var(--transition-fast),
      transform var(--transition-fast);
  }

  /* Expand the touch target without affecting visual size */
  .dot::before {
    content: "";
    position: absolute;
    inset: -17px;
  }

  .dot.active {
    background: var(--primary-500);
    transform: scale(1.3);
  }

  .dot:focus-visible {
    outline: 2px solid var(--primary-500);
    outline-offset: 3px;
  }

  /* ── Responsive breakpoints ── */

  /* Tablet: show carousel, keep desktop grid hidden */
  @media (max-width: 1023px) {
    .testimonial-carousel-wrapper {
      display: block;
    }
  }

  /* Mobile */
  @media (max-width: 767px) {
    padding: var(--space-16) 0;

    .section-title {
      font-size: var(--fs-2xl);
    }

    .section-header {
      margin-bottom: var(--space-12);
    }

    .carousel-slide {
      width: 88vw;
    }
  }
`;

export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);

  @media (max-width: 1023px) {
    /* Tablet and mobile: hide grid in favour of the carousel */
    display: none;
  }
`;

export const TestimonialCardWrapper = styled.article`
  background: var(--white);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--grey-100);
  /* Left border accent */
  border-left: 4px solid var(--primary-500);
  box-shadow: var(--shadow-card);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  position: relative;
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card-hover);
  }

  /* ── Quote icon ── */
  .quote-icon {
    position: absolute;
    top: var(--space-6);
    right: var(--space-6);
    font-size: var(--space-16);
    line-height: 1;
    color: var(--primary-100);
    font-family: Georgia, serif;
    user-select: none;
    pointer-events: none;
    /* Keep it decorative only */
  }

  /* ── Quote text ── */
  .quote-text {
    font-size: var(--fs-base);
    color: var(--grey-700);
    line-height: 1.7;
    font-style: italic;
    margin: 0;
    /* Ensure text doesn't run behind the quote icon */
    padding-right: var(--space-8);
    max-width: 100%;
    /* Override global p max-width */
    max-width: none;
  }

  /* ── Author row ── */
  .author-row {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-top: auto;
  }

  /* ── Author text ── */
  .author-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .author-name {
    font-family: var(--font-heading);
    font-size: var(--fs-sm);
    font-weight: 700;
    color: var(--grey-900);
    margin: 0;
    line-height: 1.3;
  }

  .author-role {
    font-size: var(--fs-xs);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--primary-500);
    margin: 0;
  }

  @media (max-width: 767px) {
    padding: var(--space-6);
  }
`;

export const AvatarCircle = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: var(--radius-full);
  background: var(--gradient-accent);
  display: grid;
  place-items: center;
  font-family: var(--font-heading);
  font-size: var(--fs-sm);
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.02em;
  user-select: none;
`;
