import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-1);
  background: var(--white);

  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }

  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: var(--fs-2xl);
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    padding: var(--space-2);
    border-radius: var(--borderRadius);
    transition: var(--transition);

    &:hover {
      background: var(--grey-100);
    }
  }

  .btn-container {
    position: relative;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 var(--space-2);
    position: relative;
    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: var(--space-2);
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }

  .show-dropdown {
    visibility: visible;
  }

  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
    min-height: 44px;
    padding: var(--space-2) var(--space-4);
    width: 100%;
    transition: var(--transition);

    &:hover {
      color: var(--primary-700);
    }
  }

  .logo-text {
    display: none;
    margin: 0;
    text-transform: capitalize;
  }

  .auth-buttons {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .auth-buttons .btn {
    padding: var(--space-2) var(--space-4);
    font-size: var(--fs-sm);
    text-decoration: none;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-buttons .btn-outline {
    background: transparent;
    color: var(--primary-500);
    border: 1px solid var(--primary-500);
    box-shadow: none;
  }

  .auth-buttons .btn-outline:hover {
    background: var(--primary-50);
  }

  @media (min-width: 768px) {
    position: sticky;
    top: 0;
    z-index: 100;

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
      padding: var(--space-3) var(--space-5);
      font-size: var(--fs-base);
    }
  }
`;

export default Wrapper;
