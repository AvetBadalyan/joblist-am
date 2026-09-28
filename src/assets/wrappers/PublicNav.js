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
  .nav-center {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--space-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .logo {
    height: calc(var(--nav-height) - var(--space-4));
    width: auto;
    display: block;
    object-fit: contain;
  }

  @media (min-width: 768px) {
    .nav-center {
      padding: 0 var(--space-6);
    }
  }

  @media (min-width: 1024px) {
    .nav-center {
      padding: 0 var(--space-8);
    }
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: var(--space-2);
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

  .btn-outline {
    background: transparent;
    color: var(--primary-500);
    border: 1px solid var(--primary-500);
    box-shadow: none;

    &:hover {
      background: var(--primary-50);
      color: var(--primary-500);
    }
  }

  @media (max-width: 480px) {
    .nav-link {
      padding: var(--space-2);
    }
  }
`;

export default Wrapper;
