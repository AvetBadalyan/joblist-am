import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;

  .page-title {
    font-size: var(--fs-2xl);
    font-weight: 800;
    margin-bottom: var(--space-2);
    color: var(--grey-900);
  }

  .applications-count {
    color: var(--grey-500);
    font-size: var(--fs-base);
    font-weight: 500;
    margin: var(--space-1) 0 0;
  }

  .page-header {
    margin-bottom: var(--space-6);
  }

  .applications-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .application-card {
    background: var(--white);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-card);
    padding: var(--space-6);
    transition: var(--transition);
    border: 1px solid var(--grey-100);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-card-hover);
      border-color: var(--primary-200);
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .job-info {
    min-width: 0;
  }

  .job-title {
    font-size: var(--fs-lg);
    font-weight: 700;
    margin: 0 0 var(--space-1);
    color: var(--grey-900);
  }

  .job-title-link {
    color: inherit;
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      color: var(--primary-600);
    }
  }

  .company-name {
    color: var(--grey-500);
    font-size: var(--fs-sm);
    font-weight: 500;
    margin: 0;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size: var(--fs-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;

    svg {
      font-size: var(--fs-sm);
    }
  }

  .status-applied {
    background-color: var(--status-applied-bg);
    color: var(--status-applied-text);
  }

  .status-reviewing {
    background-color: var(--status-reviewing-bg);
    color: var(--status-reviewing-text);
  }

  .status-interview {
    background-color: var(--status-interview-bg);
    color: var(--status-interview-text);
  }

  .status-offer {
    background-color: var(--status-offer-bg);
    color: var(--status-offer-text);
  }

  .status-rejected {
    background-color: var(--status-rejected-bg);
    color: var(--status-rejected-text);
  }

  .card-details {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    background: var(--grey-50);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-full);
    width: fit-content;
    font-size: var(--fs-sm);
    color: var(--grey-600);

    svg {
      color: var(--grey-400);
    }
  }
`;

export default Wrapper;
