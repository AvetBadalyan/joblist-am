import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;

  .dashboard-header {
    margin-bottom: var(--space-8);
  }

  .welcome-text {
    font-size: var(--fs-2xl);
    font-weight: 800;
    color: var(--grey-900);
    margin-bottom: var(--space-2);
  }

  .subtitle {
    color: var(--grey-500);
    font-size: var(--fs-base);
    margin: 0;
  }

  /* Stats cards are rendered via the StatItem component (own wrapper);
     this grid only handles their layout. */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }

  @media (min-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* ===== STATUS BREAKDOWN ===== */
  .status-breakdown {
    background: var(--white);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-card);
    border: 1px solid var(--grey-100);
    padding: var(--space-6);
    margin-bottom: var(--space-8);

    h4 {
      margin-bottom: var(--space-6);
    }
  }

  .status-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  @media (min-width: 576px) {
    .status-list {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    }
  }

  .status-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    border-left: 4px solid var(--grey-300);
    background: var(--grey-50);
  }

  .status-item.applied {
    border-left-color: var(--status-applied-text);
  }
  .status-item.reviewing {
    border-left-color: var(--status-reviewing-text);
  }
  .status-item.interview {
    border-left-color: var(--status-interview-text);
  }
  .status-item.offer {
    border-left-color: var(--status-offer-text);
  }
  .status-item.rejected {
    border-left-color: var(--status-rejected-text);
  }

  .status-label {
    color: var(--grey-500);
    font-size: var(--fs-sm);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
  }

  .status-count {
    font-family: var(--font-heading);
    font-size: var(--fs-xl);
    font-weight: 800;
    color: var(--grey-900);
  }

  /* ===== QUICK ACTIONS ===== */
  .quick-actions {
    h4 {
      margin-bottom: var(--space-6);
    }
  }

  .actions-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  @media (min-width: 576px) {
    .actions-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .action-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    min-height: 56px;
    padding: var(--space-4) var(--space-6);
    background: var(--gradient-accent);
    color: var(--white);
    border-radius: var(--radius-xl);
    font-weight: 600;
    box-shadow: var(--shadow-2);
    transition: all var(--transition-base);

    svg {
      font-size: var(--fs-lg);
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-3);
      color: var(--white);
    }
  }

  .action-link.secondary {
    background: var(--white);
    color: var(--primary-600);
    border: 1px solid var(--grey-200);
    box-shadow: var(--shadow-1);

    &:hover {
      border-color: var(--primary-200);
      color: var(--primary-700);
    }
  }
`;

export default Wrapper;
