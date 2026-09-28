import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;

  .dashboard-header {
    margin-bottom: var(--space-8);
  }

  .header-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-4);
  }

  .page-title {
    font-size: var(--fs-2xl);
    font-weight: 800;
    color: var(--grey-900);
    margin: 0 0 var(--space-1);
  }

  .subtitle {
    color: var(--grey-500);
    font-size: var(--fs-base);
    margin: 0;
  }

  .post-job-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--gradient-accent);
    color: var(--white);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-xl);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    border: none;
    cursor: pointer;
    box-shadow: var(--shadow-2);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-3), var(--shadow-glow);
    }
  }

  .jobs-count {
    margin-bottom: var(--space-6);
    color: var(--grey-500);
    font-size: var(--fs-base);
    font-weight: 500;
  }

  .jobs-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .loading-container {
    display: grid;
    place-items: center;
    min-height: 40vh;
  }

  .job-card {
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

  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .job-title-link {
    font-size: var(--fs-lg);
    font-weight: 700;
    color: var(--grey-900);
    text-decoration: none;
    transition: var(--transition);
    cursor: pointer;

    &:hover {
      color: var(--primary-600);
    }
  }

  .job-status {
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size: var(--fs-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
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

  .job-details {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--grey-50);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-full);
    color: var(--grey-600);
    font-size: var(--fs-sm);

    svg {
      color: var(--grey-400);
    }
  }

  .detail-item.applications {
    background: var(--primary-50);
    color: var(--primary-700);

    svg {
      color: var(--primary-500);
    }
  }

  .job-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    padding-top: var(--space-4);
    border-top: 1px solid var(--grey-100);
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: 44px;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-lg);
    font-size: var(--fs-sm);
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    border: none;
  }

  .edit-btn {
    background: var(--green-light);
    color: var(--green-dark);

    &:hover {
      background: var(--green-dark);
      color: var(--white);
    }
  }

  .delete-btn {
    background: var(--red-light);
    color: var(--red-dark);

    &:hover {
      background: var(--red-dark);
      color: var(--white);
    }
  }

  @media (max-width: 576px) {
    .header-content {
      flex-direction: column;
      align-items: flex-start;
    }

    .post-job-btn {
      width: 100%;
      justify-content: center;
    }

    .job-header {
      flex-direction: column;
    }
  }
`;

export default Wrapper;
