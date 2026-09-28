import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  box-shadow: var(--shadow-1);
  position: sticky;
  top: 0;
  z-index: 100;

  /* Match .dashboard-page container: same max-width and side padding so the
     nav (logo / actions) lines up with the page content below it. */
  /* Same container geometry as page sections (see .container in index.css)
     so the logo and actions align with the content below on every width. */
  .nav-center {
    position: relative;
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .logo {
    height: calc(var(--nav-height) - var(--space-4));
  }

  /* Hamburger toggle: mobile only */
  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--grey-700);
    font-size: var(--fs-xl);
    border-radius: var(--borderRadius);
    transition: var(--transition);

    &:hover {
      background: var(--grey-100);
    }
  }

  /* Backdrop scrim behind the mobile menu (mobile only) */
  .nav-scrim {
    position: fixed;
    inset: var(--nav-height) 0 0;
    background: rgba(15, 23, 42, 0.45);
    border: none;
    cursor: pointer;
    z-index: 90;
    animation: nav-fade-in var(--transition-fast);
  }

  @keyframes nav-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Mobile: links collapse into a dropdown panel below the navbar */
  .nav-links {
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-2);
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    z-index: 110;
    background: var(--white);
    padding: var(--space-4);
    box-shadow: var(--shadow-3);
    border-top: 1px solid var(--grey-100);
  }

  .nav-links.open {
    display: flex;
  }

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: var(--space-2) var(--space-4);
    color: var(--grey-600);
    font-size: var(--fs-sm);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    border-radius: var(--borderRadius);
    transition: var(--transition);

    &:hover {
      color: var(--primary-500);
    }
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: var(--space-2) var(--space-4);
    font-size: var(--fs-sm);
    text-decoration: none;
    box-shadow: var(--shadow-2);
  }

  /* Desktop (>=576px): show inline links, hide the toggle and scrim */
  @media (min-width: 576px) {
    .menu-toggle,
    .nav-scrim {
      display: none;
    }

    .nav-links {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--space-2);
      position: static;
      padding: 0;
      background: transparent;
      box-shadow: none;
      border-top: none;
    }
  }
`;

export default Wrapper;
