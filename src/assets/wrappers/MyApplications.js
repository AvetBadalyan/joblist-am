import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;

  .page-title {
    font-size: var(--fs-xl);
    text-transform: none;
    margin-bottom: var(--space-1);
  }

  .applications-count {
    color: var(--grey-500);
    font-size: var(--fs-sm);
  }

  .applications-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-top: var(--space-6);
  }

  .application-card {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: var(--space-6);
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow-3);
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .job-title {
    font-size: var(--fs-md);
    margin-bottom: var(--space-1);
    color: var(--textColor);
    text-decoration: none;
    display: block;

    &:hover {
      color: var(--primary-500);
    }
  }

  .company-name {
    color: var(--grey-500);
    font-size: var(--fs-sm);
    margin: 0;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--borderRadius);
    font-size: var(--fs-xs);
    font-weight: 600;
    text-transform: capitalize;
    white-space: nowrap;
  }

  .status-badge svg {
    font-size: var(--fs-sm);
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
    gap: var(--space-2) var(--space-6);
    color: var(--grey-500);
    font-size: var(--fs-sm);
  }

  .card-details svg {
    font-size: var(--fs-base);
    color: var(--grey-400);
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
`;

export default Wrapper;
