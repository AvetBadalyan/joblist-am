import styled from "styled-components";

export const FinalCTAWrapper = styled.section`
  position: relative;
  /* Deep gradient using accent colors: cyan → indigo → deeper purple */
  background: linear-gradient(135deg, #0891b2 0%, #4f46e5 60%, #3730a3 100%);
  padding-top: calc(var(--space-20) + 4rem);
  padding-bottom: var(--space-20);
  overflow: hidden;
  text-align: center;
  color: var(--white);

  @media (max-width: 767px) {
    padding-top: calc(var(--space-16) + 3rem);
    padding-bottom: var(--space-16);
  }

  /* Wave SVG sits below content */
  > svg {
    z-index: 0;
  }

  /* Subtle dot texture overlay for depth */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.07) 1px,
      transparent 1px
    );
    background-size: 24px 24px;
    pointer-events: none;
  }

  /* Soft radial glow at center for visual richness */
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.06) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const CTAContent = styled.div`
  position: relative;
  z-index: 1;
  width: var(--fluid-width);
  max-width: 680px;
  margin: 0 auto;

  /* Start invisible; animate in when section enters viewport */
  opacity: ${({ $isVisible }) => ($isVisible ? undefined : 0)};
  animation: ${({ $isVisible }) =>
    $isVisible
      ? "zoomFade var(--duration-entrance) var(--ease) forwards"
      : "none"};

  .cta-headline {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 4.5vw, var(--fs-3xl));
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--white);
    margin-bottom: var(--space-4);
  }

  .cta-subheadline {
    font-size: clamp(var(--fs-md), 2.2vw, var(--fs-lg));
    font-weight: 400;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.82);
    margin-bottom: var(--space-10);
    max-width: 52ch;
    margin-inline: auto;
  }
`;

export const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
`;

/* Shared base for both CTA buttons */
const ctaBtnBase = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: var(--space-3) var(--space-8);
  border-radius: var(--radius-xl);
  font-size: var(--fs-md);
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;

  &:active {
    transform: scale(0.98);
  }
`;

export const CTABtnPrimary = styled.a`
  ${ctaBtnBase}
  background: var(--white);
  color: var(--primary-700, #3730a3);
  border: 2px solid transparent;
  font-weight: 700;
  box-shadow: var(--shadow-2);

  &:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-3);
    filter: brightness(0.97);
  }

  &:focus-visible {
    outline: 3px solid var(--white);
    outline-offset: 3px;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.4);
  }
`;

export const CTABtnSecondary = styled.a`
  ${ctaBtnBase}
  background: transparent;
  color: var(--white);
  border: 2px solid rgba(255, 255, 255, 0.6);

  &:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: var(--shadow-3);
  }

  &:focus-visible {
    outline: 3px solid var(--white);
    outline-offset: 3px;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.3);
  }
`;
