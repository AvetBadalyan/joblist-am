import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;

  .dashboard-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }

  .page-title {
    font-size: var(--fs-2xl);
    font-weight: 700;
    color: var(--grey-800);
    margin: 0;
  }

  .post-job-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--primary-500);
    color: var(--white);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--borderRadius);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
    border: none;
    cursor: pointer;
  }

  .post-job-btn:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-2);
  }

  .jobs-count {
    margin-bottom: var(--space-6);
    color: var(--grey-600);
    font-size: var(--fs-base);
  }

  .jobs-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .job-card {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: var(--space-6);
    transition: var(--transition);
  }

  .job-card:hover {
    box-shadow: var(--shadow-3);
  }

  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .job-title-link {
    font-size: var(--fs-lg);
    font-weight: 600;
    color: var(--primary-500);
    text-decoration: none;
    transition: var(--transition);
    cursor: pointer;
  }

  .job-title-link:hover {
    color: var(--primary-700);
  }

  .job-status {
    padding: var(--space-1) var(--space-3);
    border-radius: var(--borderRadius);
    font-size: var(--fs-sm);
    font-weight: 500;
    text-transform: capitalize;
    white-space: nowrap;
  }

  .job-status.open {
    background: var(--job-open-bg);
    color: var(--job-open-text);
  }

  .job-status.closed {
    background: var(--job-closed-bg);
    color: var(--job-closed-text);
  }

  .job-meta {
    margin-bottom: var(--space-4);
    color: var(--grey-600);
    font-size: var(--fs-sm);
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-6);
    margin-bottom: var(--space-2);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);

    svg {
      color: var(--grey-400);
    }
  }

  .job-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--borderRadius);
    font-size: var(--fs-sm);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    border: none;
  }

  .edit-btn {
    background: var(--green-light);
    color: var(--green-dark);
  }

  .edit-btn:hover {
    background: color-mix(in srgb, var(--green-light) 80%, var(--green-dark));
  }

  .delete-btn {
    background: var(--red-light);
    color: var(--red-dark);
  }

  .delete-btn:hover {
    background: color-mix(in srgb, var(--red-light) 80%, var(--red-dark));
  }

  @media (max-width: 576px) {
    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .job-header {
      flex-direction: column;
    }

    .job-actions {
      width: 100%;
    }

    .action-btn {
      flex: 1;
      justify-content: center;
    }
  }
`;

export default Wrapper;
