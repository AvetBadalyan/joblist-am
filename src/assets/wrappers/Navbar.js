import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-bottom: 1px solid var(--grey-100);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;

  .logo {
    display: flex;
    align-items: center;
    width: auto;
  }

  .nav-center {
    display: flex;
    width: 90vw;
    max-width: var(--max-width);
    align-items: center;
    justify-content: space-between;
  }

  .toggle-btn {
    background: var(--grey-100);
    border: none;
    font-size: var(--fs-xl);
    color: var(--grey-700);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-lg);
    transition: var(--transition);

    &:hover {
      background: var(--grey-200);
      color: var(--grey-900);
    }
  }

  .btn-container {
    position: relative;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: 0.625rem 1rem;
    font-size: var(--fs-sm);
    font-weight: 600;
    border-radius: var(--radius-full);
    background: var(--gradient-accent);
    color: var(--white);
    border: none;
    cursor: pointer;
    transition: var(--transition);

    svg {
      font-size: var(--fs-base);
    }

    &:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-2);
    }
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 180px;
    background: var(--white);
    box-shadow: var(--shadow-card);
    padding: var(--space-2);
    visibility: hidden;
    opacity: 0;
    transform: translateY(-10px);
    border-radius: var(--radius-xl);
    border: 1px solid var(--grey-100);
    transition: all var(--transition-fast);
  }

  .show-dropdown {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }

  .dropdown-btn {
    background: transparent;
    border: none;
    color: var(--grey-700);
    font-weight: 500;
    cursor: pointer;
    padding: var(--space-3) var(--space-4);
    width: 100%;
    text-align: left;
    border-radius: var(--radius-md);
    transition: var(--transition-fast);
    display: flex;
    align-items: center;
    gap: var(--space-2);

    &:hover {
      background: var(--grey-100);
      color: var(--red-dark);
    }
  }

  .logo-text {
    display: none;
    margin: 0;
    font-family: var(--font-heading);
    font-weight: 800;
    font-size: var(--fs-lg);
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .auth-buttons {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .auth-buttons .btn {
    padding: 0.625rem 1.25rem;
    font-size: var(--fs-sm);
    text-decoration: none;
    border-radius: var(--radius-full);
  }

  .auth-buttons .btn-outline {
    background: transparent;
    color: var(--grey-700);
    border: none;
    box-shadow: none;

    &:hover {
      background: var(--grey-100);
      color: var(--grey-900);
      transform: none;
    }
  }

  .auth-buttons .btn-primary {
    background: var(--gradient-accent);
    color: var(--white);
  }

  @media (min-width: 768px) {
    .nav-center {
      width: 90%;
    }

    .logo {
      display: none;
    }

    .logo-text {
      display: block;
    }

    .auth-buttons .btn {
      padding: 0.75rem 1.5rem;
    }
  }
`;

export default Wrapper;
