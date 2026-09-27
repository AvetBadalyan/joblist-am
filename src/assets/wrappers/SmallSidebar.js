import styled from "styled-components";

const Wrapper = styled.aside`
  @media (min-width: 768px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }

  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }

  .content {
    background: var(--white);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: var(--space-16) var(--space-8);
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: var(--fs-3xl);
    color: var(--red-dark);
    cursor: pointer;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--borderRadius);
    transition: var(--transition);

    &:hover {
      background: var(--grey-100);
    }
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
    text-transform: capitalize;
    transition: var(--transition);
    min-height: 44px;
  }

  .nav-link:hover {
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
`;

export default Wrapper;
