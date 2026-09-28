import styled from "styled-components";

const Wrapper = styled.aside`
  @media (min-width: 768px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }

  .show-sidebar {
    z-index: 200;
    opacity: 1;
  }

  .content {
    background: var(--white);
    width: 90vw;
    max-width: 400px;
    height: auto;
    max-height: 90vh;
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: var(--shadow-4);
    overflow-y: auto;
  }

  .logo {
    margin-bottom: var(--space-4);
  }

  .close-btn {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    background: var(--grey-100);
    border: none;
    font-size: var(--fs-xl);
    color: var(--grey-600);
    cursor: pointer;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    transition: var(--transition);

    &:hover {
      background: var(--red-light);
      color: var(--red-dark);
    }
  }

  .nav-links {
    padding-top: var(--space-6);
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-2);
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-600);
    padding: var(--space-4);
    font-weight: 500;
    border-radius: var(--radius-lg);
    transition: var(--transition);
  }

  .nav-link:hover {
    background: var(--grey-100);
    color: var(--grey-900);
  }

  .icon {
    font-size: var(--fs-lg);
    margin-right: var(--space-3);
    display: grid;
    place-items: center;
    width: 24px;
  }

  .active {
    background: var(--primary-100);
    color: var(--primary-700);
  }

  .active .icon {
    color: var(--primary-600);
  }
`;

export default Wrapper;
