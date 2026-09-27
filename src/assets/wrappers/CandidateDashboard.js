import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard-header {
    margin-bottom: 2rem;
  }

  .welcome-text {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--primary-500);
    margin: 0 0 0.5rem 0;
  }

  .subtitle {
    color: var(--grey-600);
    margin: 0;
  }

  .stats-grid {
    display: grid;
    row-gap: 2rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1rem;
    }
  }

  @media (min-width: 1120px) {
    .stats-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .quick-actions {
    background: var(--white);
    border-radius: var(--borderRadius);
    padding: 2rem;
    box-shadow: var(--shadow-2);
  }

  .quick-actions h4 {
    margin: 0 0 1.5rem 0;
    color: var(--grey-800);
  }

  .actions-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .action-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: var(--primary-500);
    color: var(--white);
    border-radius: var(--borderRadius);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
    border: none;
    cursor: pointer;
  }

  .action-link:hover {
    background: var(--primary-700);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3);
  }

  .action-link.secondary {
    background: var(--grey-100);
    color: var(--grey-700);
    border: 1px solid var(--grey-300);
  }

  .action-link.secondary:hover {
    background: var(--grey-200);
    color: var(--grey-800);
  }

  .action-link svg {
    font-size: 1.1rem;
  }

  /* Status breakdown section */
  .status-breakdown {
    background: var(--white);
    border-radius: var(--borderRadius);
    padding: 2rem;
    box-shadow: var(--shadow-2);
    margin-bottom: 2rem;
  }

  .status-breakdown h4 {
    margin: 0 0 1.5rem 0;
    color: var(--grey-800);
  }

  .status-list {
    display: grid;
    gap: 0.75rem;
  }

  .status-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background: var(--grey-50);
    border-radius: var(--borderRadius);
    border-left: 4px solid;
  }

  .status-item.applied {
    border-color: #3498db;
  }

  .status-item.reviewing {
    border-color: #f39c12;
  }

  .status-item.interview {
    border-color: #9b59b6;
  }

  .status-item.offer {
    border-color: #27ae60;
  }

  .status-item.rejected {
    border-color: #e74c3c;
  }

  .status-label {
    font-weight: 500;
    text-transform: capitalize;
    color: var(--grey-700);
  }

  .status-count {
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--grey-800);
  }
`;

export default Wrapper;
