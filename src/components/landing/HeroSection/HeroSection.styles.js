import styled from "styled-components";

export const HeroWrapper = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(
    160deg,
    var(--grey-50) 0%,
    var(--white) 60%,
    var(--primary-50) 100%
  );

  .hero-container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--space-16) var(--container-padding);
    position: relative;
    z-index: 1;
  }

  .hero-content {
    max-width: 720px;
  }

  /* ── Headline ── */
  .hero-headline {
    font-size: clamp(2.5rem, 5.5vw, var(--fs-4xl));
    font-family: var(--font-heading);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: var(--grey-900);
    margin-bottom: var(--space-6);
  }

  .word-wrapper {
    display: inline-block;
    margin-right: 0.25em;
    vertical-align: bottom;
  }

  .word {
    display: inline-block;
  }

  /* ── Gradient tagline ── */
  .hero-tagline {
    font-size: clamp(var(--fs-md), 2.5vw, var(--fs-xl));
    font-weight: 500;
    line-height: 1.6;
    color: var(--grey-600);
    margin-bottom: var(--space-12);
    max-width: 56ch;
  }

  .gradient-text {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    /* Fallback for browsers that don't support background-clip: text */
    color: var(--primary-600);
  }

  /* ── CTA button area ── */
  .hero-cta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
  }

  /* ── CTA Buttons ── */
  .btn-hero-primary,
  .btn-hero-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-8);
    min-height: 44px;
    min-width: 44px;
    border-radius: var(--radius-xl);
    font-size: var(--fs-base);
    font-weight: 600;
    font-family: var(--font-body);
    line-height: 1.25;
    cursor: pointer;
    text-decoration: none;
    border: 2px solid transparent;
    transition: all var(--transition-fast);
    white-space: nowrap;
  }

  .btn-hero-primary {
    background: var(--gradient-accent);
    color: var(--white);
    box-shadow: var(--shadow-2);
  }

  .btn-hero-primary:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-3), var(--shadow-glow);
    color: var(--white);
  }

  .btn-hero-primary:active {
    transform: scale(0.98);
    box-shadow: var(--shadow-1);
  }

  .btn-hero-primary:focus-visible {
    outline: 2px solid var(--primary-500);
    outline-offset: 2px;
  }

  .btn-hero-secondary {
    background: transparent;
    color: var(--primary-600);
    border-color: var(--primary-500);
    box-shadow: none;
  }

  .btn-hero-secondary:hover {
    transform: scale(1.05);
    background: var(--primary-50);
    box-shadow: var(--shadow-2);
    color: var(--primary-600);
  }

  .btn-hero-secondary:active {
    transform: scale(0.98);
    box-shadow: none;
  }

  .btn-hero-secondary:focus-visible {
    outline: 2px solid var(--primary-500);
    outline-offset: 2px;
  }

  /* ── Decorative blob ── */
  .hero-blob {
    position: absolute;
    width: 700px;
    height: 700px;
    top: -160px;
    right: -180px;
    background: radial-gradient(
      ellipse at center,
      rgba(99, 102, 241, 0.12) 0%,
      rgba(6, 182, 212, 0.08) 45%,
      transparent 70%
    );
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    pointer-events: none;
    z-index: 0;
  }

  /* ── Floating elements ── */
  .floating-elements {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  /* Base shape — each element overrides position/size */
  .float-el {
    position: absolute;
    will-change: transform;
    opacity: 0;
    animation:
      float var(--float-duration, 3s) ease-in-out var(--float-delay, 0ms)
        infinite,
      fadeIn var(--duration-entrance) var(--ease) var(--fade-delay, 800ms)
        forwards;
  }

  /* Shape 1 — large circle, top-right */
  .float-el-1 {
    width: 320px;
    height: 320px;
    border-radius: var(--radius-full);
    background: radial-gradient(circle, var(--primary-200) 0%, transparent 70%);
    opacity: 0;
    top: -80px;
    right: -60px;
    --float-duration: 3s;
    --float-delay: 0ms;
    --fade-delay: 800ms;
  }

  /* Shape 2 — rounded rectangle, bottom-right */
  .float-el-2 {
    width: 180px;
    height: 100px;
    border-radius: var(--radius-2xl);
    background: linear-gradient(
      135deg,
      rgba(6, 182, 212, 0.18) 0%,
      rgba(99, 102, 241, 0.12) 100%
    );
    opacity: 0;
    bottom: 80px;
    right: 40px;
    --float-duration: 4s;
    --float-delay: 200ms;
    --fade-delay: 900ms;
  }

  /* Shape 3 — small circle, center-right */
  .float-el-3 {
    width: 100px;
    height: 100px;
    border-radius: var(--radius-full);
    background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.2) 0%,
      transparent 70%
    );
    opacity: 0;
    top: 45%;
    right: 15%;
    --float-duration: 3.5s;
    --float-delay: 100ms;
    --fade-delay: 1000ms;
  }

  /* Shape 4 — accent pill, upper-center-right */
  .float-el-4 {
    width: 140px;
    height: 56px;
    border-radius: var(--radius-full);
    background: linear-gradient(
      135deg,
      rgba(34, 211, 238, 0.15) 0%,
      rgba(99, 102, 241, 0.1) 100%
    );
    opacity: 0;
    top: 25%;
    right: 28%;
    --float-duration: 2.8s;
    --float-delay: 300ms;
    --fade-delay: 1100ms;
  }

  /* ── Mobile layout ── */
  @media (max-width: 767px) {
    min-height: 100svh; /* full viewport on small screens */

    .hero-container {
      padding: var(--space-16) var(--container-padding) var(--space-12);
    }

    .hero-content {
      text-align: center;
    }

    .hero-cta {
      justify-content: center;
    }
  }

  /* ── Tablet ── */
  @media (min-width: 768px) and (max-width: 1023px) {
    .hero-content {
      max-width: 600px;
    }
  }
`;
