import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
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
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    padding: 0.5rem;
  }
  background: var(--white);
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
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
    padding: 0.5rem;
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
    padding: 0.5rem 1rem;
    width: 100%;
  }
  .logo-text {
    display: none;
    margin: 0;
    text-transform: capitalize;
  }

  /* Auth buttons for unauthenticated users */
  .auth-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .auth-buttons .btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
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
      padding: 0.75rem 1.25rem;
      font-size: 1rem;
    }
  }
`;
export default Wrapper;
