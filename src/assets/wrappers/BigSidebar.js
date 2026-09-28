import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;

  @media (min-width: 768px) {
    display: block;

    .sidebar-container {
      background: var(--white);
      min-height: 100vh;
      height: 100%;
      width: 260px;
      margin-left: -260px;
      transition: var(--transition);
      border-right: 1px solid var(--grey-100);
    }

    .content {
      position: sticky;
      top: 0;
    }

    .show-sidebar {
      margin-left: 0;
    }

    header {
      height: var(--nav-height);
      display: flex;
      align-items: center;
      padding-left: var(--space-8);
      border-bottom: 1px solid var(--grey-100);
    }

    .logo-text {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: var(--fs-xl);
      background: var(--gradient-accent);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-links {
      padding: var(--space-6) var(--space-4);
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .nav-link {
      display: flex;
      align-items: center;
      color: var(--grey-600);
      padding: var(--space-3) var(--space-4);
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

    .active:hover {
      background: var(--primary-100);
    }

    .active .icon {
      color: var(--primary-600);
    }
  }
`;

export default Wrapper;
