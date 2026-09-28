import styled from "styled-components";

export const LogoStripWrapper = styled.section`
  background: var(--grey-50);
  padding: var(--space-16) 0;
  overflow: hidden;

  .logo-strip-header {
    text-align: center;
    margin-bottom: var(--space-10);
  }

  .logo-strip-heading {
    font-size: var(--fs-sm);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--grey-400);
    /* Reset h2 margins so the element-type change doesn't shift layout */
    margin: 0;
    line-height: 1.4;
  }

  /* Fade out the left and right edges for a polished infinite-scroll effect */
  .logo-track {
    position: relative;
    overflow: hidden;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 80px;
      z-index: 2;
      pointer-events: none;
    }

    &::before {
      left: 0;
      background: linear-gradient(to right, var(--grey-50), transparent);
    }

    &::after {
      right: 0;
      background: linear-gradient(to left, var(--grey-50), transparent);
    }
  }

  /* The actual scrolling row – width is set to fit-content so the flex items
     don't wrap. translateX(-50%) lands exactly at the start of the duplicate
     set, creating a seamless loop (logos are doubled in CompanyLogoStrip.jsx). */
  .logo-slider {
    display: flex;
    width: fit-content;
    align-items: center;
    animation: scroll 30s linear infinite;

    &:hover {
      animation-play-state: paused;
    }

    @media (max-width: 767px) {
      animation-duration: 20s;
    }
  }
`;

export const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  height: 60px;
  margin: 0 var(--space-4);
  padding: 0 var(--space-6);
  border: 1.5px solid var(--grey-200);
  border-radius: var(--radius-lg);
  background: var(--white);
  /* Grayscale + reduced opacity — hover restores full colour (task 9.3) */
  filter: grayscale(100%);
  opacity: 0.6;
  transition:
    filter var(--transition-fast),
    opacity var(--transition-fast),
    box-shadow var(--transition-base);
  cursor: default;
  white-space: nowrap;
  flex-shrink: 0;

  .logo-name {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: var(--fs-sm);
    color: var(--grey-700);
    letter-spacing: -0.01em;
  }

  &:hover {
    filter: grayscale(0%);
    opacity: 1;
    box-shadow: var(--shadow-2);
  }

  @media (max-width: 767px) {
    min-width: 120px;
    height: 50px;
  }
`;
