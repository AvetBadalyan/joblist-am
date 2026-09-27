import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;

  .welcome-text {
    font-size: var(--fs-2xl);
    font-weight: 700;
    color: var(--primary-500);
    margin-bottom: var(--space-8);
  }

  .welcome-text span {
    color: var(--grey-800);
  }

  .stats-section {
    margin-bottom: var(--space-8);
  }

  .section-title {
    font-size: var(--fs-lg);
    color: var(--grey-700);
    margin-bottom: var(--space-4);
  }

  .quick-actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }

  .action-card {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: var(--space-6);
    text-align: center;
    transition: var(--transition);
  }

  .action-card:hover {
    box-shadow: var(--shadow-3);
    transform: translateY(-2px);
  }

  .action-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    color: var(--grey-700);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
    border: none;
    cursor: pointer;
    background: transparent;
    padding: 0;
    width: 100%;
  }

  .action-link:hover {
    color: var(--primary-500);
  }

  .action-link svg {
    font-size: var(--fs-md);
  }

  .action-icon {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    background: var(--primary-100);
    border-radius: var(--radius-full);
    color: var(--primary-500);
    font-size: var(--fs-xl);
    transition: var(--transition);
  }

  .action-card:hover .action-icon {
    background: var(--primary-500);
    color: var(--white);
  }

  .status-breakdown {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--space-3);
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: var(--space-6);
  }

  .status-item {
    text-align: center;
    padding: var(--space-3);
    border-radius: var(--borderRadius);
    border-left: 3px solid transparent;
  }

  .status-item.applied { border-color: var(--primary-500); }
  .status-item.reviewing { border-color: var(--yellow-dark); }
  .status-item.interview { border-color: var(--purple-dark); }
  .status-item.offer { border-color: var(--green-dark); }
  .status-item.rejected { border-color: var(--red-dark); }

  .status-count {
    font-weight: 700;
    font-size: var(--fs-md);
    color: var(--grey-800);
  }

  .status-label {
    font-size: var(--fs-sm);
    color: var(--grey-500);
    text-transform: capitalize;
  }
`;

export default Wrapper;
