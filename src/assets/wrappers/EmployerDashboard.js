import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard-header {
    margin-bottom: 2rem;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .header-content {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .page-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--grey-800);
    margin: 0;
  }

  .subtitle {
    color: var(--grey-600);
    margin: 0.25rem 0 0 0;
  }

  .post-job-btn {
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

  .post-job-btn:hover {
    background: var(--primary-700);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3);
  }

  .jobs-count {
    margin-bottom: 1.5rem;
    color: var(--grey-600);
    font-size: 0.95rem;
  }

  .jobs-list {
    display: grid;
    gap: 1.5rem;
  }

  /* Job Card Styles */
  .job-card {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: 1.5rem;
    transition: var(--transition);
  }

  .job-card:hover {
    box-shadow: var(--shadow-4);
  }

  .job-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    .job-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }
  }

  .job-title-link {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-500);
    text-decoration: none;
    transition: var(--transition);
    cursor: pointer;
  }

  .job-title-link:hover {
    color: var(--primary-700);
    text-decoration: underline;
  }

  .job-status {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: var(--borderRadius);
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: capitalize;
  }

  .job-status.open {
    background: #d5f5e3;
    color: #27ae60;
  }

  .job-status.closed {
    background: #fadbd8;
    color: #e74c3c;
  }

  .job-details {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: var(--grey-600);
    font-size: 0.9rem;
  }

  @media (min-width: 576px) {
    .job-details {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 992px) {
    .job-details {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .detail-item svg {
    color: var(--grey-400);
  }

  .detail-item.applications {
    color: var(--primary-600);
    font-weight: 500;
  }

  .detail-item.applications svg {
    color: var(--primary-500);
  }

  .job-actions {
    display: flex;
    gap: 0.75rem;
    padding-top: 1rem;
    border-top: 1px solid var(--grey-100);
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.5rem 1rem;
    border-radius: var(--borderRadius);
    font-size: 0.875rem;
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
    background: #a9dfbf;
  }

  .delete-btn {
    background: var(--red-light);
    color: var(--red-dark);
  }

  .delete-btn:hover {
    background: #f5b7b1;
  }

  /* Loading state */
  .loading-container {
    display: flex;
    justify-content: center;
    padding: 3rem 0;
  }
`;

export default Wrapper;
