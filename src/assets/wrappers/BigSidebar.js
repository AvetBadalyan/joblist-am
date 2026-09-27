import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;

  @media (min-width: 768px) {
    display: block;
    box-shadow: var(--shadow-1);

    .sidebar-container {
      background: var(--white);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
    }

    .content {
      position: sticky;
      top: 0;
    }

    .show-sidebar {
      margin-left: 0;
    }

    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: var(--space-10);
    }

    .nav-links {
      padding-top: var(--space-8);
      display: flex;
      flex-direction: column;
    }

    .nav-link {
      display: flex;
      align-items: center;
      color: var(--grey-500);
      padding: var(--space-4) 0;
      padding-left: var(--space-10);
      text-transform: capitalize;
      transition: var(--transition);
    }

    .nav-link:hover {
      background: var(--grey-50);
      padding-left: var(--space-12);
      color: var(--grey-900);
    }

    .nav-link:hover .icon {
      color: var(--primary-500);
    }

    .icon {
      font-size: var(--fs-xl);
      margin-right: var(--space-4);
      display: grid;
      place-items: center;
      transition: var(--transition);
    }

    .active {
      color: var(--grey-900);
    }

    .active .icon {
      color: var(--primary-500);
    }
  }
`;

export default Wrapper;
